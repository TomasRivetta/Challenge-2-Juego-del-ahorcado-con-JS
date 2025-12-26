//FUNCION OCULTAR Y MOSTRAR

function mostrar() {
    document.getElementById("mostrarJuego").style.display = "flex";
}

function ocultar() {
    document.getElementById("contenedorBotones").style.display = "none";

}

//FUNCION: CREAR PALABRA SECRETA

const palabras = [
    "HTML",
    "CSS",
    "PYTHON",
    "SQL",
    "REDUX",
    "REACTJS",
    "NODEJS",
    "MYSQL",
    "JAVA",
    "ALURA",
    "ORACLE",
    "ONE",
    "MOUSE",
    "ANGULAR",
    "SLACK",
    "DISCORD",
    "UNITY",
    "CSHARP",
    "DATABASE",
];

let palabraAleatoria;
let letrasCorrectas = [];
let letrasErrada = [];
let intentos = 0;
let contador = 0;
let intentoErrores = 0;
let contadorRendirme = 0;
let movimiento = 50;

function crearPalabraSecreta() {
    palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    guionesPalabra(palabraAleatoria);

    console.log(palabraAleatoria);

    intentos = 0;
    contador = 0;
    intentoErrores = 0;
    contadorRendirme = 1;
    movimiento = 20;
    letrasCorrectas = [];
    letrasErrada = [];
    
    dibujarHorca();
}

//FUNCION: MOSTRAR GUIONES PARA NUESTRA PALABRA SECRETA

var canvas = document.getElementById("micanvas");
var ctx = canvas.getContext("2d");

function guionesPalabra(palabraAleatoria) {
    ctx.fillStyle = "#EEE9DA";
    ctx.font = "40px Roboto Mono";
    ctx.textAlign = "center";
    const espaciado = 35;
    const startX = (canvas.width - (palabraAleatoria.length * espaciado)) / 2 + 15;
    for (var i = 0; i < palabraAleatoria.length; i++) {
        var ejeX = startX + (i * espaciado);
        var ejeY = canvas.height - 20;
        ctx.fillText("_", ejeX, ejeY);
    }
}

// Generar teclado para movil
const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
const mobileKeysContainer = document.querySelector('.botonesParaCelularTablet');

alphabet.split('').forEach(letter => {
    const button = document.createElement('button');
    button.classList.add('botonMobile');
    button.textContent = letter;
    button.value = letter;
    button.onclick = () => {
        if (intentoErrores < 7) {
            dibujarLetra(letter);
        } else {
            swal("Ya se le agotaron los intentos 😢", "Presione 'nuevo juego' para reiniciar el juego", "error");
        }
    };
    mobileKeysContainer.appendChild(button);
});


//FUNCION: VERIFICAR SI LA TECLA PRESIONADA ES UNA LETRA
document.addEventListener("keydown", verificacion);

function verificacion(event) {
    const teclaPresionada = event.key.toUpperCase();

    if (alphabet.includes(teclaPresionada)) {
        if(intentoErrores < 7){
            dibujarLetra(teclaPresionada);
        }
        else{
            swal("Ya se le agotaron los intentos 😢","Presione 'nuevo juego' para reiniciar el juego","error")
        }
    } 
    else if (event.keyCode >= 48 && event.keyCode <= 57) { // numeros
        swal("SOLO SE ACEPTAN LETRAS MAYUSCULAS","","error");
    }
}

//FUNCION: DIBUJAR LETRA
function dibujarLetra(tecla) {
    if (letrasCorrectas.includes(tecla) || letrasErrada.includes(tecla)) {
        console.log("Ya ingreso esa letra");
        return;
    }

    if (palabraAleatoria.includes(tecla)) {
        letrasCorrectas.push(tecla);
        for (let i = 0; i < palabraAleatoria.length; i++) {
            if (tecla === palabraAleatoria[i]) {
                dibujarLetraCorrecta(tecla, i, palabraAleatoria.length);
                verificarGanador();
            }
        }
    } else {
        letrasErrada.push(tecla);
        dibujarLetraIncorrecta(tecla);
    }
}

function dibujarLetraCorrecta(letra, index) {
    ctx.fillStyle = "#EEE9DA";
    ctx.font = "35px Roboto Mono";
    ctx.textAlign = "center";
    const espaciado = 35;
    const startX = (canvas.width - (palabraAleatoria.length * espaciado)) / 2 + 15;
    var ejeX = startX + (index * espaciado);
    ctx.fillText(letra, ejeX, 50);
}

var canvas2 = document.getElementById("mostrarPalabrasUsadas");
var ctx2 = canvas2.getContext("2d");

//FUNCION: DIBUJAR LETRA INCORRECTA
function dibujarLetraIncorrecta(teclaPresionada) {
    ctx2.fillStyle = "#EEE9DA";
    ctx2.font = "30px Roboto Mono";
    ctx2.fillText(teclaPresionada, movimiento, 50);
    movimiento += 35;
    dibujarAhorcado();
    intentoErrores++;
}

//FUNCION: DIBUJAR HORCA
var canvas3 = document.getElementById("miAhorcado");
var ctx3 = canvas3.getContext("2d");

function dibujarAhorcado() {
    intentos++;
    switch(intentos) {
        case 1: dibujarCabeza(); break;
        case 2: dibujarTronco(); break;
        case 3: dibujarBrazoIzquierdo(); break;
        case 4: dibujarBrazoDerecho(); break;
        case 5: dibujarPiernaIzquierda(); break;
        case 6: dibujarPiernaDerecha(); break;
        case 7: dibujarFinDelJuego(); break;
    }
}

function dibujarHorca() {
    ctx3.strokeStyle = "#EEE9DA";
    ctx3.lineWidth = 5;
    ctx3.lineCap = "round";

    // Base
    ctx3.beginPath();
    ctx3.moveTo(50, 280);
    ctx3.lineTo(300, 280);
    ctx3.stroke();

    // Poste
    ctx3.beginPath();
    ctx3.moveTo(100, 280);
    ctx3.lineTo(100, 50);
    ctx3.stroke();

    // Viga
    ctx3.beginPath();
    ctx3.moveTo(100, 50);
    ctx3.lineTo(250, 50);
    ctx3.stroke();

    // Cuerda
    ctx3.beginPath();
    ctx3.moveTo(250, 50);
    ctx3.lineTo(250, 100);
    ctx3.stroke();
}

function dibujarCabeza() {
    ctx3.beginPath();
    ctx3.arc(250, 125, 25, 0, Math.PI * 2, true);
    ctx3.stroke();
}

function dibujarTronco() {
    ctx3.beginPath();
    ctx3.moveTo(250, 150);
    ctx3.lineTo(250, 220);
    ctx3.stroke();
}

function dibujarBrazoIzquierdo() {
    ctx3.beginPath();
    ctx3.moveTo(250, 170);
    ctx3.lineTo(210, 200);
    ctx3.stroke();
}

function dibujarBrazoDerecho() {
    ctx3.beginPath();
    ctx3.moveTo(250, 170);
    ctx3.lineTo(290, 200);
    ctx3.stroke();
}

function dibujarPiernaIzquierda() {
    ctx3.beginPath();
    ctx3.moveTo(250, 220);
    ctx3.lineTo(210, 250);
    ctx3.stroke();
}

function dibujarPiernaDerecha() {
    ctx3.beginPath();
    ctx3.moveTo(250, 220);
    ctx3.lineTo(290, 250);
    ctx3.stroke();
}

function dibujarFinDelJuego() {
    ctx3.fillStyle = "#EEE9DA";
    ctx3.font = "bold 24px Roboto Mono";
    ctx3.textAlign = "center";
    ctx3.fillText("FIN DEL JUEGO", canvas3.width / 2, 20);
    ctx3.font = "18px Roboto Mono";
    ctx3.fillText("La palabra era: " + palabraAleatoria, canvas3.width / 2, 40);
    intentoErrores = 7;
}

function verificarGanador() {
    if (letrasCorrectas.length === new Set(palabraAleatoria).size) {
        dibujarMensajeGanaste();
    }
}

function dibujarMensajeGanaste() {
    ctx3.fillStyle = "#EEE9DA";
    ctx3.font = "bold 24px Roboto Mono";
    ctx3.textAlign = "center";
    ctx3.fillText("¡GANASTE, FELICIDADES!", canvas3.width / 2, 20);
    intentoErrores = 7;
}

function rendirse() {
    dibujarFinDelJuego();
    if(intentos < 1) dibujarCabeza();
    if(intentos < 2) dibujarTronco();
    if(intentos < 3) dibujarBrazoIzquierdo();
    if(intentos < 4) dibujarBrazoDerecho();
    if(intentos < 5) dibujarPiernaIzquierda();
    if(intentos < 6) dibujarPiernaDerecha();
}

//PARTE 3
function mostrarAgregarPalabra() {
    document.getElementById("mostrarJuego").style.display = "none";
    document.getElementById("contenedorBotones").style.display = "none";
    document.getElementById("ingresoTexto").style.display = "flex";
}

function agregarPalabra() {
    let textoUsuario = document.getElementById("textoInput").value.toUpperCase();
    const mayusculasIngresoTexto = /^[A-ZÑ]+$/;

    if (textoUsuario.length >= 3 && textoUsuario.length <= 8 && textoUsuario.match(mayusculasIngresoTexto)) {
        palabras.push(textoUsuario);
        swal("¡Éxito!", "Palabra agregada correctamente.", "success").then(() => {
            document.getElementById("textoInput").value = "";
            cancelar();
            ocultar();
            mostrar();
            crearPalabraSecreta();
        });
    } else {
        swal(
            "Error",
            "La palabra debe tener entre 3 y 8 letras mayúsculas, sin acentos ni caracteres especiales.",
            "error"
        );
    }
}

function cancelar() {
    document.getElementById("ingresoTexto").style.display = "none";
    document.getElementById("contenedorBotones").style.display = "flex";
    document.getElementById("textoInput").value = "";
}

