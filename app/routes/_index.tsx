import type { V2_MetaFunction } from '@remix-run/react';
import { Link } from '@remix-run/react';
import { playSound } from '~/utils/utils';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Jepperdy' }];
};

export default function Index() {
  return (
    <div className="w-full p-4 h-full bg-blue-950 flex flex-col justify-between items-center">
      <h1 className="font-effect-neon font-rancho text-center w-full text-white text-9xl">Jepperdy</h1>
      <Link
        to="/game"
        className="rounded-lg bg-white p-2"
        onClick={() => {
          playSound('intro-new.mp3');
        }}
      >
        Starta spel
      </Link>
    </div>
  );
}
