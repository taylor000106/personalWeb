"use client";

type DemoFrameProps = {
  src: string;
  title: string;
  className?: string;
};

export function DemoFrame({ src, title, className = "" }: DemoFrameProps) {
  return (
    <iframe
      src={src}
      title={title}
      className={`h-full w-full border-0 ${className}`}
      sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-modals"
      loading="lazy"
    />
  );
}
