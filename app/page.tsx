import UserTableComponent from '@/app/components/client/user-table-component';
import {withPageAuthRequired, getSession} from '@auth0/nextjs-auth0';
// eslint-disable-next-line max-len
import ResendEmailVerificationButton from '@/app/components/client/resend-email-verification-button';

/**
 * Dashboard
 * @constructor
 */
export default withPageAuthRequired(async function Dashboard() {
  const session = await getSession();

  return (
    <>
      {
        session?.user.email_verified ?
            <UserTableComponent />:
            <ResendEmailVerificationButton userId={session?.user.sub}/>
      }
    </>
  );
}, {returnTo: '/api/auth/login'});
