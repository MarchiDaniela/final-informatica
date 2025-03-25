// Variables iniciales
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let aciertos = 0;
let movimientos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoid = null;

// Reflejar en el HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

// Generación de imágenes aleatorias
let imagenes = [
    'img/imgjuego1.png', 'img/imgjuego1.png', 
    'img/imgjuego2.png', 'img/imgjuego2.png',
    'img/imgjuego3.png', 'img/imgjuego3.png', 
    'img/imgjuego4.png', 'img/imgjuego4.png',
    'img/imgjuego5.png', 'img/imgjuego5.png', 
    'img/imgjuego6.png', 'img/imgjuego6.png',
    'img/imgjuego7.png', 'img/imgjuego7.png', 
    'img/imgjuego8.png', 'img/imgjuego8.png'
];

// Barajar las imágenes
imagenes = imagenes.sort(() => Math.random() - 0.5);
console.log(imagenes);

// Funciones
function contarTiempo() {
    tiempoRegresivoid = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo Restante: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoid);
            bloquearTarjetas();
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="${imagenes[i]}">`;
        tarjetaBloqueada.disabled = true;
    }
}

function destapar(id) {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    if (tarjetasDestapadas === 1) {
        // Mostrar primera imagen
        tarjeta1 = document.getElementById(id);
        primerResultado = imagenes[id];
        tarjeta1.innerHTML = `<img src="${primerResultado}">`;
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas === 2) {
        // Mostrar segunda imagen
        tarjeta2 = document.getElementById(id);
        segundoResultado = imagenes[id];
        tarjeta2.innerHTML = `<img src="${segundoResultado}">`;
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            // Resetear contador
            tarjetasDestapadas = 0;

            // Mostrar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            // Deshabilitar si se han realizado todos los aciertos posibles
            if (aciertos == 8) {
                clearInterval(tiempoRegresivoid); // Parar el tiempo si ya ganó
                // Mostrar aciertos y mensaje de felicitación
                mostrarAciertos.innerHTML = `¡Felicitaciones! Tuviste todos estos aciertos: ${aciertos}`;
                mostrarMovimientos.innerHTML = `Ganaste con todos estos movimientos: ${movimientos}`;
                mostrarTiempo.innerHTML = `¡Genial! Solo te tomó: ${timerInicial - timer} segundos`;
            }
        } else {
            // Volver a mostrar valores y tapar
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}

// Crear el tablero del juego
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    for (let i = 0; i <= 15; i++) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('id', i);
        cardElement.addEventListener('click', () => destapar(i));
        gameBoard.appendChild(cardElement);
    }
}

document.addEventListener('DOMContentLoaded', createBoard);
