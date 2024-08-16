import React from "react";
import stepper1 from "../../assets/icons/stepper1.svg";
import TextAreaWithEmojiComponent from "../TextAreaWithEmojiComponent";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UploadPostProps {
  pictures: File[];
  caption?: string;
  mention?: string;
}

const UploadPostSchema = z.object({
  caption: z.string().optional(),
  pictures: z
    .any()
    .refine(
      (file) => file && file[0]?.type.startsWith("image/"),
      "Only image files are allowed",
    )
    .refine(
      (file) => file && file[0]?.size <= 5 * 1024 * 1024,
      "File size should be less than 5MB",
    ),
});

const UploadPostsModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadPostProps>({
    resolver: zodResolver(UploadPostSchema),
  });

  const onSubmit = async(data:UploadPostProps) => {
    console.log(data)
  }

  return (
    <div dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <img src={stepper1} alt="" className="mb-6" />
          <TextAreaWithEmojiComponent
            name="caption"
            label="کپشن:"
            register={register}
            styling="!h-[156px] !w-[320px]"
            error={errors.caption?.message}
          ></TextAreaWithEmojiComponent>
        </div>
      </form>
    </div>
  );
};

export default UploadPostsModal;
