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


export default function RetrievePassword() {
  return (
        <div className='flex items-center justify-center min-h-screen backImg'>
          <Box height="485px">
            <div className="rahnema-logo absolute top-10"></div>
            <div className='mt-14'>
                <BoxTitle text={'بازیابی رمز عبور'}></BoxTitle>
              <Label text={'لطفا نام کاربری یا ایمیل خودتون رو وارد کنید'}></Label>
              <InputField type="text" placeholder="نام کاربری یا ایمیل" name="username" iconsrc={UserSvg} />
              <div className="flex justify-start items-center gap-x-4">
                <CustomButtonH36 text={'ارسال لینک بازیابی رمز عبور'} styling='bg-okhra-200 text-sm'></CustomButtonH36>
                <NavLink to='/' className="flex items-center content-end align-text-bottom">انصراف</NavLink>
              </div>
            </div>
            
            
          </Box>
        </div>
  )
}
