// background.js
import axios from 'axios';
import { getProxyUrl } from './utils';

const proxyUrl = 'https://luxury-salmiakki-597e62.netlify.app/api/index';
const QUALITY = 5;

// تحديث معلمات الطلب بناءً على متطلبات الخادم
function buildProxyUrl(imageUrl) {
    return `${proxyUrl}?jpg=0&l=10&bw=0&url=${encodeURIComponent(imageUrl)}&quality=${QUALITY}&grayscale=false`;
}

// اعتراض طلبات الصور
chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        const url = details.url;
        if (/\.(jpg|jpeg|png|gif|webp)$/i.test(url)) {
            return { redirectUrl: buildProxyUrl(url) };
        }
    },
    { urls: ['<all_urls>'], types: ['image'] },
    ['blocking']
);

// معالجة الأخطاء
chrome.webRequest.onErrorOccurred.addListener(
    (details) => {
        console.log('Request error:', details);
    },
    { urls: ['<all_urls>'], types: ['image'] }
);
