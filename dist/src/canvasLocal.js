// Este archivo contiene la clase CanvasLocal, que se utiliza para dibujar un código QR en un lienzo HTML5.
// La clase incluye métodos para dibujar líneas, píxeles, cuadrados grandes y pequeños, y para rellenar una matriz
// con datos codificados en binario. También incluye lógica para manejar espacios en blanco, líneas de error y 
// patrones de alineación en el código QR. Finalmente, el método paint genera el código QR completo basado en una URL proporcionada.
export class CanvasLocal {
    // Constructor
    constructor(graphics, canvas) {
        this.graphics = graphics;
        this.rWidth = 25;
        this.rHeight = 25;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = 0;
        this.centerY = 0;
        this.matrix = Array.from({ length: 25 }, () => Array(25).fill(-2));
    }
    //este método se encarga de convertir las coordenadas x del canvas a las coordenadas del código QR.
    toCanvasX(x) {
        return Math.round(this.centerX + x / this.pixelSize);
    }
    //este método se encarga de convertir las coordenadas y del canvas a las coordenadas del código QR.
    toCanvasY(y) {
        return Math.round(this.centerY + y / this.pixelSize);
    }
    //este método se encarga de dibujar una línea en el canvas.
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    //este método se encarga de dibujar un píxel en el canvas.
    drawPixel(x, y) {
        const pixelSize = this.toCanvasX(1) - this.toCanvasX(0);
        this.graphics.fillRect(this.toCanvasX(x), this.toCanvasY(y), pixelSize + 1, pixelSize + 1);
    }
    //este método se encarga de dibujar un cuadrado grande en el código QR.
    drawSquare(x, y) {
        this.graphics.fillStyle = "black";
        for (let i = 0; i < 7; i++) {
            this.matrix[x - i][y] = 1;
            this.matrix[x - i][y + 6] = 1;
            this.matrix[x][y + i] = 1;
            this.matrix[x - 6][y + i] = 1;
        }
        for (let i = 0; i < 3; i++) {
            this.matrix[x - 2 - i][y + 2] = 1;
            this.matrix[x - 2 - i][y + 4] = 1;
        }
        this.matrix[x - 2][y + 3] = 1;
        this.matrix[x - 3][y + 3] = 1;
        this.matrix[x - 4][y + 3] = 1;
    }
    //este método se encarga de dibujar los espacios en blanco del código QR.
    drawWhiteSpaces() {
        this.graphics.fillStyle = "white";
        for (let i = 0; i < 8; i++) {
            this.matrix[i][7] = 0;
            this.matrix[i][this.rWidth - 8] = 0;
            this.matrix[7][i] = 0;
            this.matrix[this.rWidth - 8 + i][7] = 0;
            this.matrix[this.rWidth - 8][i] = 0;
            this.matrix[7][this.rWidth - 8 + i] = 0;
        }
        for (let i = 1; i < 6; i++) {
            this.matrix[1][i] = 0;
            this.matrix[5][i] = 0;
            this.matrix[i][1] = 0;
            this.matrix[i][5] = 0;
        }
        for (let i = 1; i < 6; i++) {
            this.matrix[this.rWidth - 6][i] = 0;
            this.matrix[this.rWidth - 2][i] = 0;
            this.matrix[this.rWidth - 7 + i][1] = 0;
            this.matrix[this.rWidth - 7 + i][5] = 0;
        }
        for (let i = 1; i < 6; i++) {
            this.matrix[1][this.rWidth - 1 - i] = 0;
            this.matrix[5][this.rWidth - 1 - i] = 0;
            this.matrix[i][this.rWidth - 2] = 0;
            this.matrix[i][this.rWidth - 6] = 0;
        }
        this.graphics.fillStyle = "black";
        this.matrix[this.rWidth - 8][7] = 1;
    }
    //este método se encarga de dibujar un cuadrado pequeño en el código QR.
    drawSmallSquare(x, y) {
        for (let i = 0; i < 5; i++) {
            this.matrix[x - i][y] = 1;
            this.matrix[x - i][y + 4] = 1;
        }
        for (let i = 0; i < 5; i++) {
            this.matrix[x][y + i] = 1;
            this.matrix[x - 4][y + i] = 1;
        }
        this.graphics.fillStyle = "white";
        for (let i = 1; i < 4; i++) {
            this.matrix[x - i][y + 1] = 0;
            this.matrix[x - i][y + 3] = 0;
        }
        for (let i = 1; i < 4; i++) {
            this.matrix[x - 1][y + i] = 0;
            this.matrix[x - 3][y + i] = 0;
        }
        this.graphics.fillStyle = "black";
        this.matrix[x - 2][y + 2] = 1;
    }
    //este método se encarga de dibujar las líneas del código QR.
    drawLines(z) {
        let toggle = true;
        for (let i = 0; i < 9; i++) {
            if (z === 1) {
                this.matrix[this.rWidth - 9 - i][6] = 0;
            }
            if (toggle) {
                if (z !== 1) {
                    this.matrix[this.rWidth - 9 - i][6] = 1;
                }
                toggle = false;
            }
            else {
                toggle = true;
            }
        }
        toggle = true;
        for (let i = 0; i < 9; i++) {
            if (z === 1) {
                this.matrix[6][this.rWidth - 9 - i] = 0;
            }
            if (toggle) {
                if (z !== 1) {
                    this.matrix[6][this.rWidth - 9 - i] = 1;
                }
                toggle = false;
            }
            else {
                toggle = true;
            }
        }
    }
    //este método se encarga de dibujar las líneas de error en el código QR.
    drawErrorLines() {
        for (let i = this.rWidth - 1; i > this.rWidth - 9; i--) {
            this.matrix[8][i] = 0;
            this.matrix[i][8] = 0;
        }
        for (let i = 0; i < 9; i++) {
            if (this.matrix[8][i] !== 1) {
                this.matrix[8][i] = 0;
            }
            if (this.matrix[i][8] !== 1) {
                this.matrix[i][8] = 0;
            }
        }
    }
    //este método se encarga de rellenar la matriz con los datos del código QR.
    fillMatrixWithData(data) {
        let index = 0;
        let maxX = this.rWidth - 1;
        let maxY = this.rWidth - 1;
        let direction = true;
        while (index < data.length) {
            if (direction) {
                for (let i = maxY; i >= 0; i--) {
                    for (let j = maxX; j > maxX - 2; j--) {
                        if (this.matrix[i][j] !== 0 && this.matrix[i][j] !== 1 && index < data.length) {
                            this.matrix[i][j] = parseInt(data[index]);
                            index++;
                        }
                    }
                    if (i === 0) {
                        maxY = 0;
                        direction = false;
                    }
                }
                maxX -= 2;
            }
            else {
                for (let i = maxY; i < this.rWidth; i++) {
                    for (let j = maxX; j > maxX - 2; j--) {
                        if (this.matrix[i][j] !== 0 && this.matrix[i][j] !== 1 && index < data.length) {
                            this.matrix[i][j] = parseInt(data[index]);
                            index++;
                        }
                    }
                    if (i === this.rWidth - 1) {
                        direction = true;
                        maxY = this.rWidth - 1;
                    }
                }
                maxX -= 2;
            }
        }
    }
    //este método se encarga de convertir el texto a binario.
    textToBinary(text) {
        return text
            .split('')
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join('');
    }
    //este método se encarga de rellenar el canvas con los píxeles del código QR.
    fillCanvas() {
        for (let i = 0; i < this.rWidth; i++) {
            for (let j = 0; j < this.rWidth; j++) {
                if (this.matrix[i][j] === 1) {
                    this.graphics.fillStyle = "black";
                    this.drawPixel(j, i);
                }
            }
        }
    }
    // Agrega el método limpiar
    clear() {
        // Clears the canvas
        this.graphics.clearRect(0, 0, this.maxX + 1, this.maxY + 1);
        // Resets the matrix
        this.matrix = Array.from({ length: 25 }, () => Array(25).fill(-2));
    }
    /**este método se encarga de pintar el código QR en el canvas. */
    paint(url) {
        this.clear(); // Limpia el lienzo antes de pintar
        this.drawLine(this.toCanvasX(0), this.toCanvasY(0), this.toCanvasX(25), this.toCanvasY(0));
        const sizeX = this.rWidth;
        const sizeY = this.rWidth;
        this.graphics.fillStyle = "black";
        for (let x = 0; x <= sizeX; x++) {
            this.drawLine(this.toCanvasX(x), this.toCanvasY(0), this.toCanvasX(x), this.toCanvasY(sizeX));
        }
        for (let y = 0; y <= sizeY; y++) {
            this.drawLine(this.toCanvasX(0), this.toCanvasY(y), this.toCanvasX(sizeY), this.toCanvasY(y));
        }
        const config = "0100";
        const binaryData = this.textToBinary(url);
        const lengthBinary = url.length.toString(2).padStart(8, '0');
        const finalData = config + lengthBinary + binaryData + "0000";
        this.drawSquare(6, 0);
        this.drawSquare(24, 0);
        this.drawSquare(6, 18);
        this.drawSmallSquare(20, 16);
        this.drawLines(1);
        this.drawWhiteSpaces();
        this.drawErrorLines();
        this.drawLines(2);
        this.fillMatrixWithData(finalData);
        this.fillCanvas();
        console.log(finalData);
        console.log(this.matrix);
    }
}
