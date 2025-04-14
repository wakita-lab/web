import Link from 'next/link';

// Regular expression to detect URLs
const URL_PATTERN = /https?:\/\/[^\s]+/g;

// Convert URLs in text to Link components
const renderTextWithLinks = (text: string) => {
  // Split text into segments by URLs
  const segments = text.split(URL_PATTERN);
  const urls = text.match(URL_PATTERN) || [];

  // Alternate between text segments and URLs
  return segments.map((segment, index) => {
    const elements = [];

    // Regular text segment
    if (segment) {
      elements.push(segment);
    }

    // URL segment
    if (urls[index]) {
      elements.push(
        <Link
          key={`link-${index}`}
          href={urls[index]}
          className="text-gray-500 underline underline-offset-4 hover:text-gray-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          {urls[index]}
        </Link>,
      );
    }

    return elements;
  }).flat();
};

interface FormattedTextProps {
  text?: string;
  className?: string;
}

export function FormattedText({ text, className }: FormattedTextProps) {
  return text ? (
    <div className={className}>
      {text.split('\n').map((line, index) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return null;

        return (
          <p key={index} className={className}>
            {renderTextWithLinks(trimmedLine)}
          </p>
        );
      })}
    </div>
  ) : null;
}