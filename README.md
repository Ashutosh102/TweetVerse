# Twitter API V2 Sample Stream Demo

This is a demo to help you to get started making a Twitter API request, using a Bearer Token with the TypeScript SDK. It uses the [sample stream endpoint](https://developer.twitter.com/en/docs/twitter-api/tweets/volume-streams/api-reference/get-tweets-sample-stream) to listen for new Tweets in real-time, and plots them onto a virtual globe (rendered using [Globe.GL](https://globe.gl/)) based on any location information included.

## How to get started with this demo

1. [Sign up for a developer account](https://t.co/signup) - it's completely free.

2. Once you have access, use the Twitter Developer Portal to create a Project and an App. Make sure to save your Bearer Token somewhere secure (a password or secrets manager is ideal).

3. Open your Replit project.
   * Navigate to the Secrets tab
   * Add an environment variable `BEARER_TOKEN` with the Bearer Token you saved earlier.

4. Click Run in the top Replit toolbar.

## What you need to know

A globe will render in the web view, showing Tweets appearing as blue pins. 
  * Hover over a pin for the location of the Tweet.
  * Click and drag to rotate the globe in the browser.

The Twitter sample stream endpoint provides around 1% of Tweets posted in real-time. That's still a lot of Tweets! It is important to know that not everyone on Twitter chooses to add geo location information to their Tweets, so this demo is only able to show Tweets that do have that data included.

In the code, we ask for Tweets with the `geo.place_id` _expansion_, and also ask for a number of _fields_ in the `place` object. We ignore any Tweets without geo information. We then plot those that do have geo information, based on the lat/lon of the bounding box found in the `place` object.

You could try adding a function to show the text content of the Tweet when the pin is clicked, have a popup with the user's profile image (investigate additional _expansions_ and _fields_), or even open the Tweet itself in the browser - there are lots of possibilities! You can also restyle the globe visual using the Globe GL settings in `public/index.html`.

## Further resources

* [Read Twitter Developer documentation](https://developer.twitter.com/en/docs/twitter-api/getting-started/about-twitter-api)
* [Discover libraries and tools created by the community](https://developer.twitter.com/en/docs/twitter-api/tools-and-libraries/v2)
* [Join in the conversation in our developer forums](https://twittercommunity.com)
