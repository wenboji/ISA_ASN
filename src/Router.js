// Routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CoursePage } from './components/CoursePage';
import { Home } from './components/Home';
import { courses } from './Const';
const CreateCourse = (props) => (
  <CoursePage
    courseName={courses
      .filter(({ courseNum }) => {
        return courseNum === props.location.pathname.substr(1);
      })
      .map(({ courseName }) => {
        return courseName;
      })}
  />
);
export const CourseRoute = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      path={'/:courseNum'}
      render={(props) => <CreateCourse {...props} />}
    />
  </Switch>
);
