import React from "react";
import { signOut } from "next-auth/react";

const Footer = ({ session }) => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-500 text-center">
            <small>
                Coded by{" "}
                <a className="underline" href="https://dalkmania.github.io">
                    Niklas Dahlqvist
                </a>
                .
                {session && (
                    <button className="ml-3" onClick={() => signOut()}>
                        Sign Out
                    </button>
                )}
            </small>
        </footer>
    );
};

export default Footer;
