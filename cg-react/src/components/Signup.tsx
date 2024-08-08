import Box from "./BoxComponent";
import EnterSignup from "./EnterSignup";
import InputField from "./TextInputComponent";
import UserSvg from "../assets/icons/user.svg";
import GmailSvg from "../assets/icons/gmail.svg";
import keySvg from "../assets/icons/key.svg";
import CustomButtonH36 from "./ButtonComponentH36";
import Label from "./Label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signupSchema = z.object({
  username: z
    .string({ required_error: "نام کاربری مورد نیاز است" })
    .min(3, { message: "نام کاربری باید حداقل 3 کاراکتر باشد" }),
  email: z
    .string({ required_error: "ایمیل مورد نیاز است" })
    .min(3, { message: "ایمیل نامعتبر است" }),
  password: z
    .string({ required_error: "رمز عبور مورد نیاز است" })
    .min(3, { message: "رمز عبور باید حداقل 3 کاراکتر باشد" }),
  repeatpassword: z
    .string({ required_error: "رمز عبور مورد نیاز است" })
    .min(3, { message: "رمز عبور باید حداقل 3 کاراکتر باشد" }),
});

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  repeatpassword: string;
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
  };
  return (
    <div className="backImg flex min-h-screen items-center justify-center">
      <Box height="636.58px">
        <div className="rahnema-logo absolute top-10"></div>
        <EnterSignup />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-14 flex flex-col items-center"
        >
          <Label
            text={
              "برای ثبت نام کافیه نام کاربری، ایمیل و یک رمز عبور وارد کنید"
            }
          ></Label>
          <InputField
            type="text"
            placeholder="نام کاربری"
            name="username"
            iconsrc={UserSvg}
            error={errors.username?.message}
            register={register}
          />
          <InputField
            type="text"
            placeholder="ایمیل"
            name="email"
            iconsrc={GmailSvg}
            error={errors.email?.message}
            register={register}
          />
          <InputField
            type="text"
            placeholder="رمز عبور"
            name="password"
            iconsrc={keySvg}
            error={errors.password?.message}
            register={register}
          />
          <InputField
            type="text"
            placeholder="تکرار رمز عبور"
            name="repeatpassword"
            iconsrc={keySvg}
            error={errors.repeatpassword?.message}
            register={register}
          />
          <CustomButtonH36
            text={"ثبت نام"}
            styling="bg-okhra-200 mt-12 text-sm"
          ></CustomButtonH36>
        </form>
      </Box>
    </div>
  );
}

export default SignUp;