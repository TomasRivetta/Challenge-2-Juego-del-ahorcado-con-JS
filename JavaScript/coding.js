//FUNCION OCULTAR Y MOSTRAR

function mostrar(){
    document.getElementById("mostrarJuego").style.display = "block";
}

function ocultar(){
    document.getElementById("mostrarJuego").style.display = "none"
}

//FUNCION: CREAR PALABRA SECRETA

const palabras = ["HTML", "CSS" , "REDUX" , "REACTJS" , "NODEJS"]

function crearPalabraSecreta(){
    palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)]
    guionesPalabra(palabraAleatoria)
    //MUESTRA EN CONSOLA PRUEBA
    console.log(palabraAleatoria)
}

//FUNCION: MOSTRAR GUIONES PARA NUESTRA PALABRA SECRETA

var canvas = document.getElementById("micanvas");
var ctx = canvas.getContext("2d");

function guionesPalabra(palabraAleatoria){
    guiones = palabraAleatoria.length
    movimiento = 13 * 2
    for(i = 0; i < guiones; i++){

        ctx.translate(movimiento, 0);
        
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#f00";
        ctx.beginPath();
        ctx.moveTo(10, 50);
        ctx.lineTo(30, 50);
        ctx.stroke();

        movimiento++
    }
    //MUESTRA EN CONSOLA PRUEBA
    console.log(guiones)
}