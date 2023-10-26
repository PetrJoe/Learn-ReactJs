import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
    </div>
  );
}

export default Loading;