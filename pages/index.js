import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Container from "../components/container";
import Todo from "../components/todo";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import Filter from "../components/filter";
import { getSession, useSession } from "next-auth/react";
import { makeSerializable } from "../utils";
import { prisma } from "../prisma/client";

export default function Home({ currentTodos }) {
    const { data: session } = useSession();
    const [todos, setTodos] = useState(currentTodos);
    const [allTodos, setAllTodos] = useState(null);
    const [activeTodos, setActiveTodos] = useState(null);
    const [completedTodos, setCompletedTodos] = useState(null);

    const refreshData = () => {
        const body = { authorEmail: session.user.email };
        fetch(`/api/todos/read`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                const todos = makeSerializable(data);
                setTodos(todos);
                setAllTodos(todos);
                setActiveTodos(todos?.filter((todo) => !todo.completed));
                setCompletedTodos(todos?.filter((todo) => todo.completed));
            });
    };

    useEffect(() => {
        setAllTodos(currentTodos);
        setActiveTodos(currentTodos?.filter((todo) => !todo.completed));
        setCompletedTodos(currentTodos?.filter((todo) => todo.completed));
    }, [currentTodos]);

    return (
        <Fragment>
            <Head>
                <title>Todo App</title>
                <link rel="icon" href="/favicon-32x32.png" />
            </Head>

            <Header refreshData={refreshData} session={session} />
            <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Container>
                    {todos.length > 0 ? (
                        todos.map((todo) => <Todo todo={todo} key={todo.id} refreshData={refreshData} />)
                    ) : (
                        <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm py-4 px-6 border-b dark:border-gray-700">
                            <p className={`flex-1 text-xs sm:text-base text-gray-900 dark:text-gray-100`}>
                                No Todos Here Yet ...
                            </p>
                        </div>
                    )}
                    <Filter
                        todos={{
                            all: allTodos,
                            active: activeTodos,
                            completed: completedTodos
                        }}
                        setTodos={setTodos}
                        refreshData={refreshData}
                    />
                </Container>
            </main>
            <Footer session={session} />
        </Fragment>
    );
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false
            }
        };
    }

    const { Todo } = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
        include: {
            Todo: true
        }
    });
    return {
        props: {
            currentTodos: makeSerializable(Todo)
        }
    };
}
