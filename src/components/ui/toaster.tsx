import { Toaster as Sonner } from "sonner";

export const Toaster = () => {

  return (
    <Sonner
      richColors
      expand
      position="bottom-right"
      theme="light"
      className="toaster group"
    />
  );
};