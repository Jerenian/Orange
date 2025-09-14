import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route  } from "react-router";
import 'reset-css';
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
        </Provider>
    </StrictMode>
)
