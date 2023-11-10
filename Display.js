class Display {
    constructor(displayValorAnterior, displayValorActual) {
        this.displayValorActual = displayValorActual; //Se pasa el display aqui
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = ''; //Para guardar el valor
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            restar: '-',
            multiplicar: 'X',
            dividir: '/',
        }
    }

    agregarNumero(numero) {
        // Si se quiere agregar un numero y ya esta incluido entonces no agregues ese punto
        if (numero === '.' && this.valorActual.includes('.')) return
        this.valorActual = this.valorActual.toString() + numero.toString(); //Aqui se le agrega el valor de cada boton al display
        this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`; //Esto ultimo es para mostrar el valor junto con el signo, excepto por el = ya que no esta en el mapa de signos en el constructor del Display
    }

    calcular() {
        // Convertimos valores string en numeros para las operaciones
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        // Si no son numeros (Not a Number /NaN) no hará ninguna operacion
        if (isNaN(valorActual) || isNaN(valorAnterior)) return
        // Actualiza el valor actual y le pasa los valores con el tipo de operacion que se escoga
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
    }

    computar(tipo) {
        //Si es distinto de igual, si y solo si, entonces va a calcular
        //Esto es para que cuando pongamos otro numero, haga otro calculo en vez de añadir un numero.
        //Si ya tiene un calculo en el display, al apretar otro boton, iniciará otro calculo 
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo; //Se actualiza
        this.valorAnterior = this.valorActual || this.valorAnterior; //Si hay un valor actual, se coloca, si no, se deja el anterior, sirve para cambiar de operador sin tener que eliminar todo
        this.valorActual = '';
        this.imprimirValores();
    }

    borrar() {
        //Se recorta el ultimo numero para que surga el efecto de borrar
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    borrarTodo() {
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }
}