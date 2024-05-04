"use client";

import { useForm } from "react-hook-form";
import { FormData } from "@/types/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { MdOutlineArrowRightAlt } from "react-icons/md";
import { SignUpFormSchema } from "@/schemes/signUpFormSchema";

import { createUser } from "@/lib/actions";
import { toast } from "react-toastify";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { CircularProgress } from "@mui/material";

import { auth } from "@/lib/firebase/auth";
import { signOut } from "firebase/auth";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const showError = (errorType: string) => {
    switch (errorType) {
      case "auth/email-already-in-use":
        return "Email already in use.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  const onSubmit = async (data: FormData) => {
    const user = await createUserWithEmailAndPassword(
      data.email,
      data.password
    );

    if (user) {
      signOut(auth);
      const response = await createUser(data, user.user.uid);

      if (response.ok) {
        toast.success("You registered successfully!");
        reset();
      }
    }
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

      {loading ? (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <button
          type="submit"
          className="bg-orange-600 text-white p-4 flex gap-2 font-semibold hover:bg-orange-700 hover:transition-all transition-all justify-center text-sm rounded-md"
        >
          Register
          <MdOutlineArrowRightAlt className="text-xl" />
        </button>
      )}

      {error && <p className="text-red-500 text-sm">{showError(error.code)}</p>}
    </form>
  );
}
