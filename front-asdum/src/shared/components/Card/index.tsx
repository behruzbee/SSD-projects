import React, {FC, ReactElement} from 'react';

type CardProps = {
    children: ReactElement;
    title: string;
    cardOperations?: Array<ReactElement>;
    onClick?: () => void;
};
export const Card: FC<CardProps> = ({
    children,
    title,
    cardOperations,
    onClick,
}) => {
    return (
        <div onClick={onClick} className="card__btn">
            <div className="card__wrapper">
                <div className="card__header">
                    <h4>{title}</h4>
                    <div
                        className="card__operations"
                        style={{display: 'flex', alignItems: 'center'}}
                    >
                        {cardOperations &&
                            cardOperations.map((component, i) => (
                                <div key={i}>{component}</div>
                            ))}
                    </div>
                </div>
                <div className="card__body">{children}</div>
            </div>
        </div>
    );
};
