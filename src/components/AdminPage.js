import React, { useState, useEffect } from 'react';
import {
  withAuthenticator,
  AmplifySignUp,
  AmplifySignOut,
} from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { sendRequestWithBody, BASE_URL } from './utils';
const AdminPage = () => {
  const [stats, setStats] = useState([]);
  const [userName, setUserName] = useState('');
  //delete api in api stats
  const deleteApiByName = (apiName) => {
    if (stats.find((el) => el.name !== apiName)) {
      sendRequestWithBody(
        BASE_URL + '/deleteAPICounter',
        {
          name: '/allItems',
        },
        'DELETE'
      )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      setStats(stats.filter((el) => el.name !== apiName));
    }
  };
  //clear all api count
  const clearAllApiCount = () => {
    let path = '/clearAPICount';
    let url = BASE_URL + path;
    let method = 'POST';
    sendRequestWithBody(url, {}, method)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    let path = '/getApiCount';
    let url = BASE_URL + path;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setStats(data));
  }, []);
  useEffect(() => {
    Auth.currentAuthenticatedUser({})
      .then((user) => setUserName(user.username))
      .catch((err) => console.log(err));
  }, [userName]);
  return (
    <div>
      {userName ? '' : <AmplifySignUp />}
      <div>{'Current User: ' + userName}</div>
      <table style={{ border: '10px,solid,black' }}>
        <tbody>
          <tr>
            <th>PATH</th>
            <th>ACCESS COUNT</th>
            <th>DELETE THIS API COUNT</th>
          </tr>
          {stats.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                  <button onClick={() => deleteApiByName(item.name)}>
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => {
            clearAllApiCount();
          }}
        >
          Clear all api counts
        </button>
      </div>
      {userName ? <AmplifySignOut /> : ''}
    </div>
  );
};

export default withAuthenticator(AdminPage);
