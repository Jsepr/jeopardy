import type { V2_MetaFunction } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import { useNavigate } from '@remix-run/react';
import { Link } from '@remix-run/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { usePoints } from '~/contexts/PointsContext';
import { getObjectEntries, playSound } from '~/utils/utils';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { BettingForm } from '~/components/BettingForm';
import { json } from '@remix-run/node';
import { Points } from '~/components/Points';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Jepperdy' }];
};

const categories: Array<{
  category: string;
  questions: Array<{ points: keyof typeof pointsColors; question: string; img?: string; isBonus?: boolean }>;
}> = [
  {
    category: 'What a time to be alive!',
    questions: [
      {
        points: 100,
        question: 'Veckodag men också ikonisk youtube-låt som Rebecca levererade 2011',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/USB_icon.svg/2560px-USB_icon.svg.png',
      },
      {
        points: 200,
        question:
          'Tillstånd av mätthet som uppstår då man ätit för mycket, men också en Göteborgs-duo som äter för mycket',
      },
      {
        points: 300,
        question: 'Youtubes mest visade klipp som kan beskrivas som barnvänlig med catchig sång',
      },
      {
        points: 400,
        question: 'Polsk-amerikansk företagsledare som var VD för Youtube från 2014-2023',
      },
      {
        points: 500,
        question: 'Datum när Youtubes första klipp "me at the Zoo" lades upp',
      },
    ],
  },
  {
    category: 'MatGeekLover_93',
    questions: [
      {
        points: 100,
        question: 'Question 1',
      },
      {
        points: 200,
        question: 'Question 2',
      },
      {
        points: 300,
        question: 'Question 3',
      },
      {
        points: 400,
        question: 'Question 4',
      },
      {
        points: 500,
        question: 'Question 5',
      },
    ],
  },
  {
    category: "I'm sexy and I know IT",
    questions: [
      {
        points: 100,
        question: 'Question 1',
      },
      {
        points: 200,
        question: 'Question 2',
      },
      {
        points: 300,
        isBonus: true,
        question: 'Question 3',
      },
      {
        points: 400,
        question: 'Question 4',
      },
      {
        points: 500,
        question: 'Question 5',
      },
    ],
  },
  {
    category: 'David Kringlund',
    questions: [
      {
        points: 100,
        question: 'Question 1',
      },
      {
        points: 200,
        question: 'Question 2',
      },
      {
        points: 300,
        question: 'Question 3',
      },
      {
        points: 400,
        question: 'Question 4',
      },
      {
        points: 500,
        question: 'Question 5',
      },
    ],
  },
];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function addBonusQuestion(allCategories: typeof categories): Array<{
  category: string;
  questions: Array<{ points: keyof typeof pointsColors; question: string; img?: string; isBonus?: boolean }>;
}> {
  const bonusCategory = getRandomInt(allCategories.length);
  const bonusQuestion = getRandomInt(allCategories[bonusCategory].questions.length);

  return allCategories.map((category, index) => {
    if (index !== bonusCategory) return category;
    return {
      ...category,
      questions: category.questions.map((question, qIndex) => {
        if (qIndex !== bonusQuestion) return question;
        console.log('question: ', question);
        return { ...question, isBonus: true };
      }),
    };
  });
}
export const loader = async () => {
  return addBonusQuestion(categories);
};
const pointsColors = {
  100: 'bg-green-600',
  200: 'bg-lime-400',
  300: 'bg-yellow-300',
  400: 'bg-orange-600',
  500: 'bg-red-600',
};

const pointsText = {
  100: 'text-black',
  200: 'text-black',
  300: 'text-black',
  400: 'text-black',
  500: 'text-black',
};

function QuestionCard({
  points,
  question,
  img,
  isBonus,
}: {
  points: keyof typeof pointsColors;
  question: string;
  img?: string;
  isBonus?: boolean;
}) {
  const [cardOpen, setCardOpen] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showQuestion, setShowQuestion] = useState(!isBonus);

  useEffect(() => {
    const escListener = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setCardOpen(false);
      }
    };
    if (cardOpen) {
      window.addEventListener('keyup', escListener);
    }
    return () => {
      window.removeEventListener('keyup', escListener);
    };
  }, [cardOpen]);

  return (
    <div>
      <button
        type="button"
        className={`rounded-lg w-full text-3xl h-20 ${answered ? 'bg-gray-400' : pointsColors[points]} ${
          pointsText[points]
        }`}
        onClick={() => {
          setCardOpen(!cardOpen);
          playSound(isBonus ? 'bonus.mp3' : 'card.mp3');
        }}
      >
        {points}
      </button>
      <div
        className={`absolute left-0 top-0 text-center transition-all duration-500 ${pointsColors[points]} ${
          pointsText[points]
        } overflow-hidden ${cardOpen ? 'w-full h-full' : 'w-0 h-0'}`}
      >
        <div className="p-4 h-full flex flex-col justify-between gap-4">
          <div className="absolute top-0 right-0 padding-2">
            <button
              type="button"
              className="p-2"
              onClick={() => {
                setCardOpen(false);
              }}
            >
              <FaTimes color="white" />
            </button>
          </div>
          <div
            className={`p-4 w-full px-24 text-6xl flex-grow flex flex-col gap-4 items-center justify-center ${pointsText[points]}`}
          >
            {isBonus ? <h1 className="mb-2 font-effect-fire">BONUS</h1> : null}
            {showQuestion ? <h2>{question}</h2> : null}
            {img ? (
              <div className="w-full">
                <img className={`m-auto w-auto h-56`} src={img} alt="img"></img>
              </div>
            ) : null}
          </div>
          {isBonus ? (
            <BettingForm
              onBet={() => {
                setShowQuestion(true);
              }}
              onRight={() => {
                setCardOpen(false);
                setAnswered(true);
              }}
              onWrong={() => {
                setCardOpen(false);
                setAnswered(true);
              }}
            />
          ) : (
            <Points
              points={points}
              onRight={() => {
                setCardOpen(false);
                setAnswered(true);
              }}
              onWrong={() => {
                setCardOpen(false);
                setAnswered(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const { teams } = usePoints();
  const categoriesWithBonus = useLoaderData<typeof loader>();

  const navigate = useNavigate();

  useEffect(() => {
    const navigateListener = (e: KeyboardEvent) => {
      if (e.keyCode === 70) {
        navigate('/final');
        playSound('intro.mov');
      }
      if (e.keyCode === 83) {
        playSound('intro.mov');
      }
    };
    window.addEventListener('keyup', navigateListener);
    return () => {
      window.removeEventListener('keyup', navigateListener);
    };
  }, [navigate]);

  return (
    <div className="w-full p-4 h-full bg-blue-950 flex flex-col justify-around">
      <h1 className="font-effect-neon font-rancho text-center w-full text-white text-9xl">Jepperdy</h1>
      <div className="w-full grid grid-cols-4 gap-4 ">
        {categoriesWithBonus.map((category) => {
          return (
            <div key={category.category} className="flex flex-col justify-evenly gap-3 h-full">
              <h2 className="text-center text-white text-3xl break-all">{category.category}</h2>
              {category.questions.map((question) => {
                return (
                  <QuestionCard
                    key={category.category + question.points}
                    points={question.points}
                    img={question.img}
                    question={question.question}
                    isBonus={question.isBonus}
                  ></QuestionCard>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-5">
        {getObjectEntries(teams).map((team) => (
          <div
            key={team}
            className={`text-center flex flex-col justify-around text-white h-20 p-2 rounded-lg ${teams[team].color}`}
          >
            <h3 className="text-lg font-bold">{team}</h3>
            <p className="text-4xl">{teams[team].points}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
