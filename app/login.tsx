"use client";
import { useSession, signIn, signOut } from "next-auth/react";



export default function Login() {
    const { data: session } = useSession();

    return (
        <div>
            {!session && (
                <>
                    <button className="py-3" onClick={() => signIn()}>Sign in</button>
                </>
            )}
            {session && session.user && (
                <>
                    Signed in as {session.user.name} <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            )}
        </div>
    )
}