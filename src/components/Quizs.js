import React, { useState, useEffect } from 'react';
import { quizs } from '../Const';
import {
  Route,
  Link,
  Switch,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import Modal from 'react-modal';
import { Question } from './Question';
import { questions } from '../Const';
export const QuizPage = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/`}>
        <Quizs />
      </Route>
      <Route path={`${path}/:quizNum`}>
        <Quiz quizQuestions={questions} />
      </Route>
    </Switch>
  );
};
//TODO: username input when inside of quiz page
const Quizs = (props) => {
  let { url } = useRouteMatch();
  const quizsLinks = quizs.map(({ quiz }) => {
    return (
      <li>
        <Link to={`${url}/` + quiz}>{quiz}</Link>
      </li>
    );
  });
  return (
    <div>
      <div>Quizs Links</div>
      <ul>{quizsLinks}</ul>
    </div>
  );
};

const Quiz = ({ quizQuestions }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [userNameInputModalToggle, setUserNameInputModalToggle] = useState(
    true
  );
  const [identity, setIdentity] = useState('');
  const [questions, setQuestions] = useState(quizQuestions);
  const [questionCount, setQuestionsCount] = useState(0);
  const [userName, setUserName] = useState('anonymous');
  let { quizNum } = useParams();
  useEffect(() => {
    if (identity) {
      toggleModal();
    }
  }, [identity]);
  useEffect(() => {
    setQuestionsCount(questions.length);
  }, [questions]);
  //identity modal
  const toggleModal = () => {
    if (identity) {
      setModalIsOpen(!modalIsOpen);
    }
  };
  //student
  //student submit quiz
  const submit = () => {
    console.log(calScore());
    //TODO: update score
  };

  function calScore() {
    return (
      (questions.filter(
        (q) =>
          q.userChoice ===
          q.choices.filter((choice) => choice.rightChoice === true)[0].choiceId
      ).length /
        questions.length) *
      100
    );
  }
  //teacher
  function addQuestion() {
    let addedQuestion = {
      questionId: questionCount + 1,
      questionText: 'please add question here',
      choices: [],
    };
    for (let i = 0; i < 4; i++) {
      addChoice(addedQuestion);
    }
    console.log(addedQuestion);
    setQuestions([...questions, addedQuestion]);
  }
  function deleteQuestion() {
    if (questions.length > 1) {
      setQuestions(questions.slice(0, -1));
    }
  }
  function saveQuiz() {
    console.log('quiz saved');
  }
  const addChoice = (question) => {
    question.choices.push({
      choiceText: '',
      choiceId: question.choices.length + 1,
      rightChoice: false,
    });
    setQuestions([...questions]);
  };

  function deleteChoice(question, choice) {
    if (question.choices.length > 1) {
      question.choices = question.choices.filter(
        (e) => e.choiceId !== choice.choiceId
      );
      setQuestions([...questions]);
    }
  }
  const renderQuestion = (question) => {
    return (
      <>
        <p>{'question ' + question.questionId}</p>
        <input
          type="text"
          placeholder="please input question text"
          value={question.questionText}
          onChange={(e) => {
            question.questionText = e.target.value;
            setQuestions([...questions]);
          }}
        />
        {question.choices.map((choice) => renderChoice(question, choice))}
      </>
    );
  };
  const renderChoice = (question, choice) => {
    return (
      <div>
        <input
          type="radio"
          id={choice.choiceId}
          name={question.questionCount}
          checked={choice.rightChoice}
          onClick={() => {
            question.choices.map((choice) => (choice.rightChoice = false));
            choice.rightChoice = true;
            setQuestions([...questions]);
          }}
        />
        <label for={choice.choiceId}></label>
        <input
          type="text"
          placeholder={
            choice.choiceText ? choice.choiceText : 'please edit choice'
          }
          onChange={(e) => {
            choice.choiceText = e.target.value;
            setQuestions([...questions]);
          }}
        />
        <button onClick={() => addChoice(question)}>add</button>
        <button onClick={() => deleteChoice(question, choice)}>delete</button>
      </div>
    );
  };
  const identityModal = () => {
    return (
      <Modal isOpen={modalIsOpen} contentLabel="You are ?">
        <h4>You are ___? Please choose. </h4>
        <button
          onClick={(event) => {
            setIdentity(event.target.innerText);
          }}
        >
          Student
        </button>
        <button
          onClick={(event) => {
            setIdentity(event.target.innerText);
          }}
        >
          Teacher
        </button>
      </Modal>
    );
  };
  const userNameInputModal = () => {
    return (
      <Modal isOpen={userNameInputModalToggle}>
        <input
          type="text"
          placeholder="please input your name"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <button
          onClick={() => setUserNameInputModalToggle(!userNameInputModalToggle)}
        >
          Start Quiz
        </button>
      </Modal>
    );
  };
  return (
    <div>
      <div className="quiz">{quizNum}</div>
      {identityModal()}
      <div>
        {identity === 'Student' ? (
          <div className="questions">
            {userNameInputModal()}
            <div>{'user: ' + userName}</div>
            {questions.map((question, index) => {
              question.questionCount = index + 1;
              return (
                <div
                  onChange={(event) => {
                    question.userChoice = event.target.value;
                    setQuestions(questions);
                  }}
                >
                  <Question question={question} />
                </div>
              );
            })}
            <button onClick={submit}>Submit</button>
          </div>
        ) : (
          <>
            {questions.map((q) => {
              return renderQuestion(q);
            })}
            <button onClick={() => addQuestion()}>Add Question</button>
            <button onClick={() => deleteQuestion()}>Delete Question</button>
            <br />
            <button onClick={saveQuiz}>Save Quiz</button>
          </>
        )}
      </div>
    </div>
  );
};
