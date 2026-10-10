export const Document = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
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

export const Trash = () => (
  <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
    <path
      d="M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Preview = () => {
  return (
    <svg
      width="15"
      height="10"
      viewBox="0 0 15 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.4812 2.0781V2.10408C9.09175 2.10408 10.3906 3.40291 10.3906 4.98748C10.3906 6.59802 9.09175 7.89685 7.4812 7.89685C5.87065 7.89685 4.57183 6.59802 4.57183 4.98748C4.57183 4.70173 4.62378 4.44197 4.70171 4.1822C4.88354 4.31208 5.14331 4.36404 5.40308 4.36404C6.18237 4.36404 6.85776 3.71462 6.85776 2.90935C6.83179 2.67556 6.77983 2.4158 6.64995 2.20798C6.90972 2.13005 7.19546 2.10408 7.4812 2.0781ZM14.8585 4.6238C14.9105 4.72771 14.9365 4.85759 14.9365 5.01345C14.9365 5.14333 14.9105 5.27322 14.8585 5.37712C13.4558 8.13064 10.6503 9.97498 7.4812 9.97498C4.28608 9.97498 1.48061 8.13064 0.0778806 5.37712C0.0259274 5.27322 -4.91142e-05 5.14333 -4.91142e-05 4.98748C-4.91142e-05 4.85759 0.0259274 4.72771 0.0778806 4.6238C1.48061 1.87029 4.28608 -2.45571e-05 7.4812 -2.45571e-05C10.6503 -2.45571e-05 13.4558 1.87029 14.8585 4.6238ZM7.4812 8.7281C10.0269 8.7281 12.3908 7.29939 13.6376 4.98748C12.3908 2.67556 10.0269 1.24685 7.4812 1.24685C4.90952 1.24685 2.54565 2.67556 1.29878 4.98748C2.54565 7.29939 4.90952 8.7281 7.4812 8.7281Z"
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
