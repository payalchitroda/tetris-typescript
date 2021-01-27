import { useEffect } from 'react';
type Function = () => void;

export function useInterval(callback: Function, delay: number) {
    useEffect(() => {
        if (delay === 0) {
            return
            
        }
        const id = setInterval(callback, delay);
        return () => {
            // console.log("clearinterval")
            clearInterval(id);
        };
    });
}
