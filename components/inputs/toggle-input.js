const ToggleInput = ({ disabled, completed, label, onChangeHandler }) => {
    return (
        <label for="checked-toggle" className="inline-flex relative items-center cursor-pointer">
            <input
                type="checkbox"
                id="checked-toggle"
                className="sr-only peer"
                disabled={disabled}
                checked={completed}
                onChange={onChangeHandler}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
        </label>
    );
};

export default ToggleInput;
