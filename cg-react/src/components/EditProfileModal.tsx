import React from "react";
import TextInputComponent from "./TextInputComponent";
import usericon from "../assets/icons/user.svg";
import GmailSvg from "../assets/icons/gmail.svg";
import key from "../assets/icons/key.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomButtonH36 from "./ButtonComponentH36";
import ToggleSwitch from "./ToggleButton";
import { useFetchWrapper } from "../user-actions/fetch-wrapper";
import { useSetRecoilState } from "recoil";
import { userProfileAtom } from "../user-actions/atoms";

const EditProfileSchema = z
  .object({
    first_name: z
      .string()
      .min(3, { message: "نام باید حداقل 3 کاراکتر باشد" })
      .optional()
      .or(z.literal("")),
    last_name: z
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
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  bio: string;
  confirmPassword: string;
  avatar:string
}

const EditProfileModal = ({ onClose, profileImage }: EditProfileProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormProps>({
    resolver: zodResolver(EditProfileSchema),
  });

  const fetchWrapper = useFetchWrapper();
  const setUserProfile = useSetRecoilState(userProfileAtom);
  const onSubmit = async (data: ProfileFormProps) => {
    console.log("Raw form data:", data);
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== ""),
    );

    try {
      const response = await fetchWrapper.patch(
        "http://5.34.194.155:4000/users/profile",
        filteredData,
      );
      console.log(filteredData);

      if (response.ok) {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          ...filteredData,
        }));
      } else {
        console.error("Failed to update profile", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="pb-8 text-xl font-bold text-sabz-400">ویرایش حساب</h2>
      <img
        src={profileImage}
        alt="profile image edit/upload"
        className="h-[91px] w-[91px] rounded-full border-2 border-tala"
      />
      <h3 className="mb-12 pt-2 text-sm text-sabz-200">عکس پروفایل</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextInputComponent
          type="text"
          name="first_name"
          placeholder="نام"
          iconsrc={usericon}
          register={register}
          error={errors.first_name?.message}
        ></TextInputComponent>
        <TextInputComponent
          type="text"
          name="last_name"
          placeholder="نام خانوادگی"
          iconsrc={usericon}
          register={register}
          error={errors.last_name?.message}
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
        <ToggleSwitch label="پیج خصوصی باشه"></ToggleSwitch>
        <div>
          <label className="block !pb-4 !pt-2">بایو</label>
          <textarea
            id="bio"
            className="h-[88px] w-[320px] resize-none rounded-[32px] border border-sabz-200 p-4"
            {...register("bio", { max: 64 })}
          ></textarea>
        </div>
        <div className="flex flex-row items-center justify-end">
          <CustomButtonH36
            text="پشیمون شدم"
            styling="!text-siah ml-4"
            handleOnClick={() => onClose()}
          />
          <CustomButtonH36
            text="ثبت تغییرات"
            styling="bg-okhra-200"
            handleOnClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfileModal;
