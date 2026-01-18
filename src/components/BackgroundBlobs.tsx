
import React from "react";

export function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 blur-3xl filter saturate-150 pointer-events-none">
        {/* Blob 1: Indigo */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob"></div>
        
        {/* Blob 2: Violet */}
        <div className="absolute top-0 -right-4 w-72 h-72 bg-violet-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
        
        {/* Blob 3: Cyan */}
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>
      </div>
      

    </div>
  );
}
