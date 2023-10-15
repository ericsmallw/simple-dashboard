'use client';
import React, {useEffect} from "react";
import moment from "moment/moment";

export default function UserTableComponent(props: any) {
    let val: any = {};
    const [users, setUsers] = React.useState(val);
    const [usersLast24HoursTotal, setUsersLast24HoursTotal] = React.useState(0);
    const [usersLast7DaysTotal, setUsersLast7DaysTotal] = React.useState(0);

    useEffect(() => {
        getUsers(0);
        getUsersLast24Hours();
        getUsersLast7Days();
    }, []);

    async function getUsers(page: number) {
        let response = await fetch(`/api/auth/users?page=${page}`);
        let users = await response.json();
        setUsers(users);
    }

    async function getUsersLast24Hours() {
        let nowUtc = moment().utc().format();
        let dayAgoUtc = moment().utc().subtract(1, 'days').format();
        let usersLast24Hours = await fetch(`/api/auth/users/active-sessions?from=${dayAgoUtc}&to=${nowUtc}`);
        let usersLast24HoursTotal = await usersLast24Hours.json();
        setUsersLast24HoursTotal(usersLast24HoursTotal);
    }

    async function getUsersLast7Days() {
        let nowUtc = moment().utc().format();
        let weekAgoUtc = moment().utc().subtract(7, 'days').format();
        let usersLast7Days = await fetch(`/api/auth/users/active-sessions?from=${weekAgoUtc}&to=${nowUtc}`);
        let usersLast7DaysTotal = await usersLast7Days.json();
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
                <div className="col-4">
                    Total Number of Users Signed Up: <b>{users.total}</b>
                </div>
                <div className="col-4">
                    Users With Active Sessions Today: <b>{usersLast24HoursTotal}</b>
                </div>
                <div className="col-4">
                    Users With Active Sessions in the Last 7 days: <b>{usersLast7DaysTotal}</b>
                </div>
            </div>
            <div className="row">
                <div className="col" style={{paddingTop: '30px'}}>
                    <table  className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
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
                                        <td>{user.logins_count}</td>
                                        <td>
                                            {
                                                user.last_login
                                                    ? moment(user.last_login).format('MMMM Do YYYY, h:mm:ss a')
                                                    : 'Never'
                                            }
                                        </td>
                                    </tr>
                                )
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
                                users.total
                                    ? [...Array(Math.ceil(users.total / 50))].map((e, i) => {
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
                                            )
                                        })
                                    : ""
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}
