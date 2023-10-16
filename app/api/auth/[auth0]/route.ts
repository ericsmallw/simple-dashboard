// app/api/auth/[auth0]/route.js
import {handleAuth, handleProfile} from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  profile: handleProfile({refetch: true}),
});
