//FUNCION OCULTAR Y MOSTRAR



function mostrar(){
    document.getElementById("mostrarJuego").style.display = "block";
}

function ocultar(){
    //document.getElementById("mostrarJuego").style.display = "none"
    document.getElementById("boton-iniciar").style.display = "none"
    document.getElementById("boton-agregar").style.display = "none"

}


//FUNCION: CREAR PALABRA SECRETA

const palabras = ["HTML", "CSS", "PYTHON", "SQL" , "REDUX" , "REACTJS" , "NODEJS" , "MYSQL" , "JAVA" , "ALURA" , "ORACLE"]

function crearPalabraSecreta(){
    palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)]


    //LLAMADO A LA TABLA VACIA
    ctx.reset()

    //LLAMANDO A FUNCION PARA CREAR LOS GUIONES
    guionesPalabra(palabraAleatoria)



    //MUESTRA EN CONSOLA PRUEBA
    console.log(palabraAleatoria)

    //reinicio de intentos para dibujarelAHORACADO
    intentos = 0

    return palabraAleatoria

}


//FUNCION: MOSTRAR GUIONES PARA NUESTRA PALABRA SECRETA

var canvas = document.getElementById("micanvas");
var ctx = canvas.getContext("2d");


function guionesPalabra(palabraAleatoria){
    ctx.save()
    guiones = palabraAleatoria.length
    movimiento = 13 * 2
    for(i = 0; i < guiones; i++){

        ctx.translate(movimiento, 0);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#f00";
        ctx.beginPath();
        ctx.moveTo(10, 125);
        ctx.lineTo(30, 125);
        ctx.stroke();
        movimiento++
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
    const teclaPresionada = event.key

    key = event.KeyCode || event.which;
    tecla = String.fromCharCode(key).toString();
    letrasAceptadas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (letrasAceptadas.indexOf(tecla) == -1){
        alert("ACTIVE EL BLOQ MAYUS");
    }
    else
    {
        dibujarLetra(teclaPresionada)
    }

}

//FUNCION: DIBUJAR LETRA CORRECTA


function dibujarLetra(teclaPresionada){

    let palabra = palabraAleatoria
    let tecla = teclaPresionada;
    console.log(tecla)

    let movimiento = 13 * 2
    for(i = 0; i < palabra.length; i++)
    {
        if(tecla == palabra[i])
        {
            ctx.translate(movimiento, 0);
            ctx.font="10pt Verdana";
            ctx.fillStyle = "white";
            ctx.fillText(tecla,-96.3,120);
            movimiento++
            return
        }
    }

    dibujarLetraIncorrecta(tecla)


    console.log(tecla)
    //MUESTRA LA PALABRA ELEGIDA PARA PRUEBA
    //ctx.font="10pt Verdana";
    //ctx.fillStyle = "white";
    //ctx.fillText(palabra,-25,145,);
    
}

//FUNCION: DIBUJAR LETRA INCORRECTA

function dibujarLetraIncorrecta(teclaPresionada){
    let tecla = teclaPresionada

    ctx.font="10pt Verdana";
    ctx.fillStyle = "white";
    ctx.fillText(tecla,0,145);

    dibujar()

}


//FUNCION: DIBUJAR HORCA
let intentos = 0
function dibujar(){

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
        console.log("BRAZO DERECHO")
    }

}

//DIBUJAR LA HORCA
function dibujarHorca()
{
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#FF0000";

    //linea horizontal
    ctx.beginPath();
    ctx.moveTo(-80, 100);
    ctx.lineTo(100, 100);
    ctx.stroke();
    
    //linea vertical
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 100);
    ctx.stroke();

    //linea horizontal
    ctx.beginPath();
    ctx.moveTo(0, 2);
    ctx.lineTo(50, 2);
    ctx.stroke();

    //linea para abajo
    ctx.beginPath();
    ctx.moveTo(50, -80);
    ctx.lineTo(50, 30);
    ctx.stroke();

}

//DIBUJAR LA CABEZA
function dibujarCabeza(){

    ctx.beginPath();
    ctx.arc(50, 40, 10, 0, Math.PI * 2, true);
    ctx.stroke();

}

//DIBUJAR TRONCO
function dibujarTronco(){

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 80);
    ctx.stroke();

}

//DIBUJAR LA PIERNA IZQUIERDA
function dibujarPiernaIzquierda(){

    ctx.beginPath();
    ctx.moveTo(50, 78);
    ctx.lineTo(40, 93);
    ctx.stroke();

}

//DIBUJAR LA PIERNA DERECHA
function dibujarPiernaDerecha(){

    ctx.beginPath();
    ctx.moveTo(50, 78);
    ctx.lineTo(60, 93);
    ctx.stroke();

}

//DIBUJAR EL BRAZO IZQUIERDO
function dibujarBrazoIzquierdo(){

    ctx.beginPath();
    ctx.moveTo(50, 60);
    ctx.lineTo(40, 70);
    ctx.stroke();

}

//DIBUJAR EL BRAZO DERECHO
function dibujarBrazoDerecho(){

    ctx.beginPath();
    ctx.moveTo(50, 60);
    ctx.lineTo(60, 70);
    ctx.stroke();

}

//FUNCION: DIBUJAR FIN DEL JUEGO
function dibujarFinDelJuego(){

    ctx.font="10pt Verdana";
    ctx.fillStyle = "white";
    ctx.fillText("FIN DEL JUEGO",-105,50);
    ctx.fillText("PERDISTE",-105,70);

}

//FUNCION: VERIFICAR GANADOR

//FUNCION: DIBUJAR MENSAJE "GANASTE, FELICIDADES"

//FUNCION: AGREGAR PALABRA