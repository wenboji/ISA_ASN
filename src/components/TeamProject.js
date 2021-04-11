import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminPage from './AdminPage.js';
import { InventoryTrackerPage } from './InventoryTrackerPage';
export const TeamProject = () => {
  let { path, url } = useRouteMatch();
  return (
    <div>
      team project
      <div>
        <ul>
          <li>
            <Link to={url + '/API/V1/inventory'}>Inventory</Link>
          </li>
          <li>
            <Link to={url + '/API/V1/docs'}>Documentation</Link>
          </li>
          <li>
            <Link to={url + '/API/V1/admin'}>Admin</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path={`${path}/API/V1/inventory`}>
          <InventoryTrackerPage />
        </Route>
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
      '<iframe src="/swagger.html" width="100%" height="1500px" ></iframe>',
  };
}
const Doc = () => {
  return (
    <div>
      <div dangerouslySetInnerHTML={iframe()} />
    </div>
  );
};
