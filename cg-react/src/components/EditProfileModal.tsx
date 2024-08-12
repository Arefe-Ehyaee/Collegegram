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

const EditProfileSchema = z
  .object({
    name: z.string().min(3, { message: "نام باید حداقل 3 کاراکتر باشد" }),
    surname: z
      .string()
      .min(3, { message: "نام خانوادگی باید حداقل 3 کاراکتر باشد" }),
    email: z.string().email({ message: "ایمیل نامعتبر است" }),
    password: z
      .string({ required_error: "رمز عبور مورد نیاز است" })
      .min(5, { message: "رمز عبور باید حداقل 5 کاراکتر باشد" }),
    confirmPassword: z
      .string({ required_error: "رمز عبور مورد نیاز است" })
      .min(5, { message: "رمز عبور باید حداقل 5 کاراکتر باشد" }),
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
  name: string;
  surname: string;
  password: string;
  email: string;
  bio: string;
  confirmPassword: string;
}

const EditProfileModal = ({ onClose, profileImage }: EditProfileProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormProps>({
    resolver: zodResolver(EditProfileSchema),
  });

  const onSubmit = (data: ProfileFormProps) => {
    console.log(data);
    onClose();
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
          name="name"
          placeholder="نام"
          iconsrc={usericon}
          register={register}
          error={errors.name?.message}
        ></TextInputComponent>
        <TextInputComponent
          type="text"
          name="surname"
          placeholder="نام خانوادگی"
          iconsrc={usericon}
          register={register}
          error={errors.surname?.message}
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
            name="bio"
            id="bio"
            className="h-[88px] w-[320px] resize-none rounded-[32px] border border-sabz-200 p-4"
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
