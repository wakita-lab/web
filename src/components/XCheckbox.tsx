export default function XCheckbox({selected}: { selected: boolean }) {
  return (
    <div className="cursor-pointer">
      <svg width="16" height="16" stroke="currentColor" fill="none" strokeWidth={1} viewBox="0 0 16 16">
        <path d="M2 2 L14 2 L14 14L2 14Z" />
        {selected && (
          <path d="M2 2 L14 14 M14 2L2 14Z" />
        )}
      </svg>
    </div>
  );
}