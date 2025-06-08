var _a;
import { CanvasLocal } from './canvasLocal.js';
let canvas;
let graphics;
canvas = document.getElementById('circlechart');
graphics = canvas.getContext('2d');
const miCanvas = new CanvasLocal(graphics, canvas);
let qrCode = 'https://myportfolio.dev/view/project01/';
miCanvas.paint(qrCode);
(_a = document.getElementById('qr-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('qr-text').value;
    const errorSpan = document.querySelector('.form-text');
    const urlLabel = document.querySelector('.url-label');
    if (input.length > 38) {
        errorSpan.textContent = 'El texto no puede superar los 38 caracteres.';
        errorSpan.style.color = 'red';
        errorSpan.style.fontWeight = 'bold';
        let visible = true;
        const blinkInterval = setInterval(() => {
            errorSpan.style.visibility = visible ? 'visible' : 'hidden';
            visible = !visible;
        }, 500);
        setTimeout(() => {
            clearInterval(blinkInterval);
            errorSpan.style.visibility = 'visible';
        }, 3000);
        return;
    }
    // Limpiar mensaje de error si no hay problema
    errorSpan.textContent = 'No mayor a 38 caracteres';
    errorSpan.style.color = '';
    urlLabel.textContent = `URL: ${input}`;
    miCanvas.paint(input);
});
