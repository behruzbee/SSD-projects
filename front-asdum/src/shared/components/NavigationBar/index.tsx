import cx from 'classnames';
import {useRef} from 'react';
import React from 'react';
import {useLocation, useMatch} from 'react-router-dom';

import {SubRoutesType} from '@models/routing_model';
import useWindowWidth from '@shared/hooks/useWindowWidth';

import {Container, Link} from './style';

interface Props {
    list?: SubRoutesType[];
    margin?: string;
    padding?: string;
    vertical?: boolean;
}

const NavigationBar = ({list, margin, padding, vertical}: Props) => {
    const parentRef = useRef<null | HTMLDivElement>(null);
    const linkRef = useRef<null | Map<number, any>>(null);
    const resolved = useLocation();
    const match = useMatch({path: resolved.pathname, end: true});
    const {width} = useWindowWidth();
    const handleClick = (e: any, index: number) => {
        const map = getMap();
        const node = map.get(index);
        node?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: width > 600 ? 'nearest' : 'center',
        });
    };

    const getMap = () => {
        if (!linkRef.current) {
            linkRef.current = new Map();
        }
        return linkRef.current;
    };

    return (
        <Container
            ref={parentRef}
            vertical={vertical}
            listlength={list?.length}
            margin={margin}
            padding={padding}
        >
            {list?.map((v, index: number) => {
                if (v.permission) {
                    return (
                        <Link
                            ref={(node) => {
                                const map = getMap();
                                if (node) {
                                    map.set(index, node);
                                } else map.delete(index);
                            }}
                            key={index}
                            onClick={(e: any) => handleClick(e, index)}
                            to={`${v.path}`}
                            className={cx([
                                match?.pathname === v.path
                                    ? 'activeStyle'
                                    : 'inactiveStyle',
                            ])}
                        >
                            {v.text}
                        </Link>
                    );
                }

                return null;
            })}
        </Container>
    );
};

export default React.memo(NavigationBar);
