import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [nsfw, setNsfw] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/ai/generate-image', { prompt, nsfw }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.image;
    },
    onSuccess: (image) => {
      toast.success('Image generated!');
      setImage(image);
    },
    onError: () => toast.error('Failed to generate image')
  });

  const [image, setImage] = useState(null);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Uncensored AI Image Generator</h1>
      
      <div className="flex gap-4 mb-4">
        <input
          className="flex-1 p-4 border rounded-lg text-black"
          placeholder="A beautiful elf warrior with massive..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={nsfw} onChange={(e) => setNsfw(e.target.checked)} />
          <span className="text-red-500 font-bold">NSFW Mode</span>
        </label>
      </div>

      <button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending || !prompt}
        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-xl disabled:opacity-50"
      >
        {mutation.isPending ? 'Generating...' : 'Generate Image'}
      </button>

      {image && (
        <div className="mt-8">
          <img src={image} alt="AI Generated" className="rounded-lg shadow-2xl max-w-full" />
          <div className="mt-4 flex gap-4">
            <a href={image} download="ai-art.png" className="bg-green-600 text-white px-6 py-3 rounded">
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
