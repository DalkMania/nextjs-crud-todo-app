import { useState } from "react";
import Form from "./form";
import TextInput from "../inputs/text-input";
import TextAreaInput from "../inputs/textarea-input";
import Checkbox from "../inputs/checkbox";

const EditForm = ({ todo, updateSetter, refreshData }) => {
    const [title, setTitle] = useState(todo.title);
    const [detail, setDetail] = useState(todo.detail);
    const [completed, setCompleted] = useState(todo.completed);

    const editTodo = async (event) => {
        event.preventDefault();
        try {
            const body = { id: todo.id, title, detail, completed };
            await fetch(`/api/todos/update`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            refreshData();
            updateSetter(false);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleCompleted = () => {
        setCompleted(!todo.completed);
    };

    return (
        <Form onSubmit={editTodo}>
            <TextInput placeholder="Enter a Title ..." value={title} onChangeHandler={setTitle} />
            <TextAreaInput placeholder="Enter details ..." value={detail} onChangeHandler={setDetail} />
            <div className={`flex text-xs sm:text-base text-gray-900 dark:text-gray-100 pb-2 justify-between`}>
                <div className="flex">
                    <p className="mr-2">Completed ?</p>
                    <Checkbox completed={completed} toggleCompleted={toggleCompleted} />
                </div>
                <button type="submit">Submit Changes</button>
            </div>
        </Form>
    );
};

export default EditForm;
