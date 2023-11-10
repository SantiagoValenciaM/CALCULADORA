const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const botonesNum = document.querySelectorAll('.numero');
const botonesOp = document.querySelectorAll('.operador');

const display = new Display(displayValorAnterior, displayValorActual);

// Cada que se apriete un boton agrega el numero correspondiente
botonesNum.forEach(boton => {
    boton.addEventListener('click', () => display.agregarNumero(boton.innerHTML));
});

botonesOp.forEach(boton => {
    boton.addEventListener('click', () => display.computar(boton.value))
});