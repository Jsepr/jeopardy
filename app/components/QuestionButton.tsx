import { useEffect } from 'react';
import { pointsColors, pointsText } from '~/utils/style';
import { playSound } from '~/utils/utils';
import type { Question } from '~/utils/questions';
import { motion } from 'framer-motion';

export function QuestionButton({
  question: { id, points, isBonus, answered },
  setOpenQuestion,
}: {
  question: Question;
  setOpenQuestion: (questionId: string | null) => void;
}) {
  return (
    <motion.button
      key={id}
      layoutId={id}
      layout
      type="button"
      className={`rounded-lg w-full text-3xl h-20 ${answered ? 'bg-gray-400' : pointsColors[points]} ${
        pointsText[points]
      }`}
      onClick={() => {
        setOpenQuestion(id);
        playSound(isBonus ? 'stinger.mp3' : 'card.mp3');
      }}
    >
      {points}
    </motion.button>
  );
}
