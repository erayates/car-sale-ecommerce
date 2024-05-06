"use client";

import { useForm } from "react-hook-form";
import { FormData } from "@/types/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { MdOutlineArrowRightAlt } from "react-icons/md";

import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/auth";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ForgotPasswordSchema } from "@/schemes/forgotPasswordSchema";

const actionCodeSettings = {
  url: `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/sign-in`,
};

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const [sendSuccess, setSendSuccess] = useState(false);

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (data: FormData) => {
    const success = await sendPasswordResetEmail(
      data.email.toString(),
      actionCodeSettings
    );

    if (success) {
      setSendSuccess(true);
    }
  };

  if (sendSuccess) {
    return (
      <div className="flex flex-col gap-4 text-center items-center text-green-500">
        <p className="text-sm">
          We have sent you an email with further instructions. Please check your
          email and fill the form again if you didnt get an email.
        </p>
        <FaCheckCircle className="text-5xl" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        type="email"
        placeholder="Email"
        name="email"
        register={register}
        error={errors.email}
      />

      <button
        type="submit"
        className="bg-orange-600 text-white p-4 flex gap-2 font-semibold hover:bg-orange-700 hover:transition-all transition-all justify-center text-sm rounded-md"
      >
        Send Reset Link
        <MdOutlineArrowRightAlt className="text-xl" />
      </button>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </form>
  );
}
