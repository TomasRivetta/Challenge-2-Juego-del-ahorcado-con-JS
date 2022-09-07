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


    //VERIFICAR LETRA CORRECTA
    dibujarLetra(palabraAleatoria)

    //MUESTRA EN CONSOLA PRUEBA
    console.log(palabraAleatoria)

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


//ACA DEJE 06/09



//FUNCION: VERIFICAR SI LA TECLA PRESIONADA ES UNA LETRA
//- Debe funcionar solo con letras mayúsculas;
//- No deben ser utilizadas letras con acentos ni caracteres especiales;
//console.log(event)
//console.log(event.key)

function verificarTeclaLetra(){
    document.addEventListener("keydown",verificacion)
}

function verificacion(event){
    const teclaPresionada = event.key

    console.log(teclaPresionada)

    key = event.KeyCode || event.which;
    tecla = String.fromCharCode(key).toString();
    letrasAceptadas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (letrasAceptadas.indexOf(tecla) == -1){
        alert("Ingrese solo letras mayúsculas");
    }
    else
    {
        dibujarLetra(palabraAleatoria,teclaPresionada)
    }

}

//FUNCION: DIBUJAR LETRA CORRECTA

function dibujarLetra(palabraAleatoria,teclaPresionada){


    let palabra = palabraAleatoria
    let tecla = teclaPresionada;
    
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
        }
    }
    
    //dibujarLetraIncorrecta(teclaPresionada,palabra)

    /*
    let palabra = palabraAleatoria
    let tecla = teclaPresionada
    for(i = 0; i < palabra.length; i++)
    {
        if(tecla == palabra[i])
        {
            ctx.font="10pt Verdana";
            ctx.fillStyle = "white";
            ctx.fillText(palabra,0,130);
        }
    }*/

    //MUESTRA LA PALABRA ELEGIDA PARA PRUEBA
    //ctx.font="10pt Verdana";
    //ctx.fillStyle = "white";
    //ctx.fillText(palabra,-25,145,);
    
}


//FUNCION: DIBUJAR LETRA INCORRECTA
/*
function dibujarLetraIncorrecta(teclaPresionada,palabras){

    let tecla = teclaPresionada
    let palabra =  palabras
    if(tecla != palabra[i])
    {
        ctx.font="10pt Verdana";
        ctx.fillStyle = "white";
        ctx.fillText(tecla,0,145);
    }

    //MUESTRA LA PALABRA ELEGIDA PARA PRUEBA
    //ctx.font="10pt Verdana";
    //ctx.fillStyle = "white";
    //ctx.fillText(palabra,-25,145,);
    
}*/