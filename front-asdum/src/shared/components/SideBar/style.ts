import styled from '@emotion/styled';

interface IProps {
    isOpen: boolean;
    maxWidth?: string;
    topInner?: boolean;
}

export const Wrapper = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    top: ${(props: IProps) => (props.topInner ? '56px' : 0)};
    max-width: ${({maxWidth}: IProps) => maxWidth || '320px'};
    width: 100%;
    height: ${(props: IProps) => (!props.topInner ? '100%' : 'auto')};
    background-color: #ffffff;
    z-index: 1000;
    transition: 200ms all;
    transform: ${(props: IProps) =>
        props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
`;
