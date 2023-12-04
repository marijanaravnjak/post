import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './components/app/store'
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename='post'>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
