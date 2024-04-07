"use client";

import { useForm } from "react-hook-form";
import { FormData } from "@/types/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { MdOutlineArrowRightAlt } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormSchema } from "@/schemes/contactFormSchema";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("success!", data);
  };

  return (
    <div className="container flex flex-col gap-16 my-24">
      <div className="flex items-center gap-4 justify-center">
        <div className="w-8 h-3 bg-orange-600"></div>
        <h3 className="text-3xl font-bold">Send Us A Message</h3>
        <div className="w-8 h-3 bg-orange-600"></div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              register={register}
              error={errors.email}
            />

            <Input
              type="text"
              placeholder="Phone Number"
              name="phone"
              register={register}
              error={errors.phone}
            />
          </div>

          <Textarea
            placeholder="Leave Your Message"
            name="message"
            register={register}
            error={errors.message}
          />

          <button
            type="submit"
            className="bg-orange-600 text-white p-4 flex gap-2 font-semibold hover:bg-orange-700 hover:transition-all transition-all text-sm ml-auto mr-0 max-w-max rounded-md"
          >
            Submit
            <MdOutlineArrowRightAlt className="text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
}
