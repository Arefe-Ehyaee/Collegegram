import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "./TextInputComponent";
import CustomButtonH36 from "./ButtonComponentH36";
import Box from "./BoxComponent";
import EnterSignup from "./EnterSignup";
import Label from "./Label";
import RememberMe from "./RememberMe";
import { NavLink } from "react-router-dom";
import ArrowLink from "./ArrowLink";
import UserSvg from "../assets/icons/user.svg";
import keySvg from "../assets/icons/key.svg";

const loginSchema = z.object({
  username: z
    .string({ required_error: "نام کاربری مورد نیاز است" })
    .min(3, { message: "نام کاربری باید حداقل 3 کاراکتر باشد" }),
  password: z
    .string({ required_error: "رمز عبور مورد نیاز است" })
    .min(3, { message: "رمز عبور باید حداقل 3 کاراکتر باشد" }),
});

interface LoginFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className="backImg flex min-h-screen items-center justify-center relative">
      <Box height="w-full">
        <div className="rahnema-logo absolute top-10"></div>
        <EnterSignup />
        {/* <div className="mt-16"> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-14 flex flex-col items-center"
        >
          <Label text="به کالج گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز عبور خودتون رو وارد کنید" />
          <InputField
            type="text"
            placeholder="نام کاربری یا ایمیل"
            error={errors.username?.message}
            register={register}
            name="username"
            iconsrc={UserSvg}
          />
          <InputField
            type="password"
            placeholder="رمز عبور"
            error={errors.password?.message}
            register={register}
            name="password"
            iconsrc={keySvg}
          />
          <RememberMe />
          <CustomButtonH36 text="ورود" styling="bg-okhra-200 mt-8 text-sm" />
          <div className="absolute bottom-0 right-0 pr-8">
            <NavLink to="/retrievePass">
              <ArrowLink text="فراموشی رمز عبور" />
            </NavLink>
            <ArrowLink text="ثبت نام در کالج گرام" />
          </div>
        </form>

        {/* </div> */}
      </Box>
    </div>
  );
};

export default Login;
