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
      const avatarURL = profileData.data.avatar ? `${profileData.data.avatar.url}` : undefined;
      console.log("profile data in useeffect:", profileData.data)
      setUserProfile(prevProfile => ({
        ...prevProfile,
        username: profileData.data.username || prevProfile.username,
        avatar: avatarURL || prevProfile.avatar,
        firstName: profileData.data.firstName || prevProfile.firstName,
        lastName: profileData.data.lastName || prevProfile.lastName,
        bio: profileData.data.bio || prevProfile.bio,
        email: profileData.data.email || prevProfile.email,
        id: profileData.data.id || prevProfile.id,
        postsCount: profileData.data.postsCount || prevProfile.postsCount,
        followersCount: profileData.data.followersCount || prevProfile.followersCount,
        followingsCount: profileData.data.followingsCount || prevProfile.followingsCount,
        isPrivate: profileData.data.isPrivate || prevProfile.isPrivate
      }));
    }
  }, [profileData]);

  console.log("profile data:", profileData);

  return <div>{children}</div>;
};

export default ProfileDataWrapper;
