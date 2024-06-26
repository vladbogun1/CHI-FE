import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TodoApp from './TodoApp';
import reportWebVitals from './reportWebVitals';
import DebugConsole from './DebugConsole';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const redirectToPort = (port: number, path: string) => {
    window.location.href = `http://localhost:${port}${path}`;
}

root.render(
    <React.StrictMode>
        <button
            id="back-btn"
            onClick={() => redirectToPort(8000, '/')}
            className="neomorph-button"
        >Home
        </button>
        <TodoApp/><DebugConsole/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();