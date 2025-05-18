import React from 'react';
import TrafficSignClassifier from './components/TrafficSignClassifier';
import Navbar from './components/Navbar';

import './App.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
    return (
        <>
            <Navbar />
            <div className="app-wrapper" style={{ paddingTop: '70px' }}>
                <h1
                    className="app-title"
                    style={{
                        textAlign: 'center',
                        marginTop: '5rem',
                        fontSize: 'clamp(2rem, 4vw, 2rem)',
                        color: '#1e293b',
                    }}
                >
                    🚦 Trafik İşareti Tanıma Uygulaması
                </h1>
                <TrafficSignClassifier />
            </div>
        </>
    );
}

export default App;
