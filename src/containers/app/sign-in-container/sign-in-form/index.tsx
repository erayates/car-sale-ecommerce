"use client";

import { useForm } from "react-hook-form";
import { FormData } from "@/types/form";
import { Input } from "@/components/ui/input";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { MdOutlineArrowRightAlt } from "react-icons/md";
import { SignInFormSchema } from "@/schemes/signInFormSchema";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/auth";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/providers/userProvider";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(SignInFormSchema),
  });

  const router = useRouter();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = async (data: FormData) => {
    const user = await signInWithEmailAndPassword(data.email, data.password);
    if (user) {
      const idToken = await user.user.getIdToken();

      await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      router.push("/");
    }
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

      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <button
          type="submit"
          className="bg-orange-600 text-white p-4 flex gap-2 font-semibold hover:bg-orange-700 hover:transition-all transition-all justify-center text-sm rounded-md"
        >
          Login
          <MdOutlineArrowRightAlt className="text-xl" />
        </button>
      )}
      {error && (
        <p className="text-red-500 text-sm">
          You entered wrong email or password.
        </p>
      )}
    </form>
  );
}
