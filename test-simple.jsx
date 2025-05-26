import React from 'react';
import ReactDOM from 'react-dom/client';

function SimpleApp() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>🎉 Test Simple - React fonctionne !</h1>
            <p>Si vous voyez ce message, React fonctionne correctement.</p>
            <p>Timestamp: {new Date().toLocaleString()}</p>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SimpleApp />
    </React.StrictMode>
); 