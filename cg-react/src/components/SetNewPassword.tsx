import Box from './BoxComponent';
import EnterSignup from './EnterSignup';
import InputField from './TextInputComponent';
import UserSvg from "../assets/icons/user.svg"
import GmailSvg from "../assets/icons/gmail.svg"
import keySvg from "../assets/icons/key.svg"
import CustomButtonH36 from './ButtonComponentH36';
import Label from './Label';
import RememberMe from './RememberMe';
import ArrowLink from './ArrowLink';
import { NavLink } from 'react-router-dom';
import BoxTitle from './BoxTitle';


export default function SetNewPassword() {
  return (
        <div className='flex items-center justify-center min-h-screen backImg'>
          <Box height="485px">
            <div className="rahnema-logo absolute top-10"></div>
            <div className='mt-14'>
              <BoxTitle text={'تنظیم رمز عبور جدید'}></BoxTitle>
              <Label text={'لطفا رمز جدیدی برای حساب خود انتخاب کنید'}></Label>
              <InputField type="text" placeholder="رمز عبور" name="password" iconsrc={keySvg} />
              <InputField type="text" placeholder="تکرار رمز عبور" name="password" iconsrc={keySvg} />
              <CustomButtonH36 text={'ثبت رمز عبور جدید'} styling='bg-okhra-200 text-sm'></CustomButtonH36>
            </div>
          </Box>
        </div>
  )
}
