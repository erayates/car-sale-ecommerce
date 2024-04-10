import {
  FieldError,
  UseFormRegister,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

export type FormData = {
  [key: string]: string;
};

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export type FormFieldProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  name: string;
  register: UseFormRegister<FormData>;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  max?: number;
  min?: number;
  valueAsNumber?: boolean;
  rows?: number;
  className?: string;
  children?: React.ReactNode;
};
