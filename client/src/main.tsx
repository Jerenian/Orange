import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter  } from "react-router";
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import 'reset-css'
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
        </Provider>
    </StrictMode>/// тайп ид не переносится при создании продукта
)
