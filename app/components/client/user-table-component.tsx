'use client';
import React, {useEffect} from 'react';
import moment from 'moment/moment';

/**
 * UserTableComponent
 * @constructor
 */
export default function UserTableComponent() {
  const val: any = {};
  const [users, setUsers] = React.useState(val);
  const [usersLast24HoursTotal, setUsersLast24HoursTotal] = React.useState(0);
  const [usersLast7DaysTotal, setUsersLast7DaysTotal] = React.useState(0);

  useEffect(() => {
    getUsers(0);
    getUsersLast24Hours();
    getUsersLast7Days();
  }, []);

  /**
   * getUsers
   * @param {number} page Page Number For User Search
   */
  async function getUsers(page: number) {
    const response = await fetch(`/api/auth/users?page=${page}`);
    const users = await response.json();
    setUsers(users);
  }

  /**
   * getUsersLast24Hours
   * @return {Promise<void>}
   */
  async function getUsersLast24Hours() {
    const now = moment().utc().format();
    const dayAgo = moment().utc().subtract(1, 'days').format();
    const url = `/api/auth/users/active-sessions?from=${dayAgo}&to=${now}`;
    const usersLast24Hours = await fetch(url);
    const usersLast24HoursTotal = await usersLast24Hours.json();
    setUsersLast24HoursTotal(usersLast24HoursTotal);
  }

  /**
   * getUsersLast7Days
   * @return {Promise<void>}
   */
  async function getUsersLast7Days() {
    const now = moment().utc().format();
    const weekAgo = moment().utc().subtract(7, 'days').format();
    const url = `/api/auth/users/active-sessions?from=${weekAgo}&to=${now}`;
    const usersLast7Days = await fetch(url);
    const usersLast7DaysTotal = await usersLast7Days.json();
    setUsersLast7DaysTotal(usersLast7DaysTotal);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="row" style={{paddingTop: '30px'}}>
        <h3>Stats</h3>
        <div className="col-4" style={{textAlign: 'center'}}>
          Total Number of Users Signed Up: <b>{users.total}</b>
        </div>
        <div className="col-4" style={{textAlign: 'center'}}>
          Users With Active Sessions in the Last 24 Hours:
          <b> {usersLast24HoursTotal}</b>
        </div>
        <div className="col-4" style={{textAlign: 'center'}}>
          Users With Active Sessions in the Last 7 days:
          <b> {usersLast7DaysTotal}</b>
        </div>
      </div>
      <div className="row">
        <div className="col" style={{paddingTop: '30px'}}>
          <h3>User Details</h3>
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Sign Up Date</th>
                <th scope="col">Number of Logins</th>
                <th scope="col">Time of Last Session</th>
              </tr>
            </thead>
            <tbody>
              {
                users?.users?.map((user: any) => {
                  return (
                    <tr key={user.user_id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {
                          moment(user.created_at)
                              .format('MMMM Do YYYY, h:mm:ss a')
                        }
                      </td>
                      <td>{user.logins_count}</td>
                      <td>
                        {
                          user.last_login ?
                              moment(user.last_login)
                                  .format('MMMM Do YYYY, h:mm:ss a') :
                              'Never'
                        }
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {
                users.total ?
                  [...Array(Math.ceil(users.total / 50))]
                      .map((e, i) => {
                        return (
                          <li key={i} className="page-item">
                            <a
                              className="page-link"
                              style={{cursor: 'pointer'}}
                              onClick={() => getUsers(i)}
                            >
                              {i + 1}
                            </a>
                          </li>
                        );
                      }) :
                    ''
              }
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
