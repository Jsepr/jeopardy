import type { V2_MetaFunction } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import { useNavigate } from '@remix-run/react';
import { useCallback, useEffect, useState } from 'react';
import { usePoints } from '~/contexts/PointsContext';
import { getObjectEntries, playSound } from '~/utils/utils';
import { QuestionButton } from '~/components/QuestionButton';
import type { Category } from '~/utils/questions';
import { addBonusQuestion } from '~/utils/questions';
import { categories } from '~/utils/questions';
import { QuestionCard } from '~/components/QuestionCard';
import { json } from '@remix-run/node';
import { LayoutGroup } from 'framer-motion';
import { motion } from 'framer-motion';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Jepperdy' }];
};

export const loader = async () => {
  return json(addBonusQuestion(categories));
};

export default function Index() {
  const { teams } = usePoints();
  const categoriesWithBonus = useLoaderData<typeof loader>() as Category[];
  const [currentCategories, setCurrentCategories] = useState(categoriesWithBonus);

  useEffect(() => {
    setCurrentCategories(categoriesWithBonus);
  }, [categoriesWithBonus]);
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);
  const openQuestion = currentCategories
    .flatMap((cat) => cat.questions)
    .find((question) => question.id === openQuestionId);
  const navigate = useNavigate();
  const [showQuestions, setShowQuestion] = useState(false);

  const setQuestionAnswered = useCallback((questionId: string) => {
    setCurrentCategories((cats) =>
      cats.map((cat) => {
        return {
          ...cat,
          questions: cat.questions.map((q) => ({
            ...q,
            answered: questionId === q.id ? true : q.answered,
          })),
        };
      })
    );
  }, []);

  useEffect(() => {
    const navigateListener = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setOpenQuestionId(null);
      }
      if (e.keyCode === 70) {
        navigate('/final');
        playSound('intro-new.mp3');
      }
    };
    window.addEventListener('keyup', navigateListener);
    return () => {
      window.removeEventListener('keyup', navigateListener);
    };
  }, [navigate]);

  return (
    <div className="w-full p-4 h-full bg-blue-950 flex flex-col justify-between">
      <motion.h1
        animate={{
          x: ['-50%', '50%', '-50%', '50%', '0%'],
          y: ['0%', '200%', '350%', '450%', '0%'],
          rotate: ['0deg', '45deg', '-45deg', '45deg', '-45deg', '0deg'],
        }}
        onAnimationComplete={() => {
          setShowQuestion(true);
        }}
        transition={{ duration: 8, times: [0.25, 0.25, 0.25, 0.25], ease: 'easeInOut' }}
        className="font-effect-neon font-rancho text-center w-full text-white text-9xl"
      >
        Jepperdy
      </motion.h1>
      {showQuestions ? (
        <LayoutGroup>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 6 }}
            className={`w-full flex gap-4`}
          >
            {currentCategories.map((category) => {
              return (
                <div key={category.category} className="flex flex-1 flex-col justify-evenly gap-3 h-full">
                  <h2 className="text-center text-white text-3xl break-all">{category.category}</h2>
                  {category.questions.map((question) => {
                    return (
                      <QuestionButton
                        setOpenQuestion={setOpenQuestionId}
                        key={category.category + question.points}
                        question={question}
                      ></QuestionButton>
                    );
                  })}
                </div>
              );
            })}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 6 }}
            className="flex w-full gap-5"
          >
            {getObjectEntries(teams).map((team) => (
              <div
                key={team}
                className={`text-center flex flex-1 flex-col justify-around text-white h-20 p-2 rounded-lg ${teams[team].color}`}
              >
                <h3 className="text-lg font-bold">{team}</h3>
                <p className="text-4xl">{teams[team].points}</p>
              </div>
            ))}
          </motion.div>
          {openQuestion ? (
            <QuestionCard
              setOpenQuestionId={setOpenQuestionId}
              question={openQuestion}
              setAnswered={setQuestionAnswered}
            />
          ) : null}
        </LayoutGroup>
      ) : null}
    </div>
  );
}
