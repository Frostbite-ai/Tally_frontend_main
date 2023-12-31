import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import {
  FaCrown,
  FaKeyboard,
  FaRegUser,
  FaTerminal,
  FaUser,
} from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';



import { usePreferenceContext } from '@/context/Preference/PreferenceContext';

const typeList = ['words', 'sentences', 'numbers'];
const displayList = ['Easy', 'Medium', 'Hard'];



const timeList = ['15', '30', '45', '60', '120'];



export default function Header() {
  const {
    preferences: { type, time },
    dispatch,
  } = usePreferenceContext();




  const { pathname } = useRouter();

  return (
    <header className={clsx('layout bg-transparent font-primary')}>
      <div className='flex w-full flex-col items-center justify-between space-y-2 pt-12 sm:flex-row sm:space-y-0 sm:space-x-6'>
        <div className='group flex w-full items-center justify-start space-x-6 sm:w-auto'>
          <Link href='/'>
            <a>
              <div className='flex space-x-1'>


                <div className='relative text-3xl font-bold text-fg'>

                  <span
                    className={clsx(
                      'transition-colors duration-200 group-hover:text-hl',
                      [pathname === '/' ? 'text-hl' : 'text-hl/60']
                    )}
                  >
                    Keyboard Kombat
                  </span>
                </div>
              </div>
            </a>
          </Link>
        </div>

        <nav className='flex w-full flex-1 items-center justify-between sm:w-auto'>
          <div className='flex space-x-6'>
            <div className='relative'>
              <div className='peer'>
                <Link href='/solo'>
                  <a className='flex items-center opacity-50 hover:opacity-100 transition-opacity duration-100'>
                    <FaKeyboard
                      className={clsx(
                        'cursor-pointer fill-hl text-lg',
                        { 'fill-hl': pathname === '/solo' }
                      )}
                    />
                    <span className='ml-2'>solo</span>
                  </a>
                </Link>
              </div>
            </div>








            <div className='relative'>
              <div className='peer'>
                <Link href='/multiplayer'>
                  <a className='flex items-center opacity-50 hover:opacity-100 transition-opacity duration-100'>
                    <RiTeamFill
                      className={clsx(
                        'cursor-pointer fill-hl text-lg',
                        { 'fill-hl': pathname === '/multiplayer' }
                      )}
                    />
                    <span className='ml-2'>Multiplayer</span>
                  </a>
                </Link>
              </div>
            </div>

            <div className='relative'>
              <div className='peer'>
                <Link href='/leaderboard'>
                  <a className='flex items-center opacity-50 hover:opacity-100 transition-opacity duration-100'>
                    <FaCrown
                      className={clsx(
                        'cursor-pointer fill-hl text-lg',
                        { 'fill-hl': pathname === '/leaderboard' }
                      )}
                    />
                    <span className='ml-2'>Leaderboard</span>
                  </a>
                </Link>
              </div>
            </div>

            
          </div>
          <div className='hidden flex-col -space-y-1 sm:space-y-1 ns:flex'>
            <div className='flex cursor-pointer list-none space-x-1.5 text-[10px] font-semibold sm:text-xs'>
              {typeList.map((item, index) => (
                <div
                  onClick={() => dispatch({ type: 'SET_TYPE', payload: item })}
                  key={item}
                  className={`${item === type ? 'text-hl' : 'text-hl/50'
                    } transition-colors duration-200 hover:text-hl`}
                >
                  {displayList[index]}
                </div>
              ))}
            </div>
            <div className='flex cursor-pointer list-none justify-end space-x-2 text-[10px] font-semibold sm:text-xs'>
              {timeList.map((item) => (
                <div
                  onClick={() => dispatch({ type: 'SET_TIME', payload: item })}
                  key={item}
                  className={`${item === time ? 'text-hl' : 'text-hl/50'
                    } transition-colors duration-200 hover:text-hl`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div
            className='rounded-full bg-hl p-2 ns:hidden'
            onClick={() => dispatch({ type: 'TOGGLE_COMMAND_PALETTE' })}
          >
            <FaTerminal className='cursor-pointer fill-bg/90 text-lg' />
          </div>
        </nav>
      </div>
    </header>
  );
}
