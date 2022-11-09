import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import Container from "../../components/container";
import { getProviders, signIn, getSession } from "next-auth/react";

const SignIn = ({ providers }) => {
    return (
        <Fragment>
            <Head>
                <title>Todo App</title>
                <link rel="icon" href="/favicon-32x32.png" />
            </Head>
            <Header />
            <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Container>
                    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm py-4 px-6 border-b dark:border-gray-700 text-center">
                        {Object.values(providers).map((provider) => {
                            return (
                                <div key={provider.name}>
                                    <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </main>
            <Footer />
        </Fragment>
    );
};

export default SignIn;

export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req });

    if (session) {
        return {
            redirect: { destination: "/" }
        };
    }

    return {
        props: {
            providers: await getProviders(context)
        }
    };
}
