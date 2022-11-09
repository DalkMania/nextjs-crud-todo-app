const TextInput = ({ placeholder, value, onChangeHandler }) => {
    return (
        <div className="w-full flex items-center justify-start">
            <input
                type="text"
                className="flex flex-row flex-1 border-none text-xs sm:text-base bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-0 px-0"
                placeholder={placeholder}
                value={value}
                required
                onChange={(event) => onChangeHandler(event.target.value)}
            />
        </div>
    );
};

export default TextInput;
