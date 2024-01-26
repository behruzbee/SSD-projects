import React, {ReactNode} from 'react';

import {ErrorComponent} from '@components/error-component';

interface IErrorBoundaryProps {
    children: ReactNode;
}
interface IErrorBoundaryState {
    hasError: boolean;
}
export class ErrorBoundary extends React.Component<
    IErrorBoundaryProps,
    IErrorBoundaryState
> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    render() {
        const {hasError} = this.state;
        const {children} = this.props;
        if (hasError) {
            return <ErrorComponent />;
        }

        return children;
    }
}
