import React, { useState } from "react";
import stepper1 from "../../assets/icons/stepper1.svg";
import stepper2 from "../../assets/icons/stepper2.svg";
import stepper3 from "../../assets/icons/stepper3.svg";
import uploadPhoto from "../../assets/icons/uploadPhoto.svg";
import TextAreaWithEmojiComponent from "../TextAreaWithEmojiComponent";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomButtonH36 from "../ButtonComponentH36";
import InputField from "../TextInputComponent";
import { useFetchWrapper } from "../../user-actions/fetch-wrapper";
import { useQueryClient } from "@tanstack/react-query";
import Delete from "../../assets/icons/close.svg";

interface UploadModalProps {
  onClose: Function;
}

interface UploadPostProps {
  pictures: File[];
  caption?: string;
  mentions?: string;
}

const UploadPostSchema = z.object({
  caption: z.string().optional(),
  pictures: z
    .any()
    .refine(
      (file) => file && file[0]?.type.startsWith("image/"),
      "فقط می‌توانید عکس انتخاب کنید",
    )
    .refine(
      (file) => file && file[0]?.size <= 5 * 1024 * 1024,
      "حجم عکس‌ها باید کمتر از ۵ مگابایت باشد",
    ),
  mentions: z.string().optional(),
});

const UploadPostsModal = ({ onClose }: UploadModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UploadPostProps>({
    resolver: zodResolver(UploadPostSchema),
  });

  const queryClient = useQueryClient();

  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const fetchWrapper = useFetchWrapper();

  const handleDeleteUploadImage = (index: number) => {
    setSelectedPhotos((prevState) => {
      const updatedPhotos = prevState.filter((photo, i) => i !== index);
      setValue("pictures", updatedPhotos);
      return updatedPhotos;
    });
  };

  const onSubmit = async (data: UploadPostProps) => {
    const formData = new FormData();
    if (data.pictures) {
      data.pictures.forEach((file) => {
        formData.append("pictures", file);
      });
    }

    if (data.caption) {
      formData.append("caption", data.caption);
    }

    if (data.mentions) {
      formData.append("mentions", data.mentions);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetchWrapper.post(
        "http://5.34.194.155:4000/posts",
        formData,
      );
      if (response.ok) {
        console.log(response);
      } else {
        console.error("Failed to upload", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    }
  };

  return (
    <div dir="rtl" className="flex min-w-[360px] flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 1 && (
          <div className="flex flex-col items-center">
            <img src={stepper1} alt="progress stepper" className="mb-8" />
            <h3 className="mb-16 text-lg">عکس‌های مورد نظرت رو آپلود کن:</h3>
            <div className="flex max-w-[363px] flex-row flex-wrap gap-2">
              <label htmlFor="pictures" className="cursor-pointer">
                <img
                  src={uploadPhoto}
                  alt="add upload icon"
                  className="h-[112px] w-[112px]"
                />
              </label>
              <input
                type="file"
                id="pictures"
                multiple
                accept="image/*"
                {...register("pictures", {
                  onChange: (e) => {
                    const files = e.target.files;
                    if (files) {
                      const filesArray = Array.from(files) as File[];
                      setSelectedPhotos((prevState) => {
                        const updatedPhotos = [...prevState, ...filesArray];
                        setValue("pictures", updatedPhotos); 
                        return updatedPhotos;
                      });
                    }
                  },
                })}
                className="hidden"
              />
              {selectedPhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    className="h-[112px] w-[112px] rounded-3xl object-cover"
                    alt={`uploaded ${index}`}
                  />
                  <img
                    src={Delete}
                    alt="delete"
                    className="absolute left-0 top-0"
                    onClick={() => handleDeleteUploadImage(index)}
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-row self-end">
              <CustomButtonH36
                text="پشیمون شدم"
                styling="!text-siah ml-4"
                handleOnClick={() => onClose()}
              />
              <CustomButtonH36
                text="بعدی"
                styling="bg-okhra-200"
                handleOnClick={() => setCurrentStep(2)}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex flex-col items-center">
            <img src={stepper2} alt="progress stepper" className="mb-8" />
            <h3 className="mb-16 text-lg">کپشن مورد نظرت رو بنویس:</h3>
            <TextAreaWithEmojiComponent
              name="caption"
              label="کپشن:"
              register={register}
              styling="!h-[156px] !min-w-[320px] !my-auto"
              error={errors.caption?.message}
            />
            <div className="mt-8 flex flex-row self-end">
              <CustomButtonH36
                text="پشیمون شدم"
                styling="!text-siah ml-4"
                handleOnClick={() => setCurrentStep(1)}
              />
              <CustomButtonH36
                text="بعدی"
                styling="bg-okhra-200"
                handleOnClick={() => setCurrentStep(3)}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col items-center">
            <img src={stepper3} alt="progress stepper" className="mb-8" />
            <h3 className="mb-16 text-lg">
              اینجا می‌تونی دوستانت رو منشن کنی:
            </h3>
            <InputField
              type="text"
              name="mentions"
              placeholder=""
              register={register}
              error={errors.mentions?.message}
            />
            <div className="mt-8 flex flex-row self-end">
              <CustomButtonH36
                text="پشیمون شدم"
                styling="!text-siah ml-4"
                handleOnClick={() => setCurrentStep(2)}
              />
              <CustomButtonH36
                text="ثبت و انتشار پست"
                styling="bg-okhra-200"
                handleOnClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadPostsModal;
