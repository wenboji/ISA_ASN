import banner from '../banner.jpg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
export const Home = () => {
  const courses = {
    COMP4537: 'Internet Software Architecture',
    COMP4948: 'Predictive Machine Learning',
    COMP4949: 'Big Data Analytics Methods',
  };
  const links = Object.keys(courses).map((courseNum) => {
    return (
      <li>
        <Link to={'/' + courseNum}>{courseNum + ' ' + courses[courseNum]}</Link>
      </li>
    );
  });
  return (
    <Router>
      <div className="App">
        <div className="banner">
          <img src={banner}></img>
        </div>
        <div className="course-list">
          <ul className="top-ul">
            <li>
              <h3>Course List</h3>
            </li>
            <li>
              <ul className="course-ul">{links}</ul>
            </li>
          </ul>
        </div>
      </div>
    </Router>
  );
};
