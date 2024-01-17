import React, { FC, MouseEvent } from "react";

interface ComponentProps {
    formId: string;
    onCancelClick: () => void;
}

const DialogButtonsComponent: FC<ComponentProps> = ({ formId, onCancelClick }) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onCancelClick();
    };

    return (
        <>
            <button type="submit" form={formId}>Zatwierdź</button>
            <button onClick={handleClick}>Anuluj</button>
        </>
    );
};

export default DialogButtonsComponent;