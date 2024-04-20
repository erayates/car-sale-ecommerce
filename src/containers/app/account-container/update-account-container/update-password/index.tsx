"use client";
import { auth } from "@/lib/firebase/auth";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  updatePassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UpdatePassword() {
  const router = useRouter();

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword").toString();
    const newPassword = formData.get("password").toString();

    if (newPassword) {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );

      reauthenticateWithCredential(auth.currentUser, credential)
        .then(async () => {
          updatePassword(auth.currentUser, newPassword)
            .then(async () => {
              toast.success("Your password changed successfully!");
              await signOut(auth);
              await fetch("/api/v1/logout");
              router.push("/sign-in");
            })
            .catch((error) => {
              checkErrors(error.code);
            });
        })
        .catch((error) => {
          checkErrors(error.code);
        });
    }
  };

  const checkErrors = (errorType: string) => {
    switch (errorType) {
      case "auth/invalid-credential":
        toast.error(
          "Your entered password is not your current password. Please check your current password that you entered."
        );
        break;
      default:
        toast.error("Something went wrong!");
        break;
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleChangePassword}>
      <p className="text-blue-500 font-semibold">Change Password:</p>

      <div className="flex flex-col gap-2">
        <span className="text-sm">Password:</span>
        <input
          className="outline-none border-gray border rounded-md px-4 py-2  w-full"
          type="password"
          name="currentPassword"
          placeholder="**********"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm">New Password:</span>
        <input
          className="outline-none border-gray border rounded-md px-4 py-2  w-full "
          type="password"
          name="password"
          placeholder="**********"
          minLength={8}
          maxLength={16}
        />
      </div>

      <button
        type="submit"
        className="text-white text-sm bg-orange-600 px-4 py-2 rounded-md font-semibold self-end hover:scale-105 transition-all"
      >
        Submit
      </button>
    </form>
  );
}
