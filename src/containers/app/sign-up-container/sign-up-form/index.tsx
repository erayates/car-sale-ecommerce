"use client";

import { useForm } from "react-hook-form";
import { FormData } from "@/types/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { MdOutlineArrowRightAlt } from "react-icons/md";
import { SignUpFormSchema } from "@/schemes/signUpFormSchema";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("success!", data);
    createUserWithEmailAndPassword(auth, data.email, data.password).then(
      (user) => {
        console.log("success!", user);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="First Name"
        name="firstName"
        register={register}
        error={errors.firstName}
      />

      <Input
        type="text"
        placeholder="Last Name"
        name="lastName"
        register={register}
        error={errors.lastName}
      />

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

      <Input
        type="password"
        placeholder="Password Confirm"
        name="passwordConfirm"
        register={register}
        error={errors.passwordConfirm}
      />

      <button
        type="submit"
        className="bg-orange-600 text-white p-4 flex gap-2 font-semibold hover:bg-orange-700 hover:transition-all transition-all justify-center text-sm rounded-md"
      >
        Register
        <MdOutlineArrowRightAlt className="text-xl" />
      </button>
    </form>
  );
}
