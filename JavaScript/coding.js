//FUNCION OCULTAR Y MOSTRAR

function mostrar(){
    document.getElementById("mostrarJuego").style.display = "block";
    document.getElementById("boton-nuevoJuego").style.display = "block";
    document.getElementById("boton-rendirse").style.display = "block";

}

function ocultar(){
    //document.getElementById("mostrarJuego").style.display = "none"
    document.getElementById("boton-iniciar").style.display = "none"
    document.getElementById("boton-agregar").style.display = "none"

}


//FUNCION: CREAR PALABRA SECRETA

const palabras = ["HTML", 
    "CSS" , 
    "PYTHON" , 
    "SQL" , 
    "REDUX" , 
    "REACTJS" , 
    "NODEJS" , 
    "MYSQL" , 
    "JAVA" , 
    "ALURA" , 
    "ORACLE" ,
    "ONE",
    "MOUSE",
    "ANGULAR",
    "SLACK",
    "DISCORD",
    "UNITY",
    "CSHARP"
]

function crearPalabraSecreta(){
    palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)]

    //LLAMADO A LA TABLA VACIA
    ctx.reset()

    ctx2.reset()

    ctx3.reset()

    //LLAMANDO A FUNCION PARA CREAR LOS GUIONES
    guionesPalabra(palabraAleatoria)

    //MUESTRA EN CONSOLA PRUEBA
    console.log(palabraAleatoria)

    //reinicio de intentos para dibujarelAHORACADO
    intentos = 0

    //reinicio el contador  para que se reinice el verificador de si gano o no
    contador = 0 

    //llamo a lafuncion rendirse para que muestre que  palabra era
    prueba = 0
    rendirse(prueba)
    prueba++

    return palabraAleatoria

}

//FUNCION: MOSTRAR GUIONES PARA NUESTRA PALABRA SECRETA

var canvas = document.getElementById("micanvas");
var ctx = canvas.getContext("2d");

function guionesPalabra(palabraAleatoria){
    
    ctx.save()
    /*
    guiones = palabraAleatoria.length
    movimiento = 200 / palabraAleatoria.length
    for(i = 0; i < guiones; i++){
        ctx.translate(movimiento, 0);
        ctx.lineWidth =10;
        ctx.strokeStyle = "#0A3871";
        ctx.beginPath();
        ctx.moveTo(10 , 125);
        ctx.lineTo(30 , 125);
        ctx.stroke();
        movimiento++
    }*/

    for (var i = 0; i < palabraAleatoria.length; i++) {        
        ctx.fillStyle = "#0A3871";
        ctx.font = '35px SMW Text NC';
        ctx.textAlign = 'center';
        var ejeX = i*32 + (canvas.width - palabraAleatoria.length * 40) / 2 + 50;
        var ejeY = (canvas.height - 10)
        ctx.fillText('_', ejeX, ejeY);
    }

    //MUESTRA EN CONSOLA PRUEBA
    //console.log(guiones)
}


//FUNCION: VERIFICAR SI LA TECLA PRESIONADA ES UNA LETRA
//- Debe funcionar solo con letras mayúsculas;
//- No deben ser utilizadas letras con acentos ni caracteres especiales;
//console.log(event)
//console.log(event.key)

document.addEventListener("keydown",verificacion)

function verificacion(event){
    const teclaPresionada = event.key.toUpperCase()

    if (teclaPresionada.match(/^[A-ZÑ]$/i)){
        dibujarLetra(teclaPresionada)
    }
    else
    {
        alert("SOLO SE ACEPTAN LETRAS MAYUSCULAS");
    }

}

//FUNCION: DIBUJAR LETRA CORRECTA

//const palabraConGuiones = palabraAleatoria.replace(/./g, "_ ");

function dibujarLetra(teclaPresionada){

    let palabra = palabraAleatoria
    let tecla = teclaPresionada;
    console.log(tecla)
    //let arrayPalabra = palabra.split('')
    //console.log(arrayPalabra)

    //let movimiento = (200 / palabraAleatoria.length)
    for(i = 0; i < palabra.length; i++)
    {
            if(tecla == palabra[i])
            {
                /*
                ctx.translate(movimiento, 0);
                ctx.font="30pt SMW Text NC";
                ctx.fillStyle = "white";
                ctx.fillText(tecla,-200,100);
                */
                dibujarLetraCorrecta(tecla,i,palabraAleatoria.length)
                
                verificarGanador(palabra)
                return
        
            }
    }

    dibujarLetraIncorrecta(tecla)


    console.log(tecla)
}

function dibujarLetraCorrecta(letra, index, posicion) {
    ctx.fillStyle = "white";
    ctx.font = '35px SMW Text NC';
    ctx.textAlign = 'center';
    var ejeX = index*32 + (canvas.width - posicion * 40) / 2 + 50;
    ctx.fillText(letra, ejeX, 120);
}



var canvas2 = document.getElementById("mostrarPalabrasUsadas");
var ctx2 = canvas2.getContext("2d");

//FUNCION: DIBUJAR LETRA INCORRECTA

let movimiento = 20
function dibujarLetraIncorrecta(teclaPresionada){
    ctx2.save()
    let tecla = teclaPresionada
    ctx2.font="30pt SMW Text NC";
    ctx2.fillStyle = "white";
    ctx2.fillText(tecla,movimiento,90);
    movimiento+=30;
    console.log(movimiento)
    dibujar()

}


//FUNCION: DIBUJAR HORCA
let intentos = 0
function dibujar(){
    let palabra = palabraAleatoria
    if(intentos == 0)
    {

        //DIBUJAR LA HORCA
        dibujarHorca()
        console.log("HORCA")
        intentos++

    }
    else if(intentos == 1)
    {

        dibujarCabeza()
        console.log("CABEZA")
        intentos++

    }
    else if(intentos == 2)
    {

        dibujarTronco()
        console.log("TRONCO")
        intentos++

    }
    else if(intentos == 3)
    {

        dibujarPiernaIzquierda()
        console.log("PIERNA IZQUIERDA")
        intentos++

    }
    else if(intentos == 4)
    {

        dibujarPiernaDerecha()
        console.log("PIERNA DERECHA")
        intentos++

    }
    else if(intentos == 5)
    {

        dibujarBrazoIzquierdo()
        console.log("BRAZO IZQUIERDO")
        intentos++

    }
    else
    {

        dibujarBrazoDerecho()
        dibujarFinDelJuego()

        //PRINTEA EL MENSAJE DE QUE PALABRA ERA
        ctx3.font="10pt Verdana";
        ctx3.fillStyle = "white";
        ctx3.fillText("La palabra era: " + palabra,75,145,);
        console.log("BRAZO DERECHO")
    }

}

var canvas3 = document.getElementById("miAhorcado");
var ctx3 = canvas3.getContext("2d");

//DIBUJAR LA HORCA
function dibujarHorca()
{
    ctx3.lineWidth = 3;
    ctx3.strokeStyle = "#0A3871";

    //linea horizontal
    ctx3.beginPath();
    ctx3.moveTo(-80, 100);
    ctx3.lineTo(100, 100);
    ctx3.stroke();
    
    //linea vertical
    ctx3.beginPath();
    ctx3.moveTo(0, 0);
    ctx3.lineTo(0, 100);
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
function dibujarCabeza(){

    ctx3.beginPath();
    ctx3.arc(50, 40, 10, 0, Math.PI * 2, true);
    ctx3.stroke();

}

//DIBUJAR TRONCO
function dibujarTronco(){

    ctx3.beginPath();
    ctx3.moveTo(50, 50);
    ctx3.lineTo(50, 80);
    ctx3.stroke();

}

//DIBUJAR LA PIERNA IZQUIERDA
function dibujarPiernaIzquierda(){

    ctx3.beginPath();
    ctx3.moveTo(50, 78);
    ctx3.lineTo(40, 93);
    ctx3.stroke();

}

//DIBUJAR LA PIERNA DERECHA
function dibujarPiernaDerecha(){

    ctx3.beginPath();
    ctx3.moveTo(50, 78);
    ctx3.lineTo(60, 93);
    ctx3.stroke();

}

//DIBUJAR EL BRAZO IZQUIERDO
function dibujarBrazoIzquierdo(){

    ctx3.beginPath();
    ctx3.moveTo(50, 60);
    ctx3.lineTo(40, 70);
    ctx3.stroke();

}

//DIBUJAR EL BRAZO DERECHO
function dibujarBrazoDerecho(){

    ctx3.beginPath();
    ctx3.moveTo(50, 60);
    ctx3.lineTo(60, 70);
    ctx3.stroke();

}

//FUNCION: DIBUJAR FIN DEL JUEGO
function dibujarFinDelJuego(){

    ctx3.font="10pt SMW Text NC";
    ctx3.fillStyle = "white";
    ctx3.fillText("FIN DEL JUEGO",75,80);
    ctx3.fillText("PERDISTE",75,60);

}

//FUNCION: VERIFICAR GANADOR
let contador = 0
function verificarGanador(palabra){

    palabraSecreta = palabra
    contador++
    if(contador == palabraSecreta.length)
    {
        console.log("ganaste")
        dibujarMensajeGanaste()
    }

}

//FUNCION: DIBUJAR MENSAJE "GANASTE, FELICIDADES"
function dibujarMensajeGanaste(){

    ctx3.font="10pt SMW Text NC";
    ctx3.fillStyle = "white";
    ctx3.fillText("GANASTE FELICIDADES",100,80);

}

//FUNCION: RENDIRSE
function rendirse(prueba){

    let intento = prueba
    let palabra = palabraAleatoria
    if(intento == 0)
    {
        return
    }
    dibujarFinDelJuego()
    ctx3.font="10pt SMW Text NC";
    ctx3.fillStyle = "white";
    ctx3.fillText("La palabra era: " + palabra,70,145,);
    breack;
}

//PARTE 3

function mostrarAgregarPalabra(){

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
function agregarPalabra(){

    let textoUsuario = document.getElementById("textoInput").value
    textoUsuario.toUpperCase()
    if(textoUsuario <= 8)
    {
        palabras.push(textoUsuario)
        alert("SE AGREGO LA PALABRA CON EXITO")
        cancelar()
    }
    else
    {
        alert("NO SE PUEDE AGREGAR LA PALABRA PORQUE SUPERA LOS 8 CARACTERES ADEMAS LAS PALABRAS VAN SIN ACENTOS Y CARACTERES ESPECIALES")
    }
}

function cancelar(){

    document.getElementById("boton-iniciar").style.display = "block"
    document.getElementById("boton-agregar").style.display = "block"
    document.getElementById("textoInput").style.display="none";
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