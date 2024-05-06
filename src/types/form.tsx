import { ChangeEvent } from "react";
import {
  FieldError,
  UseFormRegister,
  FieldErrorsImpl,
  Merge,
  FieldValues,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";

export type FormData = {
  [key: string]: string | string[];
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
  defaultValue?: string;
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
  style?: React.CSSProperties;
};

export type CheckboxProps = {
  name: string;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  className?: string;
  register: UseFormRegister<FormData>;
  value: string;
};

export type FileInputProps = {
  name: string;
  register: UseFormRegister<FormData> | UseFormRegister<any>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  multiple: boolean;
};
