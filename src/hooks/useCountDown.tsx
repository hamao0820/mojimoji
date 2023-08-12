import { useEffect, useState } from 'react';

const useCountDown = (initialCount: number, callback: () => void, start: boolean) => {
    const [count, setCount] = useState(initialCount);
    useEffect(() => {
        if (!start) return;
        const timerId = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);
        if (count === 0) callback();
        return () => clearInterval(timerId);
    }, [count, callback, start]);
    return count;
};

export default useCountDown;
