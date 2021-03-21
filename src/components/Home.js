import banner from '../banner.jpg';
import { Link } from 'react-router-dom';
import { courses } from '../Const.js';
export const Home = () => {
  const links = courses.map(({ courseNum, courseName }) => {
    return (
      <li>
        <Link to={'/' + courseNum}>{courseNum + ' ' + courseName}</Link>
      </li>
    );
  });
  return (
    <div className="App">
      <div className="banner">
        <img src={banner} alt="banner"></img>
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
  );
};
