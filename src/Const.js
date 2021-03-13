const courses = [
  { courseNum: 'COMP4537', courseName: 'Internet Software Architecture' },
  { courseNum: 'COMP4948', courseName: 'Predictive Machine Learning' },
  { courseNum: 'COMP4949', courseName: 'Big Data Analytics Methods' },
];
const labs = [
  { labName: 'lab1' },
  { labName: 'lab2' },
  { labName: 'lab3' },
  { labName: 'lab4' },
  { labName: 'lab5' },
  { labName: 'lab6' },
  { labName: 'lab7' },
];
const quizs = [{ quiz: 'quiz1' }, { quiz: 'quiz2' }, { quiz: 'quiz3' }];
const questions = [
  {
    questionId: '1',
    questionText: 'question1',
    choices: [
      { choiceText: 'choice 1', choiceId: '5', rightChoice: true },
      { choiceText: 'choice 2', choiceId: '6', rightChoice: false },
      { choiceText: 'choice 3', choiceId: '7', rightChoice: false },
      { choiceText: 'choice 4', choiceId: '8', rightChoice: false },
    ],
  },
  {
    questionId: '2',
    questionText: 'question2',
    choices: [
      { choiceText: 'choice 1', choiceId: '1', rightChoice: true },
      { choiceText: 'choice 2', choiceId: '2', rightChoice: false },
      { choiceText: 'choice 3', choiceId: '3', rightChoice: false },
      { choiceText: 'choice 4', choiceId: '4', rightChoice: false },
    ],
  },
];
export { courses, labs, quizs, questions };
