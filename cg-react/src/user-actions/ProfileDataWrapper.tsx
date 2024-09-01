import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { userProfileAtom, UserProfile as UserProfileInterface } from "./atoms";
import { useRecoilState } from "recoil";
import { useEffect } from 'react';

const ProfileDataWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  const fetchUserProfile = async () => {
    const fetchWrapper = axios.create({
      baseURL: 'http://5.34.194.155:4000/',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const response = await fetchWrapper.get('/users/profile');
    return response.data;
  };

  const { data: profileData, error: profileError } = useQuery({
    queryKey: ['profileData'],
    queryFn: fetchUserProfile,
    retry: false,
  });

  useEffect(() => {
    if (profileData ) {
      const avatarURL = profileData.data.avatar ? `${profileData.data.avatar.path}` : undefined;
      console.log("profile data in useeffect:", profileData.data)
      setUserProfile(prevProfile => ({
        ...prevProfile,
        username: profileData.data.username || prevProfile.username,
        avatar: avatarURL || prevProfile.avatar,
        first_name: profileData.data.first_name || prevProfile.first_name,
        last_name: profileData.data.last_name || prevProfile.last_name,
        bio: profileData.data.bio || prevProfile.bio,
        email: profileData.data.email || prevProfile.email,
        id: profileData.data.id || prevProfile.id,
      }));
    }
  }, [profileData]);

  console.log("profile data:", profileData);

  return <div>{children}</div>;
};

export default ProfileDataWrapper;
