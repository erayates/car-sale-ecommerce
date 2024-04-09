"use client";

import { useForm } from "react-hook-form";
import { FormData } from "@/types/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { MdOutlineArrowRightAlt } from "react-icons/md";
import { SignInFormSchema } from "@/schemes/signInFormSchema";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(SignInFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("success!", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        type="email"
        placeholder="Email"
        name="email"
        register={register}
        error={errors.email}
      />

      <Input
        type="password"
        placeholder="Password"
        name="password"
        register={register}
        error={errors.password}
      />

      <button
        type="submit"
        className="bg-orange-600 text-white p-4 flex gap-2 font-semibold hover:bg-orange-700 hover:transition-all transition-all justify-center text-sm rounded-md"
      >
        Login
        <MdOutlineArrowRightAlt className="text-xl" />
      </button>
    </form>
  );
}
