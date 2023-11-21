import 'animate.css';
import { useState, useEffect } from 'react';

export default function Alert({ message, duration, isShown, setIsShown })     {
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsShown(false);
        }, duration * 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`animate__animated ${ isShown ? 'animate__fadeInRight' : 'animate__fadeOutRight'} bg-[--three] p-5 text-white z-10 top-0 right-0 fixed mt-10 mr-10`}>
            {message}
        </div>
    )
}