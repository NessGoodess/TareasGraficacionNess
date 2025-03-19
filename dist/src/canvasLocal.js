export class CanvasLocal {
    constructor(g, canvas) {
        this.graphics = g;
        this.rWidth = 6;
        this.rHeight = 4;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / 2;
        this.centerY = this.maxY / 2;
    }
    iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
    iY(y) { return Math.round(this.centerY - y / this.pixelSize); }
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    /*fx(x:number):number {
      return Math.sin(x*2.5);
    }*/
      paint() {
        // Dibujar un cuadrado inicial de 400x400 píxeles
        this.drawLine(100, 100, 500, 100);  // Línea superior
        this.drawLine(500, 100, 500, 500);  // Línea derecha
        this.drawLine(500, 500, 100, 500);  // Línea inferior
        this.drawLine(100, 500, 100, 100);  // Línea izquierda
    
        // Definición de parámetros iniciales
        let lado = 400;   // Tamaño del lado del cuadrado
        let p = 0.95;     // Proporción para reducir el tamaño del cuadrado en cada iteración
        let q = 1 - p;    // Complemento de la proporción
    
        // Coordenadas de los vértices del cuadrado
        let xA = 100, yA = 100;          // Esquina superior izquierda
        let xB = xA + lado, yB = yA;     // Esquina superior derecha
        let xC = xB, yC = yB + lado;     // Esquina inferior derecha
        let xD = xA, yD = yA + lado;     // Esquina inferior izquierda
    
        // Bucle para realizar 30 iteraciones y reducir el tamaño del cuadrado
        for (let i = 0; i < 30; i++) {
            // Dibujar el cuadrado en la iteración actual
            this.drawLine(xA, yA, xB, yB); // Lado superior
            this.drawLine(xB, yB, xC, yC); // Lado derecho
            this.drawLine(xC, yC, xD, yD); // Lado inferior
            this.drawLine(xD, yD, xA, yA); // Lado izquierdo
    
            // Calcular las nuevas posiciones de los vértices, reduciendo el tamaño
            let xA1 = p * xA + q * xB;
            let yA1 = p * yA + q * yB;
            let xB1 = p * xB + q * xC;
            let yB1 = p * yB + q * yC;
            let xC1 = p * xC + q * xD;
            let yC1 = p * yC + q * yD;
            let xD1 = p * xD + q * xA;
            let yD1 = p * yD + q * yA;
    
            // Actualizar las coordenadas de los vértices para la siguiente iteración
            xA = xA1;
            yA = yA1;
            xB = xB1;
            yB = yB1;
            xC = xC1;
            yC = yC1;
            xD = xD1;
            yD = yD1;
        }
    }
    
}
