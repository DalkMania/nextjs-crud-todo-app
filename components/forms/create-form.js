import { useState, useRef } from "react";
import Form from "./form";
import TextInput from "../inputs/text-input";
import useKeyPress from "../../hooks/useKeyPress";
import { useSession } from "next-auth/react";

const CreateForm = ({ refreshData }) => {
    const { data: session, status } = useSession();
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const formRef = useRef(null);

    const createTodo = async () => {
        if (!title || !detail) return;

        try {
            const body = { title, detail, authorEmail: session.user.email };
            await fetch(`/api/todos/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            setTitle("");
            setDetail("");
            refreshData();
        } catch (error) {
            console.error(error);
        }
    };

    useKeyPress("Enter", formRef, async () => await createTodo());

    return (
        <div className="createFrom" ref={formRef}>
            <Form onSubmit={createTodo}>
                <TextInput placeholder="Enter a Title ..." value={title} onChangeHandler={setTitle} />
                <TextInput placeholder="Enter details ..." value={detail} onChangeHandler={setDetail} />
            </Form>
        </div>
    );
};

export default CreateForm;
