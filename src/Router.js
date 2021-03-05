// Routes.js
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Course } from './components/Course';
import { Home } from './components/Home';
const courses = {
  COMP4537: 'Internet Software Architecture',
  COMP4948: 'Predictive Machine Learning',
  COMP4949: 'Big Data Analytics Methods',
};
const routes = Object.keys(courses).map((courseNum) => {
  return (
    <Route path={'/' + courseNum} component={Course}>
      {/* <Course courseNum={courseNum} courseName={courses[courseNum]} /> */}
    </Route>
  );
});
export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* {routes} */}
      <Route path="/COMP4537" component={Course} />
    </Switch>
  </BrowserRouter>
);
