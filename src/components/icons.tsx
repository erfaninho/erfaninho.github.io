type Props = { size?: number };

function Svg({
  size = 22,
  children,
  viewBox = "0 0 24 24",
}: {
  size?: number;
  viewBox?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function IconUser({ size }: Props) {
  return (
    <Svg size={size}>
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 21a8 8 0 0 1 16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconRocket({ size }: Props) {
  return (
    <Svg size={size}>
      <path
        d="M14 3c3.5.3 6.7 3.5 7 7-2 1.3-4.2 2-6.5 2.2-1 2.3-2.6 4.5-4.8 6.3l-2.7.5.5-2.7c1.8-2.2 4-3.8 6.3-4.8C12 9.2 12.7 7 14 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M7 17c-1.6.2-3 .8-4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 15c-1.4-1.4-3-2-5-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16.5" cy="7.5" r="1.5" fill="currentColor" />
    </Svg>
  );
}

export function IconBook({ size }: Props) {
  return (
    <Svg size={size}>
      <path
        d="M6 4h10a2 2 0 0 1 2 2v14H8a2 2 0 0 0-2 2V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8 20V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function IconTools({ size }: Props) {
  return (
    <Svg size={size}>
      <path
        d="M14 7a4 4 0 0 0-6.3 3.2c0 .4.1.9.2 1.3L4 15.4l2.6 2.6 3.9-3.9c.4.1.9.2 1.3.2A4 4 0 0 0 14 7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 13l4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 11l3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconTimeline({ size }: Props) {
  return (
    <Svg size={size}>
      <path d="M6 7h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18.5" cy="7" r="1.5" fill="currentColor" />
      <circle cx="20.5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="19.5" cy="17" r="1.5" fill="currentColor" />
    </Svg>
  );
}

