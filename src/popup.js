// popup.js
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Form, Button } from 'semantic-ui-react';

const Popup = () => {
    const [proxyUrl, setProxyUrl] = useState('https://luxury-salmiakki-597e62.netlify.app/api/index');

    useEffect(() => {
        // تحميل الإعدادات المحفوظة
        chrome.storage.sync.get(['proxyUrl'], (result) => {
            if (result.proxyUrl) {
                setProxyUrl(result.proxyUrl);
            }
        });
    }, []);

    const handleSave = () => {
        chrome.storage.sync.set({ proxyUrl }, () => {
            alert('Settings saved!');
        });
    };

    return (
        <Container style={{ padding: '20px', width: '300px' }}>
            <h2>Bandwidth Hero</h2>
            <Form>
                <Form.Field>
                    <label>Data Compression Service URL</label>
                    <input
                        value={proxyUrl}
                        onChange={(e) => setProxyUrl(e.target.value)}
                        placeholder="Enter proxy URL"
                    />
                </Form.Field>
                <Button primary onClick={handleSave}>Save</Button>
            </Form>
        </Container>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Popup />} />
        </Routes>
    </Router>
);
