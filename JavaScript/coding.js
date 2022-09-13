//FUNCION OCULTAR Y MOSTRAR

function mostrar() {
    document.getElementById("mostrarJuego").style.display = "block";
    document.getElementById("boton-nuevoJuego").style.display = "block";
    document.getElementById("boton-rendirse").style.display = "block";
}

function ocultar() {
    document.getElementById("boton-iniciar").style.display = "none";
    document.getElementById("boton-agregar").style.display = "none";
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



function crearPalabraSecreta() {
    palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];

    //LLAMADO A LA TABLA VACIA
    ctx.reset();

    ctx2.reset();

    ctx3.reset();

    //LLAMANDO A FUNCION PARA CREAR LOS GUIONES
    guionesPalabra(palabraAleatoria);

    //MUESTRA EN CONSOLA PRUEBA
    console.log(palabraAleatoria);

    //reinicio de intentos para dibujarelAHORACADO
    intentos = 0;

    //reinicio el contador  para que se reinice el verificador de si gano o no
    contador = 0;

    //llamo a lafuncion rendirse para que muestre que  palabra era
    prueba = 0;
    rendirse(prueba);
    prueba++;

    //Esto me sirve para que cuando de nuevo juego se reinicie a 50 la posicion de las palabras erradas
    movimiento = 50;

    letrasCorrectas = [];

    return palabraAleatoria;
}

//FUNCION: MOSTRAR GUIONES PARA NUESTRA PALABRA SECRETA

var canvas = document.getElementById("micanvas");
var ctx = canvas.getContext("2d");

function guionesPalabra(palabraAleatoria) {
    ctx.save();

    for (var i = 0; i < palabraAleatoria.length; i++) {
        ctx.fillStyle = "#0A3871";
        ctx.font = "35px Roboto Mono";
        ctx.textAlign = "center";
        var ejeX = i * 32 + (canvas.width - palabraAleatoria.length * 40) / 2 + 50;
        var ejeY = canvas.height - 10;
        ctx.fillText("_", ejeX, ejeY);
    }

    //MUESTRA EN CONSOLA PRUEBA
    //console.log(guiones)
}

//FUNCION: VERIFICAR SI LA TECLA PRESIONADA ES UNA LETRA
//- Debe funcionar solo con letras mayúsculas;
//- No deben ser utilizadas letras con acentos ni caracteres especiales;
//console.log(event)
//console.log(event.key)

document.addEventListener("keydown", verificacion);

function verificacion(event) {
    const teclaPresionada = event.key.toUpperCase();

    if (teclaPresionada.match(/^[A-ZÑ]$/i)) {
        dibujarLetra(teclaPresionada);
    } 
    else{
        if(teclaPresionada.match(/^[0-9]$/i)){
            alert("SOLO SE ACEPTAN LETRAS MAYUSCULAS");
        }
    }
}

//FUNCION: DIBUJAR LETRA CORRECTA
function dibujarLetra(teclaPresionada) {
    let palabra = palabraAleatoria;
    let tecla = teclaPresionada;
    for (i = 0; i < palabra.length; i++) {
        if (tecla == palabra[i]) {

            letrasCorrectas.push(tecla);
            dibujarLetraCorrecta(tecla, i, palabraAleatoria.length);

            if (letrasCorrectas.includes(tecla) == true) {
                console.log("ENTRE")
                for (j = 0; j < palabra.length; j++) {
                    if (tecla == palabra[j]) {
                        console.log("ENTRE AL IF 0");
                        dibujarLetraCorrecta(tecla, j, palabraAleatoria.length);
                        verificarGanador(palabra);
                    }
                }
                console.log(letrasCorrectas);
            }
            return
        }
    }
    dibujarLetraIncorrecta(tecla);
}

function dibujarLetraCorrecta(letra, index, posicion) {
    //#0A3871
    ctx.fillStyle = "orange";
    ctx.font = "35px Roboto Mono";
    ctx.textAlign = "center";
    var ejeX = index * 32 + (canvas.width - posicion * 40) / 2 + 50;
    ctx.fillText(letra, ejeX, 120);
    let soundAcierto = new Audio("./musica_de_fondo/sonido-de-acierto.mp3");
    soundAcierto.play();
}

var canvas2 = document.getElementById("mostrarPalabrasUsadas");
var ctx2 = canvas2.getContext("2d");

//FUNCION: DIBUJAR LETRA INCORRECTA

function dibujarLetraIncorrecta(teclaPresionada) {
    ctx2.save();

    ctx2.fillStyle = "orange";
    ctx2.font = "30pt Roboto Mono";
    ctx2.fillText(teclaPresionada, movimiento, 80);
    movimiento += 30;
    let soundError = new Audio("./musica_de_fondo/sonido-de-error.mp3");
    soundError.play();
    dibujar();
}

//FUNCION: DIBUJAR HORCA
let intentos = 0;
function dibujar() {
    let palabra = palabraAleatoria;
    if (intentos == 0) {
        //DIBUJAR LA HORCA
        dibujarHorca();
        intentos++;
    } else if (intentos == 1) {
        dibujarCabeza();
        intentos++;
    } else if (intentos == 2) {
        dibujarTronco();
        intentos++;
    } else if (intentos == 3) {
        dibujarPiernaIzquierda();
        intentos++;
    } else if (intentos == 4) {
        dibujarPiernaDerecha();
        intentos++;
    } else if (intentos == 5) {
        dibujarBrazoIzquierdo();
        intentos++;
    } else {
        dibujarBrazoDerecho();
        dibujarFinDelJuego();

        //PRINTEA EL MENSAJE DE QUE PALABRA ERA
        ctx3.fillStyle = "orange";
        ctx3.font = "10pt Roboto Mono";
        ctx3.fillText("La palabra era: " + palabra, 75, 145);
    }
}

var canvas3 = document.getElementById("miAhorcado");
var ctx3 = canvas3.getContext("2d");

//DIBUJAR LA HORCA
function dibujarHorca() {
    ctx3.lineWidth = 3;
    ctx3.strokeStyle = "orange";

    //linea horizontal
    ctx3.beginPath();
    ctx3.moveTo(0, 100);
    ctx3.lineTo(150, 100);
    ctx3.stroke();

    //linea vertical
    ctx3.beginPath();
    ctx3.moveTo(2, 2);
    ctx3.lineTo(2, 100);
    ctx3.stroke();

    //linea horizontal
    ctx3.beginPath();
    ctx3.moveTo(0, 2);
    ctx3.lineTo(50, 2);
    ctx3.stroke();

    //linea para abajo
    ctx3.beginPath();
    ctx3.moveTo(50, -80);
    ctx3.lineTo(50, 30);
    ctx3.stroke();
}

//DIBUJAR LA CABEZA
function dibujarCabeza() {
    ctx3.beginPath();
    ctx3.arc(50, 40, 10, 0, Math.PI * 2, true);
    ctx3.stroke();
}

//DIBUJAR TRONCO
function dibujarTronco() {
    ctx3.beginPath();
    ctx3.moveTo(50, 50);
    ctx3.lineTo(50, 80);
    ctx3.stroke();
}

//DIBUJAR LA PIERNA IZQUIERDA
function dibujarPiernaIzquierda() {
    ctx3.beginPath();
    ctx3.moveTo(50, 78);
    ctx3.lineTo(40, 93);
    ctx3.stroke();
}

//DIBUJAR LA PIERNA DERECHA
function dibujarPiernaDerecha() {
    ctx3.beginPath();
    ctx3.moveTo(50, 78);
    ctx3.lineTo(60, 93);
    ctx3.stroke();
}

//DIBUJAR EL BRAZO IZQUIERDO
function dibujarBrazoIzquierdo() {
    ctx3.beginPath();
    ctx3.moveTo(50, 60);
    ctx3.lineTo(40, 70);
    ctx3.stroke();
}

//DIBUJAR EL BRAZO DERECHO
function dibujarBrazoDerecho() {
    ctx3.beginPath();
    ctx3.moveTo(50, 60);
    ctx3.lineTo(60, 70);
    ctx3.stroke();
}

//FUNCION: DIBUJAR FIN DEL JUEGO
function dibujarFinDelJuego() {
    ctx3.fillStyle = "orange";
    ctx3.font = "10pt Roboto Mono";
    ctx3.fillText("FIN DEL JUEGO", 75, 80);
    ctx3.fillText("PERDISTE", 75, 60);
    let soundDerrota = new Audio("./musica_de_fondo/derrota-mario-bros.mp3");
    soundDerrota.play();
}

//FUNCION: VERIFICAR GANADOR
let contador = 0;
function verificarGanador(palabra) {
    palabraSecreta = palabra.length;
    contador++;
    if (contador == palabraSecreta) {
        dibujarMensajeGanaste();
    }
}

//FUNCION: DIBUJAR MENSAJE "GANASTE, FELICIDADES"
function dibujarMensajeGanaste() {
    ctx3.fillStyle = "orange";
    ctx3.font = "10pt Roboto Mono";
    ctx3.fillText("GANASTE FELICIDADES", 100, 80);
    let soundVictoria = new Audio("./musica_de_fondo/victoria-mario-bros.mp3");
    soundVictoria.play();
}

//FUNCION: RENDIRSE
function rendirse(prueba) {
    let intento = prueba;
    let palabra = palabraAleatoria;
    if (intento == 0) {
        return;
    }
    dibujarFinDelJuego();
    ctx3.fillStyle = "orange";
    ctx3.font = "10pt Roboto Mono";
    ctx3.fillText("La palabra era: " + palabra, 75, 145);

    dibujarHorca();
    dibujarCabeza();
    dibujarTronco();
    dibujarPiernaIzquierda();
    dibujarPiernaDerecha();
    dibujarBrazoIzquierdo();
    dibujarBrazoDerecho();
}

//PARTE 3

function mostrarAgregarPalabra() {
    ocultar();
    document.getElementById("mostrarJuego").style.display = "none";
    document.getElementById("boton-nuevoJuego").style.display = "none";
    document.getElementById("boton-rendirse").style.display = "none";

    document.getElementById("textoInput").style.display = "block";
    document.getElementById("advertencia").style.display = "block";
    document.getElementById("boton-confirmarPalabraNueva").style.display =
        "block";
    document.getElementById("boton-cancelarPalabraNueva").style.display = "block";
}

//FUNCION: AGREGAR PALABRA
function agregarPalabra() {
    let textoUsuario = document.getElementById("textoInput").value;
    textoUsuario.toUpperCase();
    numeros = /^[0-9]+$/;
    if (textoUsuario.length <= 8 && textoUsuario.length >= 3 && !textoUsuario.match(numeros)) {
        palabras.push(textoUsuario);
        localStorage.setItem("palabras" , textoUsuario)
        alert("SE AGREGO LA PALABRA CON EXITO");
        cancelar();
    } else {
        alert(
            "NO SE PUEDE AGREGAR LA PALABRA PORQUE SUPERA LOS 8 CARACTERES ADEMAS LAS PALABRAS VAN SIN ACENTOS, SIN CARACTERES ESPECIALES Y SIN NUMEROS"
        );
    }
}

function cancelar() {
    document.getElementById("boton-iniciar").style.display = "block";
    document.getElementById("boton-agregar").style.display = "block";
    document.getElementById("textoInput").style.display = "none";
    document.getElementById("advertencia").style.display = "none";
    document.getElementById("boton-confirmarPalabraNueva").style.display = "none";
    document.getElementById("boton-cancelarPalabraNueva").style.display = "none";
}

//Musica de fondo
/*function mute() {
    var aud = document.getElementById("music");
    if (aud.muted == false) {aud.muted = true}
    else {aud.muted = false}
}*/
