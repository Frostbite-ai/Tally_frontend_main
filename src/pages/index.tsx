import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoMdPerson } from 'react-icons/io';
import { RiTeamFill } from 'react-icons/ri';
import Typed from 'react-typed'; 

import Button from '@/components/Button/Button';
import Input from '@/components/Input';
import Kbd from '@/components/Kbd';
import AnimateFade from '@/components/Layout/AnimateFade';
import Seo from '@/components/Seo';

import { useRoomContext } from '@/context/Room/RoomContext';

export default function HomePage() {
  const router = useRouter();

  const methods = useForm<{ code: string }>({
    mode: 'onTouched',
  });

  const { dispatch } = useRoomContext();

  return (
    <AnimateFade>
      <Seo title='Keyboard Kombat' />

      <main>
        <section>
          <div className='layout flex flex-col items-center gap-8 pt-8 text-center'>
            <div className='relative flex h-8 w-full max-w-[800px] items-center justify-between'>
              
            </div>

  <div className="text-4xl font-bold text-center pt-24">
    <Typed
      strings={['Welcome to Keyboard Kombat 🕹', 'Crushing the bytes in Tally Codebrewers 2023']}
      typeSpeed={30}
      backSpeed={50}
      loop
    />
  </div>
            <FormProvider {...methods}>
              <Input
                placeholder='enter your nickname'
                autoComplete='off'
                name='nickname'
                id='nickname'
                maxLength={20}
                defaultValue={localStorage?.getItem('nickname') || ''}
                onBlur={(e) => {
                  if (!e.target.value) return;
                  dispatch({ type: 'SET_NICKNAME', payload: e.target.value });
                }}
                className='text-center mt-20'
              />
            </FormProvider>
            <div className='flex items-center gap-4'>
              <Button
                onClick={() => router.push('/solo')}
                className='flex items-center'
              >
                <IoMdPerson className='mr-1' />
                Play Solo
              </Button>
              <div>
                <Button
                  onClick={() => router.push('/multiplayer')}
                  className='flex items-center'
                >
                  <RiTeamFill className='mr-1' />
                  Multiplayer
                </Button>
              </div>
            </div>

         
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
