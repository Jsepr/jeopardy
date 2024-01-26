import { FaCheck, FaTimes } from "react-icons/fa";
import { usePoints } from "~/contexts/PointsContext";
import { getObjectEntries, playSound } from "~/utils/utils";

export function Points({points, onRight, onWrong}: {points: number; onRight: () => void; onWrong: () => void;}) {
  const {teams, updatePoints} = usePoints();
  return (
    <div className={`w-full flex gap-5 flex-grow-0`}>
      {getObjectEntries(teams).map((team) => (
        <div
          key={team}
          className={`text-center flex-1 flex flex-col justify-around text-white h-20 p-2 rounded-lg ${teams[team].color}`}
        >
          <h3 className="font-bold">{team}</h3>
          <div className="flex flex-row justify-around">
            <button
              className="w-10 h-10 bg-white flex justify-center items-center rounded-full"
              type="button"
              onClick={() => {
                updatePoints(team, points);
                playSound('rightanswer.mp3');

                onRight();
              }}
            >
              <FaCheck color="green" />
            </button>
            <button
              type="button"
              className="w-10 h-10 bg-white flex justify-center items-center rounded-full"
              onClick={() => {
                // updatePoints(team, -points);
                playSound('wronganswer.mp3');

                onWrong();
              }}
            >
              <FaTimes color="red" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
