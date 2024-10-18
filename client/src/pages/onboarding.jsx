import Avatar from '@/components/common/Avatar';
import Input from '@/components/common/Input';
import { reducerCases } from '@/context/constants';
import { useStateProvider } from '@/context/StateContext';
import { ONBOARD_USER_ROUTE } from '@/utils/ApiRoutes';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Onboarding = () => {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || '');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('/default_avatar.png');

  const [isMobileScreen, setIsMobileScreen] = useState();

  const handleResize = () => {
    setIsMobileScreen(window.innerWidth < 640);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (userInfo?.email && !newUser) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser, userInfo]);

  const onboardUserHandler = async () => {
    if (validateDetails()) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          image,
        });

        if (data.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: false,
          });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data.user.id,
              name,
              email,
              profileImage: image,
              status: about,
            },
          });
          router.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-panel-header-background justify-center items-center text-white overflow-hidden">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/whatsapp.gif"
          width={isMobileScreen ? 100 : 300}
          height={isMobileScreen ? 100 : 300}
          alt="whatsapp logo animation"
          priority={true}
          property='unoptimized'
        />
        <span className="xs:text-5xl text-7xl">Whatsapp</span>
      </div>
      <h2 className="xs:text-lg text-2xl">Create your profile</h2>
      <div className="flex gap-6 mt-6 flex-row items-center justify-center">
        <div className="xs:gap-3 xs:mt-0 flex flex-col items-center justify-center mt-5 gap-6 text-white">
          <div className="">
            <Input name="Display Name" state={name} setState={setName} label />
          </div>
          <div>
            <Input name="About" state={about} setState={setAbout} label />
          </div>

          <div className="flex justify-center items-center">
            <button
              className="xs:p-3 xs:mt-2 flex items-center justify-center text-white bg-search-input-container-background p-5 rounded-lg"
              onClick={onboardUserHandler}
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar
            type={isMobileScreen ? 'lg' : 'xl'}
            image={image}
            setImage={setImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
