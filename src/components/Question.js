import React from 'react';

export const Question = ({ question }) => {
  return (
    <>
      <p className="questionText">{question.questionText}</p>
      {renderChoices(question)}
    </>
  );
};
const Choice = ({ choiceText, questionCount, id }) => {
  return (
    <div className="choices">
      <label>
        <input type="radio" value={id} name={questionCount} />
        {choiceText}
      </label>
    </div>
  );
};

const renderChoices = (question) => {
  return question.choices.map((choice) => {
    return (
      <Choice
        id={choice.choiceId}
        choiceText={choice.choiceText}
        questionCount={question.questionCount}
      />
    );
  });
};
