import cx from 'classnames';
import React, {FC, ReactNode} from 'react';

interface ITFooter {
    totalSumArr: Array<number>;
    text: string | ReactNode;
}
const TFooter: FC<ITFooter> = ({totalSumArr, text}) => {
    return (
        <tr className={cx('tableFooter', 'rc-table-tfooter')}>
            <th>{text}</th>
            {totalSumArr.map((item, index) => {
                return <th key={index}>{item}</th>;
            })}
        </tr>
    );
};

export default TFooter;
