import React, { useEffect, useState } from 'react';
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
const apistats = [
  { id: 1, method: 'GET', path: '/allitems', accessCount: 8 },
  { id: 2, method: 'GET', path: '/itemsid/', accessCount: 11 },
];

const ApiDocumentation = () => {
  return <div>api documentation</div>;
};

const AdminPage = () => {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    fetch('http://kevinshih.xyz/inventory_tracker/getApiCount')
      .then((response) => response.json())
      .then((data) => setStats(data));
  });
  return (
    <table>
      <tr>
        <th>PATH</th>
        <th>ACCESS COUNT</th>
      </tr>
      {stats.map((item) => {
        return (
          <tr>
            <td>{item.name}</td>
            <td>{item.count}</td>
          </tr>
        );
      })}
    </table>
  );
};
export const TeamProject = () => {
  let { path, url } = useRouteMatch();
  return (
    <div>
      team project
      <div>
        <ul>
          <li>
            <Link to={url + '/API/V1/docs'}>Documentation</Link>
          </li>
          <li>
            <Link to={url + '/API/V1/admin'}>Admin</Link>
          </li>
        </ul>
      </div>
      <Switch>
        {/* <Route path={`${path}/API/V1/documentation`}>
          <ApiDocumentation />
        </Route> */}
        <Route path={`${path}/API/V1/admin`}>
          <AdminPage />
        </Route>
        <Route path={`${path}/API/V1/docs`}>
          <Doc />
        </Route>
      </Switch>
    </div>
  );
};

function iframe() {
  return {
    __html:
      '<iframe src="/swagger.html" width="100%" height="1000px" ></iframe>',
  };
}
const Doc = () => {
  return (
    <div>
      <div dangerouslySetInnerHTML={iframe()} />
    </div>
  );
};
