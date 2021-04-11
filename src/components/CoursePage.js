import React from 'react';
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { labs } from '../Const';
import { QuizPage } from './Quizs';
import { TeamProject } from './TeamProject';
const Course = (props) => {
  const { courseNum, courseName, url } = props;
  const labLinks = labs.map(({ labName }) => {
    return (
      <li>
        <Link to={`${url}` + labName}>{labName}</Link>
      </li>
    );
  });
  const quizLinks = () => {
    return (
      <li>
        <Link to={`${url}/quizs`}>quizs</Link>
      </li>
    );
  };
  const teamProject = () => {
    return (
      <li>
        <Link to={`${url}/teamproject`}>Team Project</Link>
      </li>
    );
  };
  return (
    <div className="course">
      <div>{courseNum + ' ' + courseName}</div>
      <ul>{labLinks}</ul>
      <ul>{quizLinks()}</ul>
      <ul>{teamProject()}</ul>
    </div>
  );
};
export const CoursePage = (props) => {
  let { path, url } = useRouteMatch();
  let { courseNum } = useParams();
  let courseName = props.courseName;
  return (
    <Switch>
      <Route exact path={`${path}/`}>
        <Course courseNum={courseNum} courseName={courseName} url={url} />
      </Route>
      <Route path={`${path}/quizs`}>
        <QuizPage />
      </Route>
      <Route path={`${path}/teamproject`}>
        <TeamProject />
      </Route>
      {/* <Route path={`${path}/:labNum`}>
        <Lab />
      </Route> */}
    </Switch>
  );
};
