import '@styles/styles.scss';

import {ErrorBoundary} from '@widgets/error-boundary';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {ToastContainer} from 'react-toastify';

import App from '@src/app/app';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <ErrorBoundary>
        <App />
        <ToastContainer limit={2} />
    </ErrorBoundary>,
);
