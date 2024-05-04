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
import { Button, Typography } from "@mui/material";

const inputStyle = {
  border: "2px solid #e3e3e3",
  borderRadius: "5px",
  padding: "10px 5px 10px 5px",
  width: "100%",
};

export default function UpdateUserForm({ user }: { user: UserType }) {
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
    defaultValues: useMemo(() => {
      return user;
    }, [user]),
  });

  const onSubmit = async (data: FormData) => {
    const { firstName, lastName, country, province, addressLine, phone } = data;
    try {
      const response = await fetch(`/api/v1/users/${user.id}`, {
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
        toast.success("User profile updated successfully.");
        return;
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <Typography variant="body2">Firstname:</Typography>
        <Input
          type="text"
          name="firstName"
          style={inputStyle}
          register={register}
          error={errors.firstName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="body2">Lastname:</Typography>
        <Input
          type="text"
          name="lastName"
          style={inputStyle}
          register={register}
          error={errors.lastName}
        />
      </div>

      <div className="flex flex-col  gap-2">
        <Typography variant="body2">Phone:</Typography>
        <Input
          type="number"
          name="phone"
          style={inputStyle}
          register={register}
          error={errors.phone}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="body2">Country:</Typography>
        <Input
          type="text"
          name="country"
          style={inputStyle}
          register={register}
          error={errors.country}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="body2">Province:</Typography>
        <Input
          type="text"
          name="province"
          style={inputStyle}
          register={register}
          error={errors.province}
        />
      </div>

      <div className="flex flex-col  gap-2">
        <Typography variant="body2">Adress Line:</Typography>
        <Textarea
          type="text"
          name="addressLine"
          style={{ ...inputStyle, resize: "none" }}
          register={register}
          error={errors.addressLine}
        />
      </div>

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
}
