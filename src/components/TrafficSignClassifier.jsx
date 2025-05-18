import React, { useState, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ProgressBar } from 'primereact/progressbar';

const sampleImages = [
    { label: 'Ornek_1', path: '/samples/12218.png'},
    { label: 'Ornek_2', path: '/samples/12224.png' },
    { label: 'Ornek_3', path: '/samples/12610.png' }
];

export default function TrafficSignClassifier() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [visible, setVisible] = useState(false);

    const uploadRef = useRef(null); // FileUpload için referans

    const handlePredict = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);

        const response = await fetch("http://localhost:8000/predict", {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        setResult(data);
        console.log("Tahmin sonucu:", data);
        setLoading(false);

        // FileUpload bileşenini temizle
        if (uploadRef.current) {
            uploadRef.current.clear();
        }
    };

    const handleUpload = ({ files }) => {
        setSelectedImage(URL.createObjectURL(files[0]));
        handlePredict(files[0]);
    };

    const handleSampleClick = (sample) => {
        fetch(sample.path)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], sample.label, { type: blob.type });
                setSelectedImage(URL.createObjectURL(blob));
                handlePredict(file);
            });
    };

    const customCardStyle = {
        flex: '1 1 40%',
        minWidth: '600px',
        maxWidth: '650px',
        backgroundColor: '#ffffff',
        border: '5px solid #e0e7ff',
        borderRadius: '16px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
        padding: '2rem',
        boxSizing: 'border-box',
    };

    return (
        <div style={{ padding: '10rem', margin: '0 auto', width: '100%' }}>
            <div
                style={{
                    width: '100%',
                    padding: '1rem 9rem',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '4rem',
                }}
            >
                {/* Kart 1 */}
                <div style={customCardStyle}>
                    <h3 style={headerStyle}>📤 Trafik İşareti Yükle</h3>
                    <FileUpload
                        ref={uploadRef}
                        mode="basic"
                        name="file"
                        accept="image/*"
                        customUpload
                        uploadHandler={handleUpload}
                        chooseLabel="Resim Seç"
                    />
                    <div style={{ marginTop: '1.5rem' }}>
                        <h5>Veya Örneklerden Seç:</h5>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                            {sampleImages.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img.path}
                                    alt={img.label}
                                    onClick={() => handleSampleClick(img)}
                                    style={imageStyle}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                        e.currentTarget.style.borderColor = '#2563eb';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.borderColor = 'transparent';
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Kart 2 */}
                <div style={customCardStyle}>
                    <h3 style={headerStyle}>✅ Tahmin Sonucu</h3>

                    {loading && <ProgressBar mode="indeterminate" style={{ height: '6px' }} />}
                    {selectedImage && (
                        <div style={{ marginTop: '1rem' }}>
                            <img src={selectedImage} alt="Tahmin edilen" width="150" />
                        </div>
                    )}
                    {result && (
                        <div style={{ marginTop: '1rem' }}>
                            <h3 style={{ color: '#4CAF50' }}>{result.label}</h3>
                            <p>Güven: <strong>%{result.confidence}</strong></p>
                            <Button
                                label="Detaylar"
                                icon="pi pi-info-circle"
                                style={{
                                    backgroundColor: '#2563eb',
                                    border: 'none',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                }}
                                onClick={() => setVisible(true)}
                            />
                        </div>
                    )}
                </div>

                {/* Dialog */}
                <Dialog
                    header="Tahmin Detayları"
                    visible={visible}
                    style={{ width: '30vw' }}
                    onHide={() => setVisible(false)}
                >
                    {result && (
                        <>
                            <p><strong>İşaret:</strong> {result.label}</p>
                            <p><strong>Tahmin Güveni:</strong> %{result.confidence}</p>
                            <p><strong>Açıklama:</strong> {result.label} tabelası trafik güvenliği açısından önemli bir işarettir.</p>
                        </>
                    )}
                </Dialog>
            </div>
        </div>
    );
}

const headerStyle = {
    color: '#1e3a8a',
    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
    fontWeight: 'bold',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
};

const imageStyle = {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '2px solid transparent',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer'
};
