import {
  withPageAuthRequired,
  getSession,
  updateSession,
} from '@auth0/nextjs-auth0';
import UpdateNameButton from '@/app/components/client/update_name_button';
import OnChangeInput from '@/app/components/client/on_change_input';
import dynamic from 'next/dynamic';
import {PasswordProps} from '../components/client/password_update_component';

const COMPONENT_URI = '@/app/components/client/password-update-component';
const PasswordUpdateComponent = dynamic<PasswordProps>(
    () => import(COMPONENT_URI), {ssr: false}
);

/**
 * Dashboard
 * @constructor
 */
export default withPageAuthRequired(async function Dashboard() {
  // @ts-ignore
  const SESSION = await getSession();

  /**
   * updateAuth0Session
   * @param {string} name
   */
  async function updateAuth0Session(name: string) {
    'use server';
    if (SESSION) {
      const UPDATES = {name};
      await updateSession({...SESSION, user: {...SESSION.user, ...UPDATES}});
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
            <OnChangeInput
              defaultValue={SESSION?.user.name}
            />
          </div>
          <UpdateNameButton
            userId={SESSION?.user.sub}
            updateSession={updateAuth0Session}
          />
        </div>
        <PasswordUpdateComponent
          email={SESSION?.user.email}
          userId={SESSION?.user.sub}
        />
      </div>
    </div>
  );
}, {returnTo: '/api/auth/login'});
