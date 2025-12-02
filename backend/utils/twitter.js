import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

export const postToTwitter = async (imageBase64, prompt) => {
  const mediaId = await client.v1.uploadMedia(Buffer.from(imageBase64.split(',')[1], 'base64'));
  await client.v2.tweet({
    text: `Just generated with AIsmarter Pro ✨\n\n"${prompt}"\n\nUncensored AI Art → https://aismarter.pro`,
    media: { media_ids: [mediaId] }
  });
};
