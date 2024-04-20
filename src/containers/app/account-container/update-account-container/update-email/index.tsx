"use client";

import { CircularProgress } from "@mui/material";

import { auth } from "@/lib/firebase/auth";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

import {
  useSignOut,
  useVerifyBeforeUpdateEmail,
} from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useUserStore } from "@/providers/userProvider";

export default function UpdateEmail() {
  const isLoading = useUserStore((state) => state.isLoading as boolean);

  const [signOut] = useSignOut(auth);

  const [verifyBeforeUpdateMail, verifying, verifyError] =
    useVerifyBeforeUpdateEmail(auth);

  const router = useRouter();

  const checkErrors = (errorType: string) => {
    switch (errorType) {
      case "auth/too-many-requests":
        toast.warning(
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
        );
        break;

      case "auth/invalid-credential":
        toast.error(
          "You entered wrong password. Please enter your account password correctly."
        );
        break;
      default:
        toast.error("Something went wrong!");
    }
  };

  const handleChangeEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password").toString();

    if (email === auth.currentUser.email) {
      alert("You entered same email address with your account.");
      return;
    }

    if (email && password) {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );

      reauthenticateWithCredential(auth.currentUser, credential)
        .then(async () => {
          const verify = await verifyBeforeUpdateMail(email);
          if (verify) {
            toast.info(
              "We sent an email to change your email. Please check your new email address that you entered.",
              {
                position: "top-center",
                autoClose: 3000,
              }
            );
            await signOut();
            await fetch(`/api/v1/logout`);

            router.push("/sign-in");
          }
        })
        .catch((err) => {
          checkErrors(err.code);
        });
    }
  };

  if (isLoading) {
    <CircularProgress />;
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleChangeEmail}>
      <p className="text-blue-500 font-semibold">Change Email:</p>

      <div className="flex flex-col gap-2">
        <span className="text-sm lg:col-span-1">New Email:</span>
        <input
          type="email"
          className="outline-none border-gray border rounded-md px-4 py-2  w-full"
          name="email"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm">Password:</span>
        <input
          type="password"
          className="outline-none border-gray border rounded-md px-4 py-2  w-full "
          name="password"
        />
      </div>

      {verifyError && (
        <p className="text-sm text-red-500">{verifyError.message}</p>
      )}

      {verifying ? (
        <CircularProgress />
      ) : (
        <button
          type="submit"
          className="text-white text-sm bg-orange-600 px-4 py-2 rounded-md font-semibold self-end hover:scale-105 transition-all"
        >
          Submit
        </button>
      )}
    </form>
  );
}
