import { useEffect } from "react";

const useKeyPress = (key, ref = null, action) => {
    useEffect(() => {
        const element = ref?.current ? ref.current : window;
        function onKeyDown(e) {
            if (e.key === key) {
                e.preventDefault();
                action();
            }
        }
        element.addEventListener("keydown", onKeyDown);
        return () => element.removeEventListener("keydown", onKeyDown);
    });
};

export default useKeyPress;
