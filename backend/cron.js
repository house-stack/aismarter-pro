import cron from 'node-cron';
import { generateText } from './utils/aiClient.js';
import { generateImage } from './utils/imageClient.js';
import Blog from './models/Blog.js';

cron.schedule('0 0 * * 0', async () => {
  try {
    const prompt = 'Beautiful futuristic AI city at night, cyberpunk, ultra detailed, 8k';
    const [content, image] = await Promise.all([
      generateText('Write a 800-word SEO-friendly blog post about "How AI Will Change Content Creation in 2026" with headings, bullet points, and a call to action.'),
      generateImage(prompt, true)
    ]);

    const blog = new Blog({
      title: 'Weekly AI Insights – ' + new Date().toISOString().slice(0, 10),
      content,
      image,
      published: true
    });
    await blog.save();
    console.log('Auto-blog + image generated!');
  } catch (err) {
    console.error('Cron failed:', err);
  }
});
