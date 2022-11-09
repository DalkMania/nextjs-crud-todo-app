import { useState, Fragment } from "react";
import CrossIcon from "./icons/cross";
import PenIcon from "./icons/pen";
import MagnifyingGlass from "./icons/magnify-glass";
import EditForm from "./forms/edit-form";
import Checkbox from "./inputs/checkbox";

export default function Todo({ todo, refreshData }) {
    const [updating, setUpdating] = useState(false);
    const [detailView, setDetailView] = useState(false);

    const deleteTodoFromList = async (event) => {
        event.preventDefault();

        try {
            const body = { id: todo.id, action: "DELETE_ONE" };
            await fetch(`/api/todos/delete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            refreshData();
        } catch (error) {
            console.log(error);
        }
    };

    const updateCompleted = async (event) => {
        event.preventDefault();

        try {
            const body = { id: todo.id, title: todo.title, detail: todo.detail, completed: !todo.completed };
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

    const ButtonGroup = () => {
        return (
            <Fragment>
                <button
                    aria-label="View Todo"
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setDetailView(!detailView)}
                >
                    <MagnifyingGlass />
                </button>
                <button
                    aria-label="Edit Todo"
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setUpdating(!updating)}
                >
                    <PenIcon />
                </button>
                <button
                    aria-label="Delete Todo"
                    className="focus:outline-none"
                    type="button"
                    onClick={deleteTodoFromList}
                >
                    <CrossIcon />
                </button>
            </Fragment>
        );
    };

    return (
        <Fragment>
            {updating ? (
                <EditForm todo={todo} updateSetter={setUpdating} refreshData={refreshData} />
            ) : (
                <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm py-4 px-6 border-b dark:border-gray-700">
                    <div className="flex justify-between space-x-3">
                        <Checkbox completed={todo.completed} toggleCompleted={updateCompleted} />
                        <p
                            className={`flex-1 text-sm text-gray-900 dark:text-gray-100 ${
                                todo.completed && "line-through text-gray-400 dark:text-gray-500"
                            }`}
                        >
                            {todo.title}
                        </p>
                        <ButtonGroup />
                    </div>
                    {detailView && (
                        <div className="flex justify-between space-x-3 mt-3">
                            <p className={`flex-1 text-xs sm:text-base text-gray-900 dark:text-gray-100`}>
                                {todo.detail !== "" ? todo.detail : "No details entered ..."}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </Fragment>
    );
}
