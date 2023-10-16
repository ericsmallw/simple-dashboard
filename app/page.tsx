import UserTableComponent from '@/app/components/client/user_table_component';
import {withPageAuthRequired, getSession, Session} from '@auth0/nextjs-auth0';
// eslint-disable-next-line max-len
import ResendEmailVerificationButton from '@/app/components/client/resend_email_verification_button';

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
