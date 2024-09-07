import React, { useEffect, useState } from "react";
import stepper1 from "../../assets/icons/stepper1.svg";
import stepper2 from "../../assets/icons/stepper2.svg";
import stepper3 from "../../assets/icons/stepper3.svg";
import uploadPhoto from "../../assets/icons/uploadPhoto.svg";
import TextAreaWithEmojiComponent from "../TextAreaWithEmojiComponent";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../TextInputComponent";
import { useFetchWrapper } from "../../user-actions/fetch-wrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Delete from "../../assets/icons/close.svg";
import CustomButton from "../CustomButton";
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "../../user-actions/atoms";

interface EditModalProps {
  onClose: Function;
  postData: EditPostProps;
  postId: string;
}

interface EditPostProps {
  pictures: File[];
  caption?: string;
  mentions?: string;
  media: Media[];
  deletedMedia: string[]
}

interface Media {
  id: string;
  mime: string;
  name: string;
  url: string;
  size: number;
}

const EditPostSchema = z.object({
  caption: z.string().optional(),
  pictures: z
    .any()
    .optional()
    .refine(
      (file) => file && file[0]?.type.startsWith("image/"),
      "فقط می‌توانید عکس انتخاب کنید",
    )
    .refine(
      (file) => file && file[0]?.size <= 5 * 1024 * 1024,
      "حجم عکس‌ها باید کمتر از ۵ مگابایت باشد",
    ),
  mentions: z.string().optional(),
  deletedPhotos: z.array(z.string()).optional(),
});

const EditPostsModal = ({ onClose, postData, postId }: EditModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditPostProps>({
    resolver: zodResolver(EditPostSchema),
  });

  const queryClient = useQueryClient();

  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [deletedPhotos, setDeletedPhotos] = useState<string[]>([]);
  const [clickedDelete, setclickedDelete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
 const UserData = useRecoilValue(userProfileAtom)
  useEffect(() => {
    if (postData) {
      setValue("caption", postData.caption || "");
      setValue("mentions", postData.mentions || "");
    }
  }, [postData, setValue]);

  const [mediaList, setMediaList] = useState<Media[]>(postData.media);

  const handleDeleteEditImage = (index: number, id?: string) => {

    setclickedDelete((prevState) => !prevState);

    console.log("deletedPhotos",deletedPhotos);
    
    if (id) {
      setDeletedPhotos((prevState) => {
        if (!prevState.includes(id)) {
          return [...prevState, id];
        }
        return prevState;
      });
    }
  
    setSelectedPhotos((prevState) => {
      if (!id) {
        const updatedPhotos = prevState.filter((photo, i) => i !== index);
        setValue("pictures", updatedPhotos);
        return updatedPhotos;
      }
      return prevState;
    });
  };

///////////////////////////////////////////////////////////////////////////////////////
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || " ");
  }, []);
//////////////////////////////////////////////////////////////////////////////////////
  const mutation = useMutation({
    mutationFn: async (data: EditPostProps) => {
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

    if (deletedPhotos.length > 0) {
      deletedPhotos.forEach((id) => {
        formData.append("deletedMedia[]", id);
      })
      
    }
      
      const response = await fetch(`http://5.34.194.155:4000/posts/${postId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to edit post");
      }

      return response.json();
    },
    onSuccess: () => {
      console.log("mutataionn")
      const username = UserData.firstName
      queryClient.invalidateQueries({ queryKey: ['posts', token, username] });
      onClose();
    },
    onError: (error) => {
      console.error("Error editing:", error);
    },
  });
///////////////////////////////////////////////////////////////////////////////////////
const onSubmit = async (data: EditPostProps) => {

  if (!token) {
    console.error("Token is missing, cannot perform mutation.");
    return;
  }
  data.deletedMedia = deletedPhotos;


  mutation.mutate(data, {
    onError: (error) => {
      console.error("Error occurred during submission:", error);
    },
    onSuccess: (response) => {
      console.log("Submission successful!", response);  
      onClose();  
    },
  });

  console.log("Submit data", data);
};

///////////////////////////////////////////////////////////////////////////////////////
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
                  alt="add Edit icon"
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
                    alt={`Edited ${index}`}
                  />
                  <img
                    src={Delete}
                    alt="delete"
                    className="absolute left-0 top-0"
                    onClick={() => handleDeleteEditImage(index)}
                  />
                </div>
              ))}
              {postData.media.map((media, index) => (
                <div key={media.id} className={`relative ${deletedPhotos.includes(media.id) ? 'faded' : ''}`}>
                  <img
                    key={index}
                    src={`${media.url}`}
                    className="h-[112px] w-[112px] rounded-3xl object-cover"
                    alt={`media ${index}`}
                  />
                  <img
                    src={Delete}
                    alt="delete"
                    className="absolute left-0 top-0"
                    onClick={() => handleDeleteEditImage(index, media.id)}
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-row self-end">
              <CustomButton
                text="پشیمون شدم"
                className="ml-4 !text-siah"
                handleOnClick={() => onClose()}
              ></CustomButton>

              <CustomButton
                text="بعدی"
                className="bg-okhra-200"
                handleOnClick={() => setCurrentStep(2)}
              ></CustomButton>
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
              className="!my-auto !h-[156px] !min-w-[320px]"
              error={errors.caption?.message}
            />
            <div className="mt-8 flex flex-row self-end">
              <CustomButton
                text="پشیمون شدم"
                className="ml-4 !text-siah"
                handleOnClick={() => setCurrentStep(1)}
              ></CustomButton>

              <CustomButton
                text="بعدی"
                className="bg-okhra-200"
                handleOnClick={() => setCurrentStep(3)}
              ></CustomButton>
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
              <CustomButton
                text="پشیمون شدم"
                className="ml-4 !text-siah"
                handleOnClick={() => setCurrentStep(2)}
              ></CustomButton>
              <CustomButton
                text="ثبت و انتشار پست"
                className="bg-okhra-200"
                handleOnClick={handleSubmit(onSubmit)}
              ></CustomButton>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditPostsModal;
