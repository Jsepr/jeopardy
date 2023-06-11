import type { FormEvent } from 'react';
import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import type { Teams } from '~/contexts/PointsContext';
import { usePoints } from '~/contexts/PointsContext';
import { getObjectEntries, playSound } from '~/utils/utils';

export function BettingForm({
  onRight,
  onWrong,
  onBet,
}: {
  onRight?: () => void;
  onWrong?: () => void;
  onBet?: () => void;
}) {
  const { teams, updatePoints } = usePoints();
  const [bets, setBets] = useState<Record<keyof Teams, number> | null>();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newBets = getObjectEntries(teams).reduce((acc, team) => {
      // @ts-ignore
      const value = event.currentTarget.elements[team].value;

      updatePoints(team, value ? -value : 0);
      return { ...acc, [team]: value };
    }, {});
    setBets(newBets as Record<keyof Teams, number>);
    onBet?.();
  }

  return bets ? (
    <div className={`flex gap-5 w-full`}>
      {getObjectEntries(teams).map((team) => (
        <div key={team} className={`text-center flex-1 flex flex-col justify-aroundh-56 p-2 rounded-lg ${teams[team].color}`}>
          {onWrong ? (
            <>
              <h3 className="text-3xl font-bold text-white">{team}</h3>
              <p className="text-2xl text-white">Poäng: {teams[team].points}</p>
            </>
          ) : null}
          {bets[team] ? (
            <>
              <p className="bg-transparent text-white text-center text-3xl">Bet: {bets[team]}</p>
              <div className="flex flex-row justify-around">
                <button
                  className="w-10 h-10 bg-white flex justify-center items-center rounded-full"
                  type="button"
                  onClick={() => {
                    updatePoints(team, bets[team] * 2);
                    playSound('rightanswer.mp3');

                    onRight?.();
                  }}
                >
                  <FaCheck color="green" />
                </button>
                {onWrong ? (
                  <button
                    type="button"
                    className="w-10 h-10 bg-white flex justify-center items-center rounded-full"
                    onClick={() => {
                      playSound('wronganswer.mp3');

                      onWrong?.();
                    }}
                  >
                    <FaTimes color="red" />
                  </button>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      ))}
    </div>
  ) : (
    <form className="w-full flex flex-col items-center gap-4" onSubmit={onSubmit}>
      <div className="flex gap-5 w-full">
        {getObjectEntries(teams).map((team) => (
          <div
            key={team}
            className={`text-center flex-1 flex flex-col justify-aroundh-56 p-2 rounded-lg ${teams[team].color}`}
          >
            {onWrong ? (
              <>
                <h3 className="text-3xl font-bold text-white">{team}</h3>
                <p className="text-2xl text-white">Poäng: {teams[team].points}</p>
              </>
            ) : null}
            <input
              className="bg-transparent text-white text-center text-3xl"
              name={team}
              type="number"
              step={100}
            ></input>
          </div>
        ))}
      </div>
      <button
        className="w-48 text-center bg-white p-4 rounded-md"
        type="submit"
      >
        Betta
      </button>
    </form>
  );
}
