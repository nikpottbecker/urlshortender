import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { urlSchema } from '../utils/validation';
import { shortenUrl } from '../utils/api';
import { ShortenedURL } from '../types/url';

interface UrlFormProps {
  onUrlShortened: (data: ShortenedURL) => void;
}

export const UrlForm: React.FC<UrlFormProps> = ({ onUrlShortened }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const validUrl = urlSchema.parse(url);
      const result = await shortenUrl(validUrl);
      onUrlShortened(result);
      setUrl('');
      toast.success('URL shortened successfully!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to shorten URL');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your URL (including http:// or https://)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </div>
    </form>
  );
};