import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {UserProvider} from '@auth0/nextjs-auth0/client';
import {getSession} from '@auth0/nextjs-auth0';
import 'reflect-metadata';


// eslint-disable-next-line new-cap
const INTER = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Simple Dashboard',
  description: 'Simple Dashboard Application',
};

/**
 * RootLayout
 * @param {ReactNode} children
 * @constructor
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // @ts-ignore
  const SESSION = await getSession();

  return (
    <html lang="en">
      <UserProvider>
        <body className={INTER.className}>
          <div
            className="row"
            style={{color: 'white', backgroundColor: 'black', padding: '10px'}}
          >
            {
              SESSION?.user?
                  <>
                    <div className="col-11">Hello {SESSION.user.name}</div>
                    <div
                      className="col"
                      style={{textAlign: 'right'}}
                    >
                      <a href="settings"
                        style={{paddingRight: '15px', color: 'white'}}
                      >
                        <abbr title="settings">
                          <i className="bi-gear"></i>
                        </abbr>
                      </a>

                      <a href="/api/auth/logout" style={{color: 'white'}}>
                        <abbr title="logout">
                          <i className="bi-power"></i>
                        </abbr>
                      </a>
                    </div>
                  </> :
                  <div></div>
            }

          </div>
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
