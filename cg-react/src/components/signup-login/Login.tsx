import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../TextInputComponent";
import Box from "./BoxComponent";
import EnterSignup from "./EnterSignup";
import Label from "../Label";
import RememberMe from "./RememberMe";
import { NavLink, useNavigate } from "react-router-dom";
import ArrowLink from "./ArrowLink";
import UserSvg from "../../assets/icons/user.svg";
import keySvg from "../../assets/icons/key.svg";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../user-actions/atoms";
import { useFetchWrapper } from "../../user-actions/fetch-wrapper";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import CustomButton from "../CustomButton";

const loginSchema = z.object({
  username: z
    .string({ required_error: "نام کاربری مورد نیاز است" })
    .min(3, { message: "نام کاربری باید حداقل 3 کاراکتر باشد" }),
  password: z
    .string({ required_error: "رمز عبور مورد نیاز است" })
    .min(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" }),
});

interface LoginFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const queryClient = useQueryClient();
  const fetchWrapper = useFetchWrapper();
  const setAuth = useSetRecoilState(authAtom);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await fetchWrapper.post(
        "http://5.34.194.155:4000/auth/login",
        {
          username: data.username,
          password: data.password,
        },
      );
      const { token } = response.data;
      // const token = response.data.token;

      if (response.ok) {
        localStorage.setItem("token", token);
        setAuth({ token });
        navigate("/userprofile");
        toast.success("با موفقیت وارد شدید!");
      }
    } catch (error) {
      toast.error("نام کاربری یا رمز عبور اشتباهه!");
      console.error("Login error:", error);
    } finally {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
      setIsLoading(false);
    }
  };

  return (
    <div className="backImg relative flex min-h-screen items-center justify-center">
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
          <CustomButton
            text="ورود"
            className="mt-8 bg-red-200 text-sm"
          ></CustomButton>
          <div className="absolute bottom-0 right-0 pr-8">
            <NavLink to="/retrievePass">
              <ArrowLink text="فراموشی رمز عبور" />
            </NavLink>
            <NavLink to="/signup">
              <ArrowLink text="ثبت نام در کالج گرام" />
            </NavLink>
          </div>
        </form>

        {/* </div> */}
      </Box>
    </div>
  );
};

export default Login;
