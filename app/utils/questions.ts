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
    category: 'What a time to be alive!',
    questions: [
      {
        id: 'category-1-100',
        points: 100,
        question: 'Veckodag och ikonisk youtube-låt som Rebecca levererade 2011',
      },
      {
        id: 'category-1-200',
        points: 200,
        question:
          'Tillstånd av mätthet som uppstår då man ätit för mycket, men också en Göteborgs-duo som äter för mycket',
      },
      {
        id: 'category-1-300',
        points: 300,
        question: 'Youtubes mest visade klipp som kan beskrivas som barnvänlig med catchig sång',
      },
      {
        id: 'category-1-400',
        points: 400,
        question: 'Polsk-amerikansk företagsledare som var VD för Youtube från 2014-2023',
      },
      {
        id: 'category-1-500',
        points: 500,
        question: 'Datum när Youtubes första klipp "me at the Zoo" lades upp',
      },
    ],
  },
  {
    category: 'MatGeekLover_93',
    questions: [
      {
        id: 'category-2-100',
        points: 100,
        question: 'Ingredienserna som krävs för att göra en tzatziki',
      },
      {
        id: 'category-2-200',
        points: 200,
        question:
          'Ett bakverk från 1600-talet, bakad som en tartelett i en oval eller rund bakform. Skalet består av mördeg och fylls med en blandning innehållande mandelmassa och toppas med vit glasyr',
      },
      {
        id: 'category-2-300',
        points: 300,
        question:
          'En wokad rätt med risnudlar som vanligtvis serveras på gatukök i Thailand. Inte riktigt som nr. 14 på Spicy hot, men nästan',
      },
      {
        id: 'category-2-400',
        points: 400,
        question: 'Antal gram kaffe som behövs i vår kaffemaskin för att göra två ultimata kaffekoppar',
      },
      {
        id: 'category-2-500',
        points: 500,
        question:
          'Italiensk term för finhackad lök, morot och selleri som steks i låg temperatur och är grunden för många italienska rätter',
      },
    ],
  },
  {
    category: "I'm sexy and I know IT",
    questions: [
      {
        id: 'category-3-100',
        points: 100,
        question: 'Förkortning som denna symbol representerar',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/USB_icon.svg/2560px-USB_icon.svg.png',
      },
      {
        id: 'category-3-200',
        points: 200,
        question:
          'Högnivå, klassbaserat, objektorienterat programmeringsspråk som är designat för att ha så få implementeringsberoenden som möjligt',
      },
      {
        id: 'category-3-300',
        points: 300,
        question:
          'Dataspel som är fyllt med uppslukande magi som sätter spelaren i centrum för deras äventyr för att bli den häxa eller trollkarl de väljer att vara',
      },
      {
        id: 'category-3-400',
        points: 400,
        question: 'Domännamnet som kommer från landet Niue i Stilla havet och som ägs av Internetstiftelsen i Sverige',
      },
      {
        id: 'category-3-500',
        points: 500,
        question: 'Det kan beräknas med denna funktion',
        code: `
function giveAnswerToQuestion() {
  let x = 0;
  for (let i = 0; i < 60; i++) {
    if (i % 2) {
      x = x + 1;
    }
  }
  return x;
}
`,
      },
    ],
  },
  {
    category: 'David Kringlund',
    questions: [
      {
        id: 'category-5-100',
        points: 100,
        question: 'En behållare som man brukar skaka drinkar i',
      },
      {
        id: 'category-5-200',
        points: 200,
        question: 'Citrusfrukt som ofta används som dekoration i en ordentligt gjord negroni',
      },
      {
        id: 'category-5-300',
        points: 300,
        question: 'Sprisorterna som används i drinken Long Island iced tea',
      },
      {
        id: 'category-5-400',
        points: 400,
        question: 'En drink som består av whiskey, söt vermouth och bitter',
      },
      {
        id: 'category-5-500',
        points: 500,
        question: 'Världskänd cocktailbar som startade i Chicago USA och som Jesper besökte i New York',
      },
    ],
  },
  {
    category: 'Fuck Aina',
    questions: [
      {
        id: 'category-6-100',
        points: 100,
        question: 'Staden som Maja växte upp i',
      },
      {
        id: 'category-6-200',
        points: 200,
        question: 'Majas favoritdrink som består av citronjuice, sockerlag, sodavatten och gin',
      },
      {
        id: 'category-6-300',
        points: 300,
        question:
          'Stygn som broderas i två steg, först ett högerlagt stygn som sedan broderas över med ett vänsterlagt stygn',
      },
      {
        id: 'category-6-400',
        points: 400,
        question: 'Majas mellannamn',
      },
      {
        id: 'category-6-500',
        points: 500,
        question: 'Programmet som Majas pappa vad domare i där vår käre Adam Alsing var programledare',
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
