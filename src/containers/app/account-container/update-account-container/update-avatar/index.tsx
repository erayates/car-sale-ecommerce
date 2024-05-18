import upload from "@/lib/upload";
import { useUserStore } from "@/providers/userProvider";
import { UserType } from "@/types/user";
import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import { toast } from "react-toastify";

export default function UpdateAvatar() {
  const currentUser = useUserStore((state) => state.currentUser as UserType);
  const [avatar, setAvatar] = useState<{
    file: null | File;
    url: string;
  }>({
    file: null,
    url: "",
  });

  useEffect(() => {
    setAvatar((prev) => ({
      ...prev,
      url: currentUser?.avatar,
    }));
  }, [currentUser]);

  const handleChangeAvatar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (avatar.file) {
      try {
        const imgUrl = await upload(avatar.file, "avatars");
        const response = await fetch(`/api/v1/users/${currentUser.uid}`, {
          method: "PATCH",
          body: JSON.stringify({
            avatar: imgUrl,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok && response.status === 200) {
          toast.success(
            "Your avatar updated successfully. Refresh to see the new avatar."
          );
          setAvatar({
            url: imgUrl as string,
            file: null,
          });
        }
      } catch (err) {
        toast.error("Something went wrong!");
      }
    }
  };

  const onAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0]) {
      setAvatar({
        file: (e.target as HTMLInputElement).files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleChangeAvatar}>
      <p className="text-blue-500 font-semibold">Change Avatar:</p>
      <img
        src={avatar.url}
        className="w-full h-full rounded-md"
        alt="User Avatar"
      />

      <input
        type="file"
        id="file"
        className="hidden"
        name="file"
        onChange={onAvatarChange}
        accept="image/png, image/gif, image/jpeg"
      />

      <div className="flex justify-between">
        <label
          htmlFor="file"
          className="text-xs bg-blue-600 rounded-md text-white px-4 py-2 w-fit cursor-pointer"
        >
          Change Avatar
        </label>
        <button
          type="submit"
          className="bg-orange-600 text-sm px-4 py-2 rounded-md text-white w-fit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
