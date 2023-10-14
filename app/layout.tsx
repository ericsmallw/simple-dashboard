import './globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {UserProvider} from "@auth0/nextjs-auth0/client";
import {getSession} from '@auth0/nextjs-auth0';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple Dashboard',
  description: 'Simple Dashboard Application',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    // @ts-ignore
    const session = await getSession();

    return (
    <html lang="en">
        <UserProvider>
            <body className={inter.className}>
                <div className="row" style={{color: 'white', backgroundColor: "black", padding: '10px'}}>
                {
                    session?.user
                        ?<>
                            <div className="col-11">Hello {session.user.name}</div>
                            <div className="col" style={{textAlign: 'right'}}>
                                <a href="settings" style={{paddingRight: '15px', color: "white"}}>
                                    <i className="bi-gear"></i>
                                </a>
                                <a href="/api/auth/logout" style={{color: "white"}}>
                                    <i className="bi-power"></i>
                                </a>
                            </div>
                        </>
                        : <div></div>
                }

            </div>
                {children}
            </body>
        </UserProvider>
    </html>
    )
}
