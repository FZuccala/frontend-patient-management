'use client';
import { getUsers } from '@/services';
import React, { useEffect } from 'react';
import { TUser } from '@/typings';
import { useUserStore } from '@/store/userStore';
import dynamic from 'next/dynamic';
const HomeContainer = dynamic(() => import('../components/Templates/HomeContainer'), {
  ssr: false,
});

type Props = {};

const Home = (props: Props) => {
  const { setUsers } = useUserStore();
  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res as TUser[]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <HomeContainer />;
};

export default Home;
