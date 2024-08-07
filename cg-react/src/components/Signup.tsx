import Box from './BoxComponent';
import EnterSignup from './EnterSignup';
import InputField from './TextInputComponent';
import UserSvg from "../assets/icons/user.svg"
import GmailSvg from "../assets/icons/gmail.svg"
import keySvg from "../assets/icons/key.svg"
import CustomButtonH36 from './ButtonComponentH36';
import Label from './Label';


export default function SignUp() {
  return (
        <div className='flex items-center justify-center min-h-screen backImg'>
          <Box height="636.58px">
            <div className="rahnema-logo absolute top-10"></div>
            <EnterSignup />
            <div className='mt-14'>
              <Label text={'برای ثبت نام کافیه نام کاربری، ایمیل و یک رمز عبور وارد کنید'}></Label>
              <InputField type="text" placeholder="نام کاربری" name="username" iconsrc={UserSvg} />
              <InputField type="text" placeholder="ایمیل" name="email" iconsrc={GmailSvg} />
              <InputField type="text" placeholder="رمز عبور" name="password" iconsrc={keySvg} />
              <InputField type="text" placeholder="تکرار رمز عبور" name="password" iconsrc={keySvg} />
              <CustomButtonH36 text={'ثبت نام'} styling='bg-okhra-200 mt-12 text-sm'></CustomButtonH36>
            </div>  
          </Box>
        </div>
  )
}
