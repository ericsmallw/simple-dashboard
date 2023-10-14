import { withPageAuthRequired, getSession, updateSession} from '@auth0/nextjs-auth0';
import UpdateNameButton from "@/app/components/client/update-name-button";
import OnChangeInput from "@/app/components/client/on-change-input";
export default withPageAuthRequired(async function Dashboard() {
    // @ts-ignore
    let session = await getSession();

    async function updateAuth0Session(name: string) {
        'use server'
        if (session) {
            const updates = {name};
            await updateSession({...session, user: {...session.user, ...updates}});
        }
    }

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
                    <div className="input-group mb-3">
                        <OnChangeInput defaultValue={session?.user.name}/>
                    </div>
                    <UpdateNameButton userId={session?.user.sub} updateSession={updateAuth0Session} />
                </div>
                <div className="col-6">
                    <h4>Password</h4>
                    <div className="input-group mb-3">
                        <input id="oldPassword" type="password" className="form-control" placeholder="Old Password" aria-label="Password" aria-describedby="basic-addon1" />
                    </div>
                    {/*<div className="input-group mb-3"><input id="newPassword1" type="password" className="form-control" placeholder="New Password" aria-label="Password" aria-describedby="basic-addon1" /></div>*/}
                    {/*<div className="input-group mb-3"><input id="newPassword2" type="password" className="form-control" placeholder="Retype New Password" aria-label="Password" aria-describedby="basic-addon1"/></div>*/}
                    <button className="btn btn-primary">Change Password</button>
                </div>
            </div>
        </div>
    )
}, { returnTo: '/api/auth/login' })
