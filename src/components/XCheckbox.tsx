export default function XCheckbox({ selected } : { selected: boolean }) {
  return (
    <div className="cursor-pointer">
      <svg width="16" height="16" stroke="currentColor" fill="none" strokeWidth={1} viewBox="0 0 16 16">
        <path d="M2 2 L14 2 L14 14L2 14Z" />
        <path
          d="M2 2 L14 14"
          className="transition-[stroke-dashoffset] duration-200 ease-in-out"
          strokeDasharray="17"
          strokeDashoffset={selected ? '0' : '17'}
        />
        <path
          d="M14 2 L2 14"
          className="transition-[stroke-dashoffset] delay-150 duration-200 ease-in-out"
          strokeDasharray="17"
          strokeDashoffset={selected ? '0' : '17'}
        />
      </svg>
    </div>
  );
}