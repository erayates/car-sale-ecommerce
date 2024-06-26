import { Input } from "@/components/ui/input";
import { useUserStore } from "@/providers/userProvider";
import { UserInfoSchema } from "@/schemes/userInfoSchema";
import { UserType } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormData } from "@/types/form";
import { useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

export default function UpdateUserInfo() {
  const currentUser = useUserStore((state) => state.currentUser as UserType);
  const isLoading = useUserStore((state) => state.isLoading as boolean);
  const fetchCurrentUser = useUserStore(
    (state) => state.fetchCurrentUser as (uid: string) => void
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: isLoading
      && UserInfoSchema.parse({
          firstName: currentUser.firstName ?? "",
          lastName: currentUser.lastName ?? "",
          province: currentUser.address.province ?? "",
          addressLine: currentUser.address.addressLine ?? "",
          country: currentUser.address.country ?? "",
          phone: currentUser.phone ?? "",
        })
  });

  const onSubmit = async (data: FormData) => {
    const { firstName, lastName, country, province, addressLine, phone } = data;
    try {
      const response = await fetch(`/api/v1/users/${currentUser.uid}`, {
        method: "PUT",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          addressLine: addressLine,
          province: province,
          country: country,
          phone: phone,
        }),
      });
      if (response.ok && response.status === 200) {
        fetchCurrentUser(currentUser.uid);
        toast.success("Your profile updated successfully.");
        reset();
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-blue-600 font-semibold">Personal Details:</p>

      <div className="flex flex-col gap-2">
        <span className="text-sm">Firstname:</span>
        <Input
          type="text"
          name="firstName"
          className="outline-none border-gray border rounded-md px-4 py-2 w-full"
          register={register}
          value={currentUser?.firstName}
          error={errors.firstName}
        />
      </div>

      <div className="flex flex-col  gap-2">
        <span className="text-sm lg:col-span-1">Lastname:</span>
        <Input
          type="text"
          name="lastName"
          className="outline-none border-gray border rounded-md px-4 py-2 w-full "
          value={currentUser?.lastName}
          register={register}
          error={errors.lastName}
        />
      </div>

      <div className="flex flex-col  gap-2">
        <span className="text-sm lg:col-span-1">Phone:</span>
        <Input
          type="number"
          name="phone"
          value={currentUser?.phone}
          className="outline-none border-gray border rounded-md px-4 py-2 w-full "
          register={register}
          error={errors.phone}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm">Country:</span>
        <Input
          type="text"
          name="country"
          className="outline-none border-gray border rounded-md px-4 py-2 w-full "
          register={register}
          value={currentUser?.address.country}
          error={errors.country}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm">Province:</span>
        <Input
          type="text"
          name="province"
          className="outline-none border-gray border rounded-md px-4 py-2 w-full"
          register={register}
          value={currentUser?.address.province}
          error={errors.province}
        />
      </div>

      <div className="flex flex-col  gap-2">
        <span className="text-sm">Addresline:</span>
        <Textarea
          type="text"
          name="addressLine"
          register={register}
          error={errors.addressLine}
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
