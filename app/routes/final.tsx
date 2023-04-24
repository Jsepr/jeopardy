import type { V2_MetaFunction } from '@remix-run/react';
import { useNavigate } from '@remix-run/react';
import {  useEffect } from 'react';
import { BettingForm } from '~/components/BettingForm';
import { usePoints } from '~/contexts/PointsContext';
import { getObjectEntries } from '~/utils/utils';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Jepperdy - Final' }];
};

export default function Final() {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateListener = (e: KeyboardEvent) => {
      if (e.keyCode === 70) {
        navigate('/');
      }
    };
    window.addEventListener('keyup', navigateListener);
    return () => {
      window.removeEventListener('keyup', navigateListener);
    };
  }, [navigate]);

  const { teams } = usePoints();

  return (
    <div
      className="w-full p-4 h-full bg-blue-950 flex flex-col justify-around items-center"
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}
    >
      <h1 className="font-effect-neon font-rancho text-center w-full text-white text-9xl">Jepperdy</h1>
      <div className={`grid grid-cols-${Object.keys(teams).length} gap-5 w-full`}>
        {getObjectEntries(teams).map((team) => (
          <div
            key={team}
            className={`text-center flex flex-col justify-around text-white h-56 p-2 rounded-lg ${teams[team].color}`}
          >
            <h3 className="text-4xl font-bold">{team}</h3>
            <p className="text-8xl">{teams[team].points}</p>
          </div>
        ))}
      </div>
      <BettingForm />
    </div>
  );
}
