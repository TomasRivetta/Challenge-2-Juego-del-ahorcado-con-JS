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

    //reinicio el contador para que no se siguen escribierndo letras cuando el jugador se queda sin intentos
    intentoErrores = 0

    //llamo a la funcion rendirse para que muestre que  palabra era
    contadorRendirme = 0;
    rendirse(contadorRendirme);
    contadorRendirme++;

    //Esto me sirve para que cuando de nuevo juego se reinicie a 50 la posicion de las palabras erradas
    movimiento = 50;

    letrasCorrectas = [];

    letrasErrada = [];

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
    const teclaPresionada = event.key;

    if (teclaPresionada.match(/^[A-ZÑ]$/)) {
        if(intentoErrores < 7){
            dibujarLetra(teclaPresionada);
        }
        else{
            swal("Ya se le agotaron los intentos 😢","Presione 'nuevo juego' para reiniciar el juego","error")
        }
    } 
    else{
        if(teclaPresionada.match(/^[0-9]$/i) || teclaPresionada.match(/^[a-zñ]$/)){
            swal("SOLO SE ACEPTAN LETRAS MAYUSCULAS","","error");
        }
    }
}

//FUNCION: DIBUJAR LETRA CORRECTA
function dibujarLetra(teclaPresionada) {
    let palabra = palabraAleatoria;
    let tecla = teclaPresionada;
    for (i = 0; i < palabra.length; i++) {
        if (tecla == palabra[i]) {
            if (letrasCorrectas.includes(tecla) == true) {
                console.log("Ya ingreso esa letra correcta")
                console.log(letrasCorrectas);
            }
            else
            {
                dibujarLetraCorrecta(tecla, i, palabraAleatoria.length);
                letrasCorrectas.push(tecla);
                console.log("ENTRE")
                for (j = 0; j < palabra.length; j++) {
                    if (tecla == palabra[j]) {
                        console.log("ENTRE AL IF 0");
                        dibujarLetraCorrecta(tecla, j, palabraAleatoria.length);
                        verificarGanador(palabra);
                    }
                }
            }
            return
        }
    }
    dibujarLetraIncorrecta(tecla);
    letrasErrada.push(tecla);
}

function dibujarLetraCorrecta(letra, index, posicion) {

    ctx.fillStyle = "orange";
    ctx.font = "35px Roboto Mono";
    ctx.textAlign = "center";
    var ejeX = index * 32 + (canvas.width - posicion * 40) / 2 + 50;
    ctx.fillText(letra, ejeX, 120);

}

var canvas2 = document.getElementById("mostrarPalabrasUsadas");
var ctx2 = canvas2.getContext("2d");

//FUNCION: DIBUJAR LETRA INCORRECTA

function dibujarLetraIncorrecta(teclaPresionada) {
    ctx2.save();

    if(letrasErrada.includes(teclaPresionada))
    {
        console.log("Ya ingreso esa letra errada")
    }
    else
    {
        ctx2.fillStyle = "orange";
        ctx2.font = "30pt Roboto Mono";
        ctx2.fillText(teclaPresionada, movimiento, 80);
        movimiento += 30;
        dibujar();
        intentoErrores++;
    } 
}

//FUNCION: DIBUJAR HORCA

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
    intentoErrores = 7;
}

//FUNCION: VERIFICAR GANADOR

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
    intentoErrores = 7;
}

//FUNCION: RENDIRSE
function rendirse(contadorRendirme) {
    let intento = contadorRendirme;
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

    //se declara con 7 para que no se puedan seguir escribiendo LETRAS INCORRECTAS en caso
    //de presionar el boton rendirse
    intentoErrores = 7;
}

//PARTE 3
function mostrarAgregarPalabra() {
    
    ocultar();
    document.getElementById("mostrarJuego").style.display = "none";
    document.getElementById("boton-nuevoJuego").style.display = "none";
    document.getElementById("boton-rendirse").style.display = "none";

    document.getElementById("textoInput").style.display = "block";
    document.getElementById("advertencia").style.display = "block";
    document.getElementById("boton-confirmarPalabraNueva").style.display = "block";
    document.getElementById("boton-cancelarPalabraNueva").style.display = "block";
}

//FUNCION: AGREGAR PALABRA
function agregarPalabra() {
    let textoUsuario = document.getElementById("textoInput").value;
    //textoUsuario.toUpperCase();
    numeros = /^[0-9]+$/;
    mayusculasIngresoTexto = /^[A-ZÑ]+$/;

    if (textoUsuario.length <= 8 && textoUsuario.length >= 3 && !textoUsuario.match(numeros) && textoUsuario.match(mayusculasIngresoTexto)) {
        palabras.push(textoUsuario);
        swal("SE AGREGO LA PALABRA CON EXITO!", "Presiona el boton para continuar!", "success");
        document.getElementById("textoInput").value = ""
        cancelar();
    } else {
        swal(
            "NO SE PUEDE AGREGAR LA PALABRA PORQUE: NO SE ACEPTAN LETRAS EN MINUSCULA || SUPERA LOS 8 CARACTERES || LA PALABRA VA SIN ACENTOS || SIN CARACTERES ESPECIALES || SIN NUMEROS","","error"
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
    document.getElementById("textoInput").value = ""
}