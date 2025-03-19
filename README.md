
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Animación Matrix</title>
  <style>
    body {
      background-color: black;
      color: #00ff00;
      font-family: 'Courier New', Courier, monospace;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    .code {
      position: absolute;
      top: -50px;
      animation: fall 5s infinite linear;
      opacity: 0;
    }
    @keyframes fall {
      0% {
        top: -50px;
        opacity: 1;
      }
      100% {
        top: 100vh;
        opacity: 0;
      }
    }
  </style>
</head>
<body>
  <div id="matrix"></div>

  <script>
    const matrix = document.getElementById('matrix');

    function createCode() {
      const code = document.createElement('div');
      code.classList.add('code');
      code.textContent = Math.random().toString(36).substring(2, 15);
      code.style.left = Math.random() * window.innerWidth + 'px';
      matrix.appendChild(code);
      setTimeout(() => code.remove(), 5000);
    }

    setInterval(createCode, 100);
  </script>
</body>
</html>
