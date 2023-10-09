/* Get Datos del Usuario */
const elementData = localStorage.getItem("elementoActivo");
const objetoData = JSON.parse(elementData);

/* Creamos clase usuario */
class Usuario {
  constructor(
    nombre,
    apellido,
    id,
    password,
    fechaNacimiento,
    estado,
    numeroCuenta,
    saldo,
    transacciones
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.id = id;
    this.password = password;
    this.fechaNacimiento = fechaNacimiento;
    this.estado = estado;
    this.numeroCuenta = numeroCuenta;
    this.saldo = saldo;
    this.transacciones = transacciones;
  }

  actualizarLocal(saldo, transacciones) {
    const elementData = localStorage.getItem("elementoActivo");
    const elementoActivo = JSON.parse(elementData);

    elementoActivo.saldo = saldo;
    elementoActivo.transacciones = transacciones;
    let elementoUpdate = JSON.stringify(elementoActivo);

    localStorage.setItem("elementoActivo", elementoUpdate);
  }

  ingresarMonto(montoIngresado) {
    let validacion = this.saldo + montoIngresado;
    let messageError = document.getElementById("mensajeErrorDeposito");
    let messageSaldo = document.getElementById("mensajeSaldoDeposito");

    if (validacion < 10) {
      messageError.innerText = "Tu saldo en cuenta debe tener mínimo $10.";
      return false;
    } else if (validacion > 990) {
      messageError.innerText = "Tu saldo en cuenta debe tener máximo $990.";
      return false;
    } else if (validacion <= 900 && validacion >= 10) {
      let nuevaTransaccion = new Transaccion(
        this.numeroCuenta,
        "Depósito",
        montoIngresado,
        new Date()
      );
      this.transacciones.push(nuevaTransaccion);
      this.saldo = this.saldo + montoIngresado;
      messageSaldo.innerText = `Saldo Actual : ${this.saldo}`;
      this.actualizarLocal(this.saldo, this.transacciones);

      return true;
    }
  }

  retirarMonto(montoIngresado) {
    let validacion = this.saldo - montoIngresado;
    let messageError = document.getElementById("mensajeErrorRetiro");
    let messageSaldo = document.getElementById("mensajeSaldoRetiro");

    if (validacion < 10) {
      messageError.innerText = "Tu saldo en cuenta debe tener mínimo $10.";
      return false;
    } else if (validacion > 990) {
      messageError.innerText = "Tu saldo en cuenta debe tener máximo $990.";
      return false;
    } else if (validacion <= 900 && validacion >= 10) {
      let nuevaTransaccion = new Transaccion(
        this.numeroCuenta,
        "Retiro",
        montoIngresado,
        new Date()
      );
      this.transacciones.push(nuevaTransaccion);
      this.saldo = this.saldo - montoIngresado;
      messageSaldo.innerText = `Saldo Actual : ${this.saldo}`;
      this.actualizarLocal(this.saldo, this.transacciones);
      return true;
    }
  }

  desplegarHistorial() {
    let saldoActual = document.getElementById("saldoActual");
    saldoActual.innerText = `$${this.saldo} MXN`;
    let espacioHistorial = document.getElementById("espacioHistorial");
    espacioHistorial.innerText = "";
    if (this.transacciones.length == 0) {
      espacioHistorial.innerHTML = `<p>No hay movimientos recientes</p>`;
    } else {
      this.transacciones.forEach((transaccion) => {
        let itemTransaccion = document.createElement("div");
        itemTransaccion.setAttribute("class", "itemTransaccion");
        itemTransaccion.innerHTML = `
              <p>${transaccion.numeroCuenta}</p>
              <p>${transaccion.tipo}</p>
              <p>${transaccion.montoIngresado}</p>
              <p>${transaccion.fecha}</p>
          `;
        espacioHistorial.appendChild(itemTransaccion);
      });
    }
  }
}

class Transaccion {
  constructor(numeroCuenta, tipo, montoIngresado, fecha) {
    this.numeroCuenta = numeroCuenta;
    this.tipo = tipo;
    this.montoIngresado = montoIngresado;
    this.fecha = fecha;
  }
}

let nuevoUsuario = new Usuario(
  objetoData.nombre,
  objetoData.apellido,
  objetoData.id,
  objetoData.password,
  objetoData.fechaNacimiento,
  objetoData.estado,
  objetoData.numeroCuenta,
  objetoData.saldo,
  objetoData.transacciones
);

nuevoUsuario.desplegarHistorial();

/* Botones menú */
const btnConsultar = document.getElementById("btnConsultar");
const btnIngresar = document.getElementById("btnIngresar");
const btnRetirar = document.getElementById("btnRetirar");

/* Páginas de Funcionalidades */
const pageConsultar = document.getElementById("pageConsultar");
const pageIngresar = document.getElementById("pageIngresar");
const pageRetirar = document.getElementById("pageRetirar");

/* Mostrar y ocultar páginas */
btnConsultar.addEventListener("click", () => {
  pageConsultar.style.display = "flex";
  pageIngresar.style.display = "none";
  pageRetirar.style.display = "none";

  let inputDepositar = document.getElementById("inputDepositar");
  inputDepositar.value = "";
  let inputRetirar = document.getElementById("inputRetirar");
  inputRetirar.value = "";
});
btnIngresar.addEventListener("click", () => {
  pageIngresar.style.display = "flex";
  pageConsultar.style.display = "none";
  pageRetirar.style.display = "none";

  let inputDepositar = document.getElementById("inputDepositar");
  inputDepositar.value = "";
  let inputRetirar = document.getElementById("inputRetirar");
  inputRetirar.value = "";
});
btnRetirar.addEventListener("click", () => {
  pageConsultar.style.display = "none";
  pageIngresar.style.display = "none";
  pageRetirar.style.display = "flex";

  let inputDepositar = document.getElementById("inputDepositar");
  inputDepositar.value = "";
  let inputRetirar = document.getElementById("inputRetirar");
  inputRetirar.value = "";
});

/* Llamadas a la accion */
const actionRetirarBtn = document.getElementById("actionRetirar");
const actionDepositarBtn = document.getElementById("actionDepositar");

actionRetirarBtn.addEventListener("click", () => {
  let montoIngresado = Number(document.getElementById("inputRetirar").value);
  let logrado = nuevoUsuario.retirarMonto(montoIngresado);

  if (logrado == true) {
    setTimeout(() => {
      pageConsultar.style.display = "flex";
      pageIngresar.style.display = "none";
      pageRetirar.style.display = "none";

      let messageSaldo = document.getElementById("mensajeSaldoRetiro");
      messageSaldo.innerText = "";

      nuevoUsuario.desplegarHistorial();
    }, 4000);
  }
});

actionDepositarBtn.addEventListener("click", () => {
  let montoIngresado = Number(document.getElementById("inputDepositar").value);
  let logrado = nuevoUsuario.ingresarMonto(montoIngresado);

  if (logrado == true) {
    setTimeout(() => {
      pageConsultar.style.display = "flex";
      pageIngresar.style.display = "none";
      pageRetirar.style.display = "none";

      let messageSaldo = document.getElementById("mensajeSaldoDeposito");
      messageSaldo.innerText = "";

      nuevoUsuario.desplegarHistorial();
    }, 4000);
  }
});

const btnSalir = document.getElementById("btnSalir");

btnSalir.addEventListener("click", () => {
  const datoUsuarios = localStorage.getItem("dataUsers");
  const data = JSON.parse(datoUsuarios);

  data.forEach(usuario => {
    console.log(usuario);
    console.log(usuario.id);
    console.log(nuevoUsuario.id);
    if(usuario.id = nuevoUsuario.id){
      usuario.estado = false;
      usuario.saldo = nuevoUsuario.saldo;
      usuario.transacciones = nuevoUsuario.transacciones;
    }
  });

  const setData = JSON.stringify(data);
  localStorage.setItem("dataUsers", setData);
  localStorage.removeItem("elementoActivo");
  window.location.href = "index.html";
})
