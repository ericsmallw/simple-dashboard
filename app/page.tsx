import UserTableComponent from "@/app/components/client/user-table-component";

const moment =  require('moment');
import { withPageAuthRequired, getSession} from '@auth0/nextjs-auth0';
import ResendEmailVerificationButton from "@/app/components/client/resend-email-verification-button";

export default withPageAuthRequired(async function Dashboard() {
    // @ts-ignore
    let { user } = await getSession();

    let response = await fetch(`${process.env.AUTH0_BASE_URL}/api/auth/users?page=0`);
    let users = await response.json();

    return (
        <>
            {
                user.email_verified
                    ? <UserTableComponent />
                    :<ResendEmailVerificationButton userId={user.sub}/>
            }
      </>

  )
}, { returnTo: '/api/auth/login' })
