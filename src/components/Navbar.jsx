import React from 'react';
import { Menubar } from 'primereact/menubar';
import logo from '../assets/logo.png'; // kendi logonu koyman için

export default function Navbar() {
    const start = (
        <img
            alt="logo"
            src={logo}
            height="40"
            className="mr-2"
            style={{ borderRadius: '8px' }}
        />
    );

    const end = <span style={{ fontWeight: 'bold', color: '#1e40af' }}>Trafik Tanıma Sistemi</span>;

    return (
        <div
            className="custom-navbar"
            style={{
                position: 'fixed',      // sabit üstte kalsın
                top: 0,
                left: 0,
                width: '100%',          // ekranın tamamını kaplasın
                zIndex: 1000,
                backgroundColor: '#f1f5f9',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '0.5rem 1.5rem',
                boxSizing: 'border-box'
            }}
        >
            <Menubar start={start} end={end} />
        </div>
    );

}
