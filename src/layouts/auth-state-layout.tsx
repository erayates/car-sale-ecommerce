"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthState, useUpdateEmail } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/auth";
import { useUserStore } from "@/providers/userProvider";
import { toast } from "react-toastify";

import { UserType } from "@/types/user";
import { onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const AuthStateLayout = ({ children }: { children: ReactNode }) => {
  const currentUser = useUserStore((state) => state.currentUser as UserType);
  const fetchCurrentUser = useUserStore(
    (state) => state.fetchCurrentUser as (uid: string) => void
  );

  const isUserLoading = useUserStore((state) => state.isLoading as boolean);

  const [user, loading] = useAuthState(auth);

  // const changeCurrentUser = async (user: any) => {
  //   fetchCurrentUser(auth.currentUser.uid);
  //   if (!isUserLoading) {
  //     if (user) {
  //       if (!currentUser && user.currentUser.email !== currentUser.email) {
  //         updateUserEmail();
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      fetchCurrentUser(user?.uid);
      if (user) {
        console.log(currentUser);
        if (!isUserLoading && currentUser) {
          user.email !== currentUser.email && updateUserEmail();
        }
        return;
      }
    });
  }, [user]);

  // const options = {
  //   onUserChanged: changeCurrentUser,
  // };

  const [updateEmail] = useUpdateEmail(auth);

  const updateUserEmail = async () => {
    console.log("test update email");
    const isUpdated = await updateEmail(auth.currentUser.email);
    if (isUpdated) {
      const response = await fetch(`/api/v1/users/${currentUser.uid}`, {
        method: "PATCH",
        body: JSON.stringify({
          email: auth.currentUser.email,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok && response.status === 200) {
        toast.success("Your email updated successfully.");
      }
    }
  };

  if (!loading) return children;
};

export default AuthStateLayout;
