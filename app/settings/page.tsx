import { withPageAuthRequired, getSession} from '@auth0/nextjs-auth0';
export default withPageAuthRequired(async function Dashboard() {
    // @ts-ignore
    const { user } = await getSession();

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Settings</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h4>Name</h4>
                    <div className="input-group mb-3"><input type="text" defaultValue={user.name} className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" /></div>
                    <button className="btn btn-primary">Change Name</button>
                </div>
                <div className="col-6">
                    <h4>Password</h4>
                    <div className="input-group mb-3"><input id="oldPassword" type="password" className="form-control" placeholder="Old Password" aria-label="Password" aria-describedby="basic-addon1" /></div>
                    <div className="input-group mb-3"><input id="newPassword1" type="password" className="form-control" placeholder="New Password" aria-label="Password" aria-describedby="basic-addon1" /></div>
                    <div className="input-group mb-3"><input id="newPassword2" type="password" className="form-control" placeholder="Retype New Password" aria-label="Password" aria-describedby="basic-addon1"/></div>
                    <button className="btn btn-primary">Change Password</button>
                </div>
            </div>
        </div>
    )
}, { returnTo: '/api/auth/login' })
