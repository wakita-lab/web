import Link from 'next/link';
import { useMemo } from 'react';

// Regular expression to detect URLs
const URL_PATTERN_SPLIT = /(\[[^\]]+\]\(https?:\/\/[^\s]+\)|https?:\/\/[^\s]+)/g;
const URL_PATTERN_MATCH = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)|https?:\/\/[^\s]+/g;

// Convert URLs in text to Link components
const renderTextWithLinks = (text: string) => {
  // Split text into segments by URLs
  const segments = text.split(URL_PATTERN_SPLIT).filter(Boolean) || [];

  return segments.map((segment, index) => {
    // Check if the segment matches the URL pattern
    const match = URL_PATTERN_MATCH.exec(segment);

    if (match) {
      const url = match[2] || match[0]; // Get the URL from the match
      const text = match[1] || match[0]; // Get the display text

      return (
        <Link
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-neutral-500 underline underline-offset-4 duration-100 hover:text-neutral-400"
        >
          {text}
        </Link>
      );
    }

    return segment;
  });
};

interface FormattedTextProps {
  text?: string;
  className?: string;
}

export const FormattedText = ({ text, className }: FormattedTextProps) => {
  const formattedContent = useMemo(() => {
    if (!text) return null;

    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) return <div key={index} className="h-3" />;

      return (
        <p key={index} className={className}>
          {renderTextWithLinks(trimmedLine)}
        </p>
      );
    });
  }, [text, className]);

  if (!text) return null;

  return <div className={className}>{formattedContent}</div>;
};