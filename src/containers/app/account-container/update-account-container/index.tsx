"use client";
import { useUserStore } from "@/providers/userProvider";
import { CircularProgress } from "@mui/material";

import * as React from "react";
import UpdateEmail from "./update-email";
import UpdatePassword from "./update-password";
import UpdateUserInfo from "./update-user-info";

export default function UpdateAccountContainer() {
  const isLoading = useUserStore((state) => state.isLoading as boolean);

  if (isLoading) {
    return (
      <div className="col-span">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="col-span-2 flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">
        Change Your Account Information
      </h3>
      <div className="grid grid-cols-2 gap-24">
        <div className="col-span-2 lg:col-span-1">
          <UpdateUserInfo />
        </div>

        <div className="col-span-2 lg:col-span-1 w-full space-y-8">
          <UpdatePassword />
          <UpdateEmail />
        </div>
      </div>
    </div>
  );
}
