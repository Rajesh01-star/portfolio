import React from 'react';

const ImagingViewerTestPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 w-full max-w-full">
      <div className="flex flex-col mb-6">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Third-Party Embed Test</h1>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
          Here is Ravid's Medical Imaging tool running seamlessly inside our layout:
        </p>
      </div>

      <div className="border-[3px] border-blue-500 rounded-xl overflow-hidden w-full shadow-lg bg-white dark:bg-[#161C25]">
        {/* Ravid Embed */}
        <iframe
          src="https://test-dev.ravid.cloud/imaging-viewer/embed?bgColor=000000&theme=dark&redirectUrl=https://arvpanda-portfolio.vercel.app//test"
          width="100%"
          height="750px"
          style={{ border: 'none', display: 'block' }}
          title="Ravid Imaging Viewer"
        />
      </div>
    </div>
  );
};

export default ImagingViewerTestPage;
