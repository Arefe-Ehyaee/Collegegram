import Box from './BoxComponent';
import InputField from '../TextInputComponent';
import keySvg from "../../assets/icons/key.svg"
import CustomButtonH36 from '../ButtonComponentH36';
import Label from '../Label';
import BoxTitle from './BoxTitle';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const SetNewPassSchema = z.object({
  username: z
    .string({ required_error: "نام کاربری مورد نیاز است" })
    .min(3, { message: "نام کاربری باید حداقل 3 کاراکتر باشد" }),
});

interface SetNewPassFormData {
  username: string;
}

const SetNewPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetNewPassFormData>({
    resolver: zodResolver(SetNewPassSchema),
  });

  const onSubmit = (data: SetNewPassFormData) => {
    console.log(data);
  };

  return (
        <div className='flex items-center justify-center min-h-screen backImg'>
          <Box height="w-full">
            <div className="rahnema-logo absolute top-10"></div>
            <div className='mt-14'>
              <BoxTitle text={'تنظیم رمز عبور جدید'}></BoxTitle>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center"
              >
              <Label text={'لطفا رمز جدیدی برای حساب خود انتخاب کنید'}></Label>
              <InputField 
                type="text" 
                placeholder="رمز عبور" 
                name="password" 
                error={errors.username?.message}
                iconsrc={keySvg} 
                register={register}
              />

              <InputField 
                type="text" 
                placeholder="تکرار رمز عبور" 
                name="password" 
                error={errors.username?.message}
                iconsrc={keySvg} 
                register={register}
              />
              <CustomButtonH36 text={'ثبت رمز عبور جدید'} styling='bg-okhra-200 text-sm'></CustomButtonH36>
              </form>
            </div>
          </Box>
        </div>
  )
}

export default SetNewPassword;