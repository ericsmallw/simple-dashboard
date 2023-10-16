'use client';
import React, {useEffect} from 'react';
import moment from 'moment/moment';

/**
 * UserTableComponent
 * @constructor
 */
export default function UserTableComponent() {
  const VAL: any = {};
  const [USERS, setUsers] = React.useState(VAL);
  const [USERS_24_HOURS, setUsers24Hours] = React.useState(0);
  const [USERS_7_DAYS, setUsers7Days] = React.useState(0);

  useEffect(() => {
    (async () => {
      await getUsers(0);
      setUsers24Hours(await getUsersLastXDays(1));
      setUsers7Days(await getUsersLastXDays(7));
    })();
  }, []);

  /**
   * getUsers
   * @param {number} page Page Number For User Search
   */
  async function getUsers(page: number) {
    const RESPONSE = await fetch(`/api/auth/users?page=${page}`);
    const USERS = await RESPONSE.json();
    setUsers(USERS);
  }

  /**
   * getUsersLastXDays
   * @param {number} days
   * @return {Promise<number>} return number of users with \
   *    active sessions in time period
   */
  async function getUsersLastXDays(days: number): Promise<number> {
    const NOW = moment().utc().format();
    const DAYS_AGO = moment().utc().subtract(days, 'days').format();
    const URL = `/api/auth/users/active_sessions?from=${DAYS_AGO}&to=${NOW}`;
    const USERS_LAST_X_DAYS = await fetch(URL);
    return await USERS_LAST_X_DAYS.json();
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
          Total Number of Users Signed Up: <b>{USERS.total}</b>
        </div>
        <div className="col-4" style={{textAlign: 'center'}}>
          Users With Active Sessions in the Last 24 Hours:
          <b> {USERS_24_HOURS}</b>
        </div>
        <div className="col-4" style={{textAlign: 'center'}}>
          Users With Active Sessions in the Last 7 days:
          <b> {USERS_7_DAYS}</b>
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
                USERS?.users?.map((user: any) => {
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
                USERS.total ?
                  [...Array(Math.ceil(USERS.total / 50))]
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
