import React from 'react';
import { toast } from 'react-hot-toast';
import { ShortenedURL } from '../types/url';

interface UrlCardProps {
  url: ShortenedURL;
}

export const UrlCard: React.FC<UrlCardProps> = ({ url }) => {
  const shortUrl = `${window.location.origin}/${url.shortCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  return (
    <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Shortened URL</h3>
          <span className="text-sm text-gray-500">{url.clicks} clicks</span>
        </div>
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 break-all"
        >
          {shortUrl}
        </a>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Copy to Clipboard
        </button>
        <div className="mt-2 text-sm text-gray-500 break-all">
          Original URL: {url.originalUrl}
        </div>
      </div>
    </div>
  );
};