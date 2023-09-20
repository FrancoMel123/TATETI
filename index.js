const cuadrados = Array.from(document.querySelectorAll(".cuadrado")); // Hace un array de todos los elementos html de la clase cuadrado
const modal = document.querySelector("dialog"); // Agarra todos los elementos html dialog 
const textoModal = document.querySelector("h2"); // agarra todos los elementos html h2

const x = "X";
const o = "O";
let estadoJuego = "P1"; // inicio el juego en P1 osea va a comenzar con la X 

cuadrados.forEach((cuadrado, i) => {
    cuadrado.addEventListener("click", () => {
        if (estadoJuego === "PAUSA") return; // Ponemos el estado del juego en pausa para que cuando un jugador no se juegue mas
        if (cuadrado.textContent !== "") return; //Esto es para que no cambie de caracter 
        cuadrado.innerText = estadoJuego === "P1" ? x : o; // Operador ternario  para que cuando sea el turno de P1 se ponga una X
        const posicionGanadora = revisarGanador(); // Revisa si gano 
        if (typeof posicionGanadora === "object") {  // si la posicion ganadora es igual a un objeto significa que gano y llamo a la funcion ganadora y muestra su objeto 
            ganar(posicionGanadora);
            return // para que no se juegue mas 
        }
        if (posicionGanadora === "empate") { 
            mostrarModal("EMPATE"); // Si hay un empate  muestra la ventana del modal con el mensaje empate 
        }
        estadoJuego = estadoJuego === "P1" ? "P2" : "P1"; 
    })
})



/*
Funcion para saber si alguien gano: 
la función revisarGanador() toma la colección de elementos cuadrados
Luego imprime este arreglo en la consola
Map recorre cada elemento del arreglo y ejecuta una función para cada elemento que es cuadrado.textContent, que sirve para
acceder al texto dentro de un elemento html (X y O)

 */

function revisarGanador() {
    const tablero = cuadrados.map(cuadrado => cuadrado.textContent);
    console.log(tablero)

    //Revisar horizontales
    for (let i = 0; i <= 9; i += 3) { //el bucle recorrerá las columnas 0, 3 y 6 
        if (tablero[i] && // para asegurarse de que no esté vacía
            tablero[i] === tablero[i + 1] &&
            tablero[i] === tablero[i + 2]) {
            return [i, i + 1, i + 2];
        }
    }

    //Revisar verticales
    for (let i = 0; i <= 3; i++) {
        if (tablero[i] &&
            tablero[i] === tablero[i + 3] &&
            tablero[i] === tablero[i + 6]) {
            return [i, i + 3, i + 6];

        }
    }


    //Revisar Oblicuas
    if (tablero[0] &&
        tablero[0] === tablero[4] &&
        tablero[0] === tablero[8]) {
        return [0, 4, 8];
    }

    if (tablero[2] &&
        tablero[2] === tablero[4] &&
        tablero[2] === tablero[6]) {
        return [2, 4, 6];
    }

    if (tablero.includes("")) return;   
    return "empate";
}


function ganar(posicionGanadora) {
    console.log("GANADOR", posicionGanadora)
    posicionGanadora.forEach(posicion => {
        cuadrados[posicion].classList.toggle("ganador", true); // para cada posicion ganadora va activar la clase ganador de css para pintar la posicion ganadora y lo pone en true

    })
    mostrarModal("GANADOR:" + estadoJuego); // Muestra la ventana con el mensaje ganador y muestra el estado del juego que va a ser igual a quien gano si es P1 o P2 
    estadoJuego = "PAUSA";  // y pone el juego en pause para que nadie juegue cuando alguien gano 

}

function mostrarModal(texto) {
    textoModal.innerText = texto
    modal.showModal();
}


//Agarra el elemento html button y si hay un evento click ,para el arreglo cuadrados  borra los elementos que hay adentro de cada cuadrado
// El ganador se borra , se cierra el modal y el estado vuelve a P1 

modal.querySelector("button").addEventListener("click", () => { 
    cuadrados.forEach(cuadrado => {
        cuadrado.textContent = "";
        cuadrado.classList.toggle("ganador", false);
        modal.close();
        estadoJuego = "P1";
    });

})