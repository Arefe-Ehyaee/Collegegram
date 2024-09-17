import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import AccountAvatarName from "./AccountAvatarName";
import addAccount from "../../assets/icons/addToCloseFriends.svg";
import { defaultProfile, UserProfile, userProfileAtom } from '../../user-actions/atoms';
import { useNavigate } from 'react-router-dom';

const SwitchAccountComponent = () => {
    const [currentUser, setCurrentUser] = useRecoilState(userProfileAtom);
    const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
      const storedProfiles: UserProfile[] = JSON.parse(localStorage.getItem('userProfiles') || '[]');
      const currentToken = localStorage.getItem('token');
  
      if (storedProfiles.length > 0) {
        setUserProfiles(storedProfiles);
  
        if (currentToken) {
          const activeProfile = storedProfiles.find(profile => profile.token === currentToken);
          if (activeProfile && activeProfile.id !== currentUser.id) {
            setCurrentUser(activeProfile);
          }
        }
      } else if (currentUser.token && !storedProfiles.some(profile => profile.id === currentUser.id)) {
        setUserProfiles([currentUser]);
        localStorage.setItem('userProfiles', JSON.stringify([currentUser]));
      }
    }, []); 
  
    const handleAddAccount = () => {
      const newProfile = { ...currentUser };
  
      const existingIndex = userProfiles.findIndex(profile => profile.id === newProfile.id);
  
      let updatedProfiles;
      if (existingIndex !== -1) {
        updatedProfiles = [...userProfiles];
        updatedProfiles[existingIndex] = newProfile;
      } else {
        updatedProfiles = [...userProfiles, newProfile];
      }
      localStorage.setItem('userProfiles', JSON.stringify(updatedProfiles));
      setUserProfiles(updatedProfiles);
      localStorage.setItem('token', newProfile.token || ''); 
      setCurrentUser(defaultProfile);
      navigate('/login')
    };
  
    const handleSwitchAccount = (selectedProfile: UserProfile) => {
        let storedProfiles: UserProfile[] = JSON.parse(localStorage.getItem('userProfiles') || '[]');
        const isCurrentUserStored = storedProfiles.some(profile => profile.id === currentUser.id);
      
        if (!isCurrentUserStored && currentUser.id !== "defaultID") {
          storedProfiles = [currentUser, ...storedProfiles.filter(profile => profile.id !== selectedProfile.id)];
          localStorage.setItem('userProfiles', JSON.stringify(storedProfiles));
          setUserProfiles(storedProfiles);
        }
        const newProfiles = [selectedProfile, ...storedProfiles.filter(profile => profile.id !== selectedProfile.id)];
        setCurrentUser(selectedProfile);
        localStorage.setItem('token', selectedProfile.token || ''); 
        localStorage.setItem('userProfiles', JSON.stringify(newProfiles));
        setUserProfiles(newProfiles);
        navigate('/userprofile')
      };
  
    return (
      <ul className="flex flex-col gap-y-4 justify-center">
        {userProfiles.length > 0 ? (
          userProfiles.map(profile => (
            <AccountAvatarName
              key={profile.id}
              avatar={profile.avatar}
              username={profile.username}
              onClick={() => handleSwitchAccount(profile)}
            />
          ))
        ) : (
          <AccountAvatarName
            avatar={currentUser.avatar}
            username={currentUser.username}
          />
        )}

      <li className="flex flex-row gap-3 items-center cursor-pointer rounded-3xl p-4 hover:bg-grey-500" onClick={handleAddAccount}>
        <img src={addAccount} alt="add account button"  className='h-5 w-5'/>
        <p>افزودن اکانت</p>
      </li>
    </ul>
  );
};

export default SwitchAccountComponent;