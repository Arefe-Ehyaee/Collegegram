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


export default function Login() {
  return (
        <div className='flex items-center justify-center min-h-screen backImg'>
          <Box height="636.58px">
            <div className="rahnema-logo absolute top-10"></div>
            <EnterSignup />
            <div className='mt-14'>
              <Label text={'به کالج گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز عبور خودتون رو وارد کنید'}></Label>
              <InputField type="text" placeholder="نام کاربری یا ایمیل" name="username" iconsrc={UserSvg} />
              <InputField type="text" placeholder="رمز عبور" name="password" iconsrc={keySvg} />
              <RememberMe></RememberMe>
              <CustomButtonH36 text={'ورود'} styling='bg-okhra-200 mt-12 text-sm'></CustomButtonH36>

              <NavLink to='/retrievePass'>
                <ArrowLink text={'فراموشی رمز عبور'}></ArrowLink>
              </NavLink>  
              <ArrowLink text={'ثبت نام در کالج گرام'}></ArrowLink>
            </div>           
          </Box>
        </div>
  )
}
