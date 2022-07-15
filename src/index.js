// 1ero: Paquetes de terceros
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import './assets/styles/fonts.css'; // fonts
// import './assets/styles/flatpickr.css'; // flatpickr
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 2do: Paquetes de mi propio proyecto

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
