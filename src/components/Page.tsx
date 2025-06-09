import React, { forwardRef, ReactNode } from 'react';

type PageProps = {
  number: number;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Page = forwardRef<HTMLDivElement, PageProps>(({ number, children, className = '', style }, ref) => {
  return (
    <div 
      className={`relative bg-white shadow-xl rounded-r-lg overflow-hidden ${className}`} 
      ref={ref}
      style={style}
    >
      <div className="absolute inset-0 p-4 flex flex-col">
        {children}
      </div>
      <div className="absolute bottom-3 right-3 text-sm text-gray-500">
        {number}
      </div>
    </div>
  );
});

Page.displayName = 'Page';

export default Page;
