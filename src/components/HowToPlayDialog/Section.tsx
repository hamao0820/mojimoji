import { FC, ReactNode } from 'react';
import { content, header, indexClass, section, titleClass } from './Section.css';

type Props = {
    index: number;
    title: string;
    children: ReactNode;
};

const Section: FC<Props> = ({ index, title, children }) => {
    return (
        <div className={section}>
            <div className={header}>
                <div className={indexClass}>{index}. </div>
                <div className={titleClass}>{title}</div>
            </div>
            <div className={content}>{children}</div>
        </div>
    );
};

export default Section;
