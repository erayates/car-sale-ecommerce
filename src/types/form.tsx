import { FieldError, UseFormRegister } from "react-hook-form";

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
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  rows?: number;
  className?: string;
  children?: React.ReactNode;
};

export type ValidFieldNames =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "message"
  | "password"
  | "passwordConfirm";
