import Link from 'next/link';

// Regular expression to detect URLs
const URL_PATTERN = /(\[[^\]]+\]\(https?:\/\/[^\s]+\)|https?:\/\/[^\s]+)/g;
const MARKDOWN_URL_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)|https?:\/\/[^\s]+/g;

// Convert URLs in text to Link components
const renderTextWithLinks = (text: string) => {
  // Split text into segments by URLs
  const segments = text.split(URL_PATTERN).filter(Boolean) || [];

  console.log('text:', text);
  console.log('segments:', segments);

  return segments.map((segment, index) => {
    // Check if the segment matches the URL pattern
    const match = MARKDOWN_URL_PATTERN.exec(segment);

    console.log('segment:', segment);
    console.log('match:', match);

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

    return <span key={index}>{segment}</span>;
  });
};

interface FormattedTextProps {
  text?: string;
  className?: string;
}

export function FormattedText({ text, className }: FormattedTextProps) {
  return text
    ? <div className={className}>
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
    : null;
}