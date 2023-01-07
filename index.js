const Database = require("@replit/database");
const express = require("express");
const { Client } = require("twitter-api-sdk");

const port = 3000;
const client = new Client(process.env.BEARER_TOKEN);
const db = new Database();

const server = express();

server.get("/tweets", async (req, res) => {
  const { from } = req.query;
  const fromDate = new Date(from);
  const tweets = (await db.get("tweets")) || [];
  const tweetsFilter = tweets.filter((x) => new Date(x.created_at) >= fromDate);
  res.send(tweetsFilter);
});

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(
    `> Ready on ${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
  );
});

async function handleStream() {
  const stream = client.tweets.sampleStream({
    "tweet.fields": ["geo", "created_at", "conversation_id"],
    expansions: [
      "geo.place_id",
      "author_id",
      "in_reply_to_user_id",
      "referenced_tweets.id",
    ],
    "place.fields": [
      "id",
      "geo",
      "name",
      "country_code",
      "place_type",
      "full_name",
      "country",
    ],
    "user.fields": ["username"],
  }, { max_retries: 10});

  for await (const { data, includes } of stream) {
    if (!data.geo.place_id) continue;
    const place = includes.places.find((x) => x.id === data.geo.place_id);
    const user = includes.users.find((x) => x.id === data.author_id);
    // Just use one corner of bounding box
    const [lng, lat] = place.geo.bbox;

    const places = (await db.get("tweets")) || [];
    await db.set(
      "tweets",
      [
        {
          name: place.name,
          lat,
          lng,
          created_at: data.created_at,
          id: data.id,
          username: user.username,
        },
        ...places,
      ].slice(0, 50)
    );
  }
}

handleStream();
