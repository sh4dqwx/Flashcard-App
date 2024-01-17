import React, { FC } from "react";

interface ComponentProps {
    title: string
}

const TitleComponent: FC<ComponentProps> = ({ title }) => {

    return (
        <h1>{title}</h1>
    );
};

export default TitleComponent;