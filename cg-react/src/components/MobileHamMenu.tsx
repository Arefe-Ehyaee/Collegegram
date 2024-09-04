import hamMenu from "../assets/icons/hamMenu.svg";
import angledpin from "../assets/icons/angled-pin.svg"
import bookmark from "../assets/icons/bookmark.svg"
import chat from "../assets/icons/chat.svg"
import bell from "../assets/icons/bell.svg"
import tags from "../assets/icons/tag.svg"
import { useNavigate } from 'react-router-dom';

export default function MobileHamMenu() {
  const navigate = useNavigate();
  
  return (
    <div className='absolute bottom-0 w-full'>
    <nav className=" bg-white border border-khakeshtari-400 rounded-t-3xl p-9" dir="rtl" aria-label="mobile-nav">
      <ul >
        <li className='flex items-center hover:bg-khakeshtari-500 p-4'>
          <img src={angledpin} alt="my page icon" className="ml-2" />
          <button onClick={()=>navigate("/userprofile")}>صفحه من</button>
        </li>
        <li className='flex items-center hover:bg-khakeshtari-500 p-4'>
          <img src={bookmark} alt="bookmarks icon" className="ml-2" />
          <a href="#">ذخیره‌ها</a>
        </li>
        <li className='flex items-center hover:bg-khakeshtari-500 p-4'>
          <img src={chat} alt="chats icon" className="ml-2" />
          <a href="#">پیام‌ها</a>
        </li>
        <li className='flex items-center hover:bg-khakeshtari-500 p-4'>
          <img src={bell} alt="notifications icon" className="ml-2" />
          <a href="#">اعلانات</a>
        </li>
        <li className='flex items-center hover:bg-khakeshtari-500 p-4'>
          <img src={tags} alt="tags icon" className="ml-2" />
          <a href="#">تگ‌شده‌ها</a>
        </li>
        <li className='flex items-center hover:bg-khakeshtari-500 p-4'>
        <img src={hamMenu} alt="tags icon" className="ml-2" />
        <a href="#">بیشتر</a>
        </li>
      </ul>
      </nav>
      
    </div>
  )
}
