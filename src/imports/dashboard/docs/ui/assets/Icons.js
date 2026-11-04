export const Document = ({ size = "14", color = "#94A3B8" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-file-text preview-icon"
    >
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
};

export const Spec = () => {
  return (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6875 1.75C13.3984 1.75 14 2.35156 14 3.0625V9.1875C14 9.92578 13.3984 10.5 12.6875 10.5H1.3125C0.574219 10.5 0 9.92578 0 9.1875V1.3125C0 0.601562 0.574219 0 1.3125 0H5.30469C5.55078 0 5.76953 0.109375 5.93359 0.273438L7.4375 1.75H12.6875ZM12.6875 9.1875V3.0625H7.24609C7 3.0625 6.78125 2.98047 6.61719 2.81641L5.14062 1.3125H1.3125V9.1875H12.6875Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const Edit = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-pencil preview-icon"
    >
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      <path d="m15 5 4 4" />
    </svg>
  );
};
