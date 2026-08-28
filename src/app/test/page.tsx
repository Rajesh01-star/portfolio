'use client';

import React from 'react';
import Script from 'next/script';

const ImagingViewerTestPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 w-full max-w-full">
      <div className="flex flex-col mb-6">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Third-Party Embed Test</h1>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
          Here is Ravid&apos;s Medical Imaging tool running seamlessly inside our layout:
        </p>
      </div>

      <div className="border-[3px] border-blue-500 rounded-xl overflow-hidden w-full shadow-lg bg-white dark:bg-[#161C25]">
        {/* Ravid Embed — embed.js reads payment return params from URL and injects into iframe automatically */}
        <div
          className="ravid-embed"
          data-partner-id="QGF2ZZXWWA"
          data-redirect-url="https://arvpanda-portfolio.vercel.app/test"
          data-theme="light"
          data-bg-color="ffffff"
          data-accent-color="8B5CF6"
          data-height="750px"
        />
        <Script
          src="https://test-dev.ravid.cloud/widgets/embed.js"
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
};

export default ImagingViewerTestPage;

