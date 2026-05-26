/* Worldkit Soccer bag icon — vector lifted from Figma (node 2001:264).
   Uses currentColor so it inherits the surrounding text color. */

export function BagIcon({
  className,
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12.5556 8.2C12.5556 9.15478 12.181 10.0705 11.5142 10.7456C10.8474 11.4207 9.94299 11.8 9 11.8C8.05701 11.8 7.15264 11.4207 6.48584 10.7456C5.81905 10.0705 5.44444 9.15478 5.44444 8.2M1.09156 4.6306H16.9084M1.35556 4.1203C1.12476 4.43187 1 4.81083 1 5.2003V17.2C1 17.6774 1.1873 18.1352 1.5207 18.4728C1.8541 18.8104 2.30628 19 2.77778 19H15.2222C15.6937 19 16.1459 18.8104 16.4793 18.4728C16.8127 18.1352 17 17.6774 17 17.2V5.2003C17 4.81083 16.8752 4.43187 16.6444 4.1203L14.8667 1.72C14.7011 1.49645 14.4863 1.315 14.2395 1.19003C13.9926 1.06506 13.7204 1 13.4444 1H4.55556C4.27956 1 4.00736 1.06506 3.76051 1.19003C3.51365 1.315 3.29893 1.49645 3.13333 1.72L1.35556 4.1203Z" />
    </svg>
  );
}
