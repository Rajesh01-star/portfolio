'use client';

import React, { useEffect, useState } from 'react';

const BASE_EMBED_SRC =
  'https://test-dev.ravid.cloud/imaging-viewer/embed?bgColor=ffffff&theme=light&accentColor=8B5CF6&partner_code=QGF2ZZXWWA&redirectUrl=https%3A%2F%2Farvpanda-portfolio.vercel.app%2Ftest';

const ImagingViewerTestPage: React.FC = () => {
  const [iframeSrc, setIframeSrc] = useState(BASE_EMBED_SRC);

  useEffect(() => {
    // Read any payment return params Stripe appended to the parent URL
    const params = new URLSearchParams(window.location.search);
    const unlocked = params.get('unlocked');
    const sessionId = params.get('session_id');
    const guestId = params.get('guest_id');
    const stripeSessionId = params.get('stripe_session_id');
    const browserToken = params.get('browser_token');

    // If we got payment params back from Stripe, forward them into the iframe src
    if (unlocked || stripeSessionId) {
      let src = BASE_EMBED_SRC;
      if (unlocked) src += `&unlocked=${encodeURIComponent(unlocked)}`;
      if (sessionId) src += `&session_id=${encodeURIComponent(sessionId)}`;
      if (guestId) src += `&guest_id=${encodeURIComponent(guestId)}`;
      if (stripeSessionId) src += `&stripe_session_id=${encodeURIComponent(stripeSessionId)}`;
      if (browserToken) src += `&browser_token=${encodeURIComponent(browserToken)}`;
      setIframeSrc(src);

      // Clean the payment params from the parent URL (cosmetic)
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, '', cleanUrl);
    }
  }, []);

  return (
    <div className="p-4 sm:p-6 w-full max-w-full">
      <div className="flex flex-col mb-6">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Third-Party Embed Test</h1>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
          Here is Ravid&apos;s Medical Imaging tool running seamlessly inside our layout:
        </p>
      </div>

      <div className="border-[3px] border-blue-500 rounded-xl overflow-hidden w-full shadow-lg bg-white dark:bg-[#161C25]">
        {/* Ravid Embed — src is updated dynamically after Stripe payment redirect */}
        <iframe
          src={iframeSrc}
          width="100%"
          height="750px"
          style={{ border: 'none', display: 'block' }}
          allow="payment"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ravid Imaging Viewer"
        />
      </div>
    </div>
  );
};

export default ImagingViewerTestPage;

