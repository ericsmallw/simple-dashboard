const moment =  require('moment');
import { withPageAuthRequired, getSession} from '@auth0/nextjs-auth0';
import ResendEmailVerificationButton from "@/app/components/client/resend-email-verification-button";

export default withPageAuthRequired(async function Dashboard() {
    // @ts-ignore
    let { user } = await getSession();

    let response = await fetch(`${process.env.AUTH0_BASE_URL}/api/auth/users?page=0`);
    let users = await response.json();

    // get number of users that logged in the last 24 hour
    let nowUtc = moment().utc().format();
    let dayAgoUtc = moment().utc().subtract(1, 'days').format();
    let usersLast24Hours = await fetch(`${process.env.AUTH0_BASE_URL}/api/auth/users/active-sessions?from=${dayAgoUtc}&to=${nowUtc}`);
    let usersLast24HoursTotal = await usersLast24Hours.json();

    // get number of users that logged in the last 7 days
    let weekAgoUtc = moment().utc().subtract(7, 'days').format();
    let usersLast7Days = await fetch(`${process.env.AUTH0_BASE_URL}/api/auth/users/active-sessions?from=${weekAgoUtc}&to=${nowUtc}`);
    let usersLast7DaysTotal = await usersLast7Days.json();

    return (
        <>
            {
                user.email_verified
                    ? <div className="container">
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
                                        users.users.map((user: any) => {
                                            return (
                                                <tr key={user.user_id}>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.logins_count}</td>
                                                    <td>{user.last_login ? moment(user.last_login).format('MMMM Do YYYY, h:mm:ss a') : 'Never'}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    :<ResendEmailVerificationButton userId={user.sub}/>
            }
      </>

  )
}, { returnTo: '/api/auth/login' })
