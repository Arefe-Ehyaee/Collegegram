import Box from "./BoxComponent";
import EnterSignup from "./EnterSignup";
import InputField from "../TextInputComponent";
import UserSvg from "../../assets/icons/user.svg";
import GmailSvg from "../../assets/icons/gmail.svg";
import keySvg from "../../assets/icons/key.svg";
import CustomButtonH36 from "../ButtonComponentH36";
import Label from "../Label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from 'axios';

const signupSchema = z.object({
  username: z
    .string({ required_error: "نام کاربری مورد نیاز است" })
    .min(3, { message: "نام کاربری باید حداقل 3 کاراکتر باشد" }),
  email: z
    .string({ required_error: "ایمیل مورد نیاز است" })
    .min(3, { message: "ایمیل نامعتبر است" }),
  password: z
    .string({ required_error: "رمز عبور مورد نیاز است" })
    .min(3, { message: "رمز عبور باید حداقل 3 کاراکتر باشد" })
    .regex(/[A-Z]/, { message: "رمز عبور باید شامل حداقل یک حرف بزرگ باشد" })
    .regex(/[0-9]/, { message: "رمز عبور باید شامل حداقل یک عدد باشد" }),
  repeatpassword: z
    .string({ required_error: "رمز عبور مورد نیاز است" })
    .min(3, { message: "رمز عبور باید حداقل 3 کاراکتر باشد" }),
})
.superRefine(({ repeatpassword, password }, ctx) => {
  if (repeatpassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "پسورد‌ها باید یکسان باشند",
      path: ["repeatpassword"],
    });
  }
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


  const onSubmit = async (data: SignupFormData) => {
    try{
      console.log(data);
      axios.post('http://5.34.194.155:4000/auth/sign-up',{
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword:data.repeatpassword,
      }).then(res=>{
        const result = res;
        console.log(result,res.status,res.data)
      })
    } catch(error) {
      console.error("There was an error!", error);
    }  
  };
  return (
    <div className="backImg flex min-h-screen items-center justify-center">
      <Box height="w-full">
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
            type="password"
            placeholder="رمز عبور"
            name="password"
            iconsrc={keySvg}
            error={errors.password?.message}
            register={register}
          />
          <InputField
            type="password"
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