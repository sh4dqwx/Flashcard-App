import React, { FC, MouseEvent } from "react";

type ComponentProps = {
    onClick: () => void;
}

const LogoutComponent: FC<ComponentProps> = ({ onClick }) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick();
    };

    return (
        <button id="logout-btn" onClick={handleClick}>
            Wyloguj
        </button>
    );
};

export default LogoutComponent;