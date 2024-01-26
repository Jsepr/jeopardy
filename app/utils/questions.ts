import type { pointsColors } from './style';

export type Question = {
  id: string;
  points: keyof typeof pointsColors;
  question: string;
  img?: string;
  code?: string;
  isBonus?: boolean;
  answered?: boolean;
};
export type Category = {
  category: string;
  questions: Array<Question>;
};
export const categories: Array<Category> = [
  {
    category: 'Famous Quotes',
    questions: [
      {
        id: 'category-1-100',
        points: 100,
        question: 'Who said the famous quote, "The only way to do great work is to love what you do."?',
      },
      {
        id: 'category-1-200',
        points: 200,
        question: 'Finish the quote: "I have a dream that one day..."',
      },
      {
        id: 'category-1-300',
        points: 300,
        question: 'Who said the famous quote, "In the end, it\'s not the years in your life that count. It\'s the life in your years."?',
      },
      {
        id: 'category-1-400',
        points: 400,
        question: 'Who said the famous quote, "Be yourself; everyone else is already taken."?',
      },
      {
        id: 'category-1-500',
        points: 500,
        question: 'Finish the quote: "The greatest glory in living lies not in never falling, but in..."',
      },
    ],
  },
  {
    category: 'World Capitals',
    questions: [
      {
        id: 'category-2-100',
        points: 100,
        question: 'What is the capital of Australia?',
      },
      {
        id: 'category-2-200',
        points: 200,
        question: 'What is the capital of Brazil?',
      },
      {
        id: 'category-2-300',
        points: 300,
        question: 'What is the capital of Japan?',
      },
      {
        id: 'category-2-400',
        points: 400,
        question: 'What is the capital of South Africa?',
      },
      {
        id: 'category-2-500',
        points: 500,
        question: 'What is the capital of Sweden?',
      },
    ],
  },
  {
    category: 'Science and Technology',
    questions: [
      {
        id: 'category-3-100',
        points: 100,
        question: 'What does DNA stand for?',
      },
      {
        id: 'category-3-200',
        points: 200,
        question: 'What is the chemical symbol for the element with the atomic number 1?',
      },
      {
        id: 'category-3-300',
        points: 300,
        question: 'What is the largest planet in our solar system?',
      },
      {
        id: 'category-3-400',
        points: 400,
        question: 'What is the process of converting a liquid into a gas called?',
      },
      {
        id: 'category-3-500',
        points: 500,
        question: 'What is the unit of electric current?',
      },
    ],
  },
  {
    category: 'Famous Paintings',
    questions: [
      {
        id: 'category-4-100',
        points: 100,
        question: 'Which artist painted the Mona Lisa?',
      },
      {
        id: 'category-4-200',
        points: 200,
        question: 'Which painting features a melting clock?',
      },
      {
        id: 'category-4-300',
        points: 300,
        question: 'Which artist painted The Starry Night?',
      },
      {
        id: 'category-4-400',
        points: 400,
        question: 'Which painting is often referred to as the "Sistine Chapel of America"?',
      },
      {
        id: 'category-4-500',
        points: 500,
        question: 'Which artist painted The Persistence of Memory?',
      },
    ],
  },
  {
    category: 'Sports Trivia',
    questions: [
      {
        id: 'category-5-100',
        points: 100,
        question: 'Which country won the FIFA World Cup in 2018?',
      },
      {
        id: 'category-5-200',
        points: 200,
        question: 'In which sport would you perform a "slam dunk"?',
      },
      {
        id: 'category-5-300',
        points: 300,
        question: 'Who holds the record for the most home runs in Major League Baseball?',
      },
      {
        id: 'category-5-400',
        points: 400,
        question: 'Which country has won the most Olympic gold medals?',
      },
      {
        id: 'category-5-500',
        points: 500,
        question: 'Who is the all-time leading scorer in NBA history?',
      },
    ],
  },
];


function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function addBonusQuestion(allCategories: Array<Category>): Array<Category> {
  const bonusCategory = getRandomInt(allCategories.length);
  let bonusCategory2 = getRandomInt(allCategories.length);
  while (bonusCategory2 === bonusCategory) {
    bonusCategory2 = getRandomInt(allCategories.length);
  }
  const bonusQuestion = getRandomInt(allCategories[bonusCategory].questions.length);
  const bonusQuestion2 = getRandomInt(allCategories[bonusCategory2].questions.length);

  return allCategories.map((category, index) => {
    if (index !== bonusCategory && index !== bonusCategory2) return category;
    return {
      ...category,
      questions: category.questions.map((question, qIndex) => {
        if (qIndex !== bonusQuestion && qIndex !== bonusQuestion2) return { ...question, answered: false };
        return { ...question, isBonus: true, answered: false };
      }),
    };
  });
}
