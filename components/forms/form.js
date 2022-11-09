const Form = ({ onSubmit, children }) => {
    return (
        <form
            className="w-full flex flex-col bg-white dark:bg-gray-800 rounded-md max-w-md mx-auto px-6 my-2"
            onSubmit={onSubmit}
        >
            {children}
        </form>
    );
};

export default Form;
