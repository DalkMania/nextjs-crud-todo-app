const TextAreaInput = ({ placeholder, value, onChangeHandler }) => {
    return (
        <div className="w-full flex items-center justify-start">
            <textarea
                rows="3"
                className="resize-none flex flex-row flex-1 border-none text-xs sm:text-base bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-0 px-0"
                placeholder={placeholder}
                value={value}
                onChange={(event) => onChangeHandler(event.target.value)}
            ></textarea>
        </div>
    );
};

export default TextAreaInput;
