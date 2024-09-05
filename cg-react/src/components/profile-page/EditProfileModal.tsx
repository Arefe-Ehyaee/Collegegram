import React, { useEffect, useState } from "react";
import TextInputComponent from "../TextInputComponent";
import usericon from "../../assets/icons/user.svg";
import GmailSvg from "../../assets/icons/gmail.svg";
import key from "../../assets/icons/key.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ToggleSwitch from "../ToggleButton";
import { useFetchWrapper } from "../../user-actions/fetch-wrapper";
import { useRecoilState } from "recoil";
import { userProfileAtom } from "../../user-actions/atoms";
import { useQueryClient } from "@tanstack/react-query";
import CustomButton from "../CustomButton";

const EditProfileSchema = z
  .object({
    avatar: z
      .any()
      .optional()
      .refine(
        (file) =>
          !file || file.length === 0 || file[0]?.type.startsWith("image/"),
        "Only image files are allowed",
      )
      .refine(
        (file) =>
          !file || file.length === 0 || file[0]?.size <= 5 * 1024 * 1024,
        "File size should be less than 5MB",
      ),
    firstName: z
      .string()
      .min(3, { message: "نام باید حداقل 3 کاراکتر باشد" })
      .optional()
      .or(z.literal("")),
    lastName: z
      .string()
      .min(3, { message: "نام خانوادگی باید حداقل 3 کاراکتر باشد" })
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .email({ message: "ایمیل نامعتبر است" })
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(5, { message: "رمز عبور باید حداقل 5 کاراکتر باشد" })
      .optional()
      .or(z.literal("")),
    confirmPassword: z
      .string()
      .min(5, { message: "رمز عبور باید حداقل 5 کاراکتر باشد" })
      .optional()
      .or(z.literal("")),
    bio: z.string().optional().or(z.literal("")),
    isPrivate: z.boolean(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "پسورد‌ها باید یکسان باشند",
        path: ["confirmPassword"],
      });
    }
  });

interface EditProfileProps {
  onClose: Function;
  profileImage: string;
}
interface ProfileFormProps {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  bio: string;
  confirmPassword: string;
  avatar: FileList;
  isPrivate: boolean;
}

const EditProfileModal = ({ onClose, profileImage }: EditProfileProps) => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const [defaultChecked,setDefaultChecked] = useState<boolean>(false)
  useEffect(()=>{
    userProfile.isPrivate && setDefaultChecked(userProfile.isPrivate)
  },[userProfile.isPrivate])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormProps>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      bio: userProfile.bio,
      isPrivate: userProfile.isPrivate,
    },
  });
console.log('104',defaultChecked)
console.log('105',userProfile)
  const queryClient = useQueryClient();

  const fetchWrapper = useFetchWrapper();

  const onSubmit = async (data: ProfileFormProps) => {
    console.log("Raw form data:", data);

    const filteredData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        if (key === "avatar" && value.length > 0) {
          filteredData.append(key, value[0]);
        } else if (key === "isPrivate") {
          filteredData.append(key, value ? "true" : "false");
        } else {
          filteredData.append(key, value as string);
        }
      }
    });

    console.log("filteredData", filteredData);
    try {
      const response = await fetchWrapper.patch(
        "http://5.34.194.155:4000/users/profile",
        filteredData,
      );

      if (response.ok) {
        console.log(response.data);
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          ...Object.fromEntries(filteredData),
          avatar: filteredData.get("avatar")
            ? URL.createObjectURL(filteredData.get("avatar") as File)
            : prevProfile.avatar,
        }));
      } else {
        console.error("Failed to update profile", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
      onClose();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="pb-8 text-xl font-bold text-sabz-400">ویرایش حساب</h2>
      <label htmlFor="avatar" className="cursor-pointer">
        <img
          src={profileImage}
          alt="profile image edit/upload"
          className="h-[91px] w-[91px] rounded-full border-2 border-tala"
        />
      </label>
      <input
        type="file"
        id="avatar"
        className="hidden"
        {...register("avatar")}
      />
      {errors.avatar && (
        <p className="text-red-500">{errors.avatar.message as string}</p>
      )}
      <h3 className="mb-12 pt-2 text-sm text-sabz-200">عکس پروفایل</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextInputComponent
          type="text"
          name="firstName"
          placeholder="نام"
          iconsrc={usericon}
          register={register}
          error={errors.firstName?.message}
        ></TextInputComponent>
        <TextInputComponent
          type="text"
          name="lastName"
          placeholder="نام خانوادگی"
          iconsrc={usericon}
          register={register}
          error={errors.lastName?.message}
        ></TextInputComponent>
        <TextInputComponent
          type="email"
          name="email"
          placeholder="ایمیل"
          iconsrc={GmailSvg}
          register={register}
          error={errors.email?.message}
        ></TextInputComponent>
        <TextInputComponent
          type="password"
          name="password"
          placeholder="رمز عبور"
          iconsrc={key}
          register={register}
        ></TextInputComponent>
        <TextInputComponent
          type="password"
          name="confirmPassword"
          placeholder="تکرار رمز عبور"
          iconsrc={key}
          register={register}
          error={errors.confirmPassword?.message}
        ></TextInputComponent>
        <ToggleSwitch
          label="پیج خصوصی باشه"
          register={register}
          name="isPrivate"
          defaultChecked={defaultChecked }
        />
        <div>
          <label className="block !pb-4 !pt-2">بایو</label>
          <textarea
            id="bio"
            className="h-[88px] w-[320px] resize-none rounded-[32px] border border-sabz-200 p-4"
            {...register("bio")}
          ></textarea>
        </div>
        <div className="flex flex-row items-center justify-end">

          <CustomButton text="پشیمون شدم"
            className="!text-siah ml-4"
            handleOnClick={() => onClose()}></CustomButton>

          <CustomButton  text="ثبت تغییرات"
            className="bg-okhra-200"
            handleOnClick={handleSubmit(onSubmit)}></CustomButton>
        </div>
      </form>
    </div>
  );
};

export default EditProfileModal;
