import axios from 'axios';

const API_KEY = process.env.STABLE_DIFFUSION_API_KEY;

export const generateImage = async (prompt, nsfw = false) => {
  const response = await axios.post(
    'https://api.stability.ai/v2beta/stable-image/generate/core',
    {
      prompt,
      aspect_ratio: "1:1",
      output_format: "png",
      model: "sd3-turbo", // or "sd3-medium" for higher quality
      // No safety filters applied → full NSFW allowed
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: 'image/*'
      },
      responseType: 'arraybuffer',
      timeout: 60000
    }
  );

  return `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
};
