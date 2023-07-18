"use client";

import { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className: string;
} & ComponentProps<"button">;

const FormSubmitButton = ({
  children,
  className,
  ...props
}: FormSubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      className={`btn-primary btn ${className}`}
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner loading-md" />}
      {children}
    </button>
  );
};

export default FormSubmitButton;
