import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { UrlForm } from './components/UrlForm';
import { UrlCard } from './components/UrlCard';
import { ShortenedURL } from './types/url';

function App() {
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedURL | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-3xl font-bold text-gray-900">URL Shortener</h1>
          <UrlForm onUrlShortened={setShortenedUrl} />
          {shortenedUrl && <UrlCard url={shortenedUrl} />}
        </div>
      </div>
    </div>
  );
}

export default App;