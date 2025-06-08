import { CanvasLocal } from './canvasLocal.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

const miCanvas: CanvasLocal = new CanvasLocal(graphics, canvas);

let qrCode: string = 'https://myportfolio.dev/view/project01/';
miCanvas.paint(qrCode);

document.getElementById('qr-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = (document.getElementById('qr-text') as HTMLInputElement).value;
    const errorSpan = document.querySelector('.form-text') as HTMLSpanElement;
    const urlLabel = document.querySelector('.url-label') as HTMLSpanElement;

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
