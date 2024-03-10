import { FC, ReactNode } from "react";

export type Button = {
  disabled?: boolean;
  onClick: () => void;
};

export const IconButton: FC<Button & { children: ReactNode }> = ({
  children,
  disabled,
  onClick,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    type="button"
    className={`text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center ${
      disabled
        ? "bg-blue-400 cursor-not-allowed"
        : "hover:bg-blue-800 bg-blue-700"
    }`}
  >
    {children}
  </button>
);
