import React, { FC, MouseEvent } from "react";

type ReturnComponentProps = {
    onClick: () => void;
}

const ReturnComponent: FC<ReturnComponentProps> = ({ onClick }) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick();
    };

    return (
        <button id="return-btn" onClick={handleClick}>
            Powrót
        </button>
    );
};

export default ReturnComponent;