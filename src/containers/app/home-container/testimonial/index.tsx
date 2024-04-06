"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { TiStarFullOutline } from "react-icons/ti";
import "swiper/css";
import "swiper/css/navigation";

const reviews = [
  {
    description: `Ut id lobortis eros, sed finibus dui. Cras eget purus lacus.
    Suspendisse sodales massa quis turpis ultrices ultricies. Cras
    euismod eros at vehicula sagittis. Suspendisse condimentum tortor
    nec enim pellentesque feugiat. Nulla tempor urna vitae sapien
    iaculis, auctor condimentum enim auctor`,
    avatar: "review-avatar-1.jpeg",
    fullName: "John Doe",
    rate: 4,
  },
  {
    description: `Ut id lobortis eros, sed finibus dui. Cras eget purus lacus.
    Suspendisse sodales massa quis turpis ultrices ultricies. Cras
    euismod eros at vehicula sagittis. Suspendisse condimentum tortor
    nec enim pellentesque feugiat. Nulla tempor urna vitae sapien
    iaculis, auctor condimentum enim auctor`,
    avatar: "review-avatar-2.jpeg",
    fullName: "Marianna Frazoni",
    rate: 5,
  },
  {
    description: `Ut id lobortis eros, sed finibus dui. Cras eget purus lacus.
    Suspendisse sodales massa quis turpis ultrices ultricies. Cras
    euismod eros at vehicula sagittis. Suspendisse condimentum tortor
    nec enim pellentesque feugiat. Nulla tempor urna vitae sapien
    iaculis, auctor condimentum enim auctor`,
    avatar: "review-avatar-1.jpeg",
    fullName: "Flora Dudley",
    rate: 4,
  },
];
export default function Testimonial() {
  return (
    <div className="container flex flex-col items-center mt-24">
      <h3 className="text-4xl font-semibold text-center">
        What Clients Say
        <br />
        About Us
      </h3>

      <div className="container flex">
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx} className="p-16">
              <p className="text-center mb-8 text-slate-500 italic px-12 text-lg">
                {review.description}
              </p>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={`/assets/avatars/${review.avatar}`}
                  alt={review.avatar}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <h4 className="text-lg font-semibold">{review.fullName}</h4>
                <div className="flex gap-2 text-xl">
                  {Array(5)
                    .fill(null)
                    .map((_, idx) => (
                      <TiStarFullOutline
                        className={
                          idx < review.rate
                            ? "text-yellow-500"
                            : "text-gray-200"
                        }
                        key={idx}
                      />
                    ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
