import { FaTimes } from 'react-icons/fa';
import { pointsColors, pointsText } from '~/utils/style';
import { BettingForm } from './BettingForm';
import { Points } from './Points';
import { useState } from 'react';
import type { Question } from '~/utils/questions';
import { motion } from 'framer-motion';

export function QuestionCard({
  question: { id, question, img, isBonus, points, code },
  setOpenQuestionId,
  setAnswered,
}: {
  question: Question;
  setOpenQuestionId: (questionId: string | null) => void;
  setAnswered: (questionId: string) => void;
}) {
  const [showQuestion, setShowQuestion] = useState(!isBonus);
  return (
    <motion.div
      key={id}
      layoutId={id}
      layout
      transition={{ duration: 0.5 }}
      className={`absolute left-0 top-0 text-center ${pointsColors[points]} ${pointsText[points]} w-full h-full`}
    >
      <div className="p-4 h-full flex flex-col justify-between gap-4">
        <div className="absolute top-0 right-0 padding-2">
          <button
            type="button"
            className="p-2"
            onClick={() => {
              setOpenQuestionId(null);
            }}
          >
            <FaTimes color="white" />
          </button>
        </div>
        <div
          className={`p-4 w-full px-24 text-6xl flex-grow flex flex-col gap-4 items-center justify-center ${pointsText[points]}`}
        >
          {isBonus ? <h1 className="font-effect-fire">BONUS</h1> : null}
          {showQuestion ? (
            <>
              <h2>{question}</h2>
              {img ? (
                <div className="w-full">
                  <img className={`m-auto w-auto h-56`} src={img} alt="img"></img>
                </div>
              ) : null}
              {code ? (
                <code className="text-left text-3xl">
                  <pre>{code}</pre>
                </code>
              ) : null}
            </>
          ) : null}
        </div>
        {isBonus ? (
          <BettingForm
            onBet={() => {
              setShowQuestion(true);
            }}
            onRight={() => {
              setOpenQuestionId(null);
              setAnswered(id);
            }}
            onWrong={() => {
              setOpenQuestionId(null);
              setAnswered(id);
            }}
          />
        ) : (
          <Points
            points={points}
            onRight={() => {
              setOpenQuestionId(null);
              setAnswered(id);
            }}
            onWrong={() => {
              setOpenQuestionId(null);
              setAnswered(id);
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
