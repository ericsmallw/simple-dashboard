
import { withPageAuthRequired, getSession} from '@auth0/nextjs-auth0';
import ResendEmailVerificationButton from "@/app/components/client/resend-email-verification-button";
import {doc} from "prettier";
export default withPageAuthRequired(async function Dashboard() {

    // @ts-ignore
    let { user } = await getSession();

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
                    </div>
                    :<ResendEmailVerificationButton userId={user.sub}/>
            }
      </>

  )
}, { returnTo: '/api/auth/login' })
