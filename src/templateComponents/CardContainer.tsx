import { FC, ReactNode } from "react";

export const CardContainer: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="p-6 border border-gray-200 rounded-lg shadow mt-2">
    {children}
  </div>
);
