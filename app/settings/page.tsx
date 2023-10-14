import { withPageAuthRequired, getSession, updateSession} from '@auth0/nextjs-auth0';
import UpdateNameButton from "@/app/components/client/update-name-button";
import OnChangeInput from "@/app/components/client/on-change-input";
import dynamic from "next/dynamic";
const PasswordUpdateComponent = dynamic(
    () => import("@/app/components/client/password-update-component"), {ssr: false}
)
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
                <PasswordUpdateComponent email={session?.user.email} userId={session?.user.sub}/>
            </div>
        </div>
    )
}, { returnTo: '/api/auth/login' })
