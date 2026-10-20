export const Due = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <clipPath id="topChamber">
          <path d="M6 3h12v2c0 3-2 5-6 7-4-2-6-4-6-7V3Z" />
        </clipPath>
        <clipPath id="bottomChamber">
          <path d="M6 21v-2c0-3 2-5 6-7 4 2 6 4 6 7v2H6Z" />
        </clipPath>
      </defs>
      <rect
        x="6"
        y="3"
        width="12"
        height="4.5"
        fill="currentColor"
        stroke="none"
        clipPath="url(#topChamber)"
      />
      <rect
        x="6"
        y="16.5"
        width="12"
        height="4.5"
        fill="currentColor"
        stroke="none"
        clipPath="url(#bottomChamber)"
      />
      <path d="M6 3h12v2c0 3-2 5-6 7-4-2-6-4-6-7V3Z" />
      <path d="M6 21h12v-2c0-3-2-5-6-7-4 2-6 4-6 7v2Z" />
    </svg>
  );
};

export const Calendar = () => (
  <svg viewBox="0 0 24 24" fill="none" width="13" height="13">
    <rect
      x="4"
      y="6"
      width="16"
      height="15"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path d="M8 3v5M16 3v5M4 10h16" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
