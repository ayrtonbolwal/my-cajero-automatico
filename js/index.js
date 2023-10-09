window.addEventListener("load", () => {
  fetch("../data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud al archivo JSON falló.");
      }
      return response.json();
    })
    .then((data) => {
      const dataJSON = JSON.stringify(data);
      localStorage.setItem("dataUsers", dataJSON);
    })
    .catch((error) => {
      console.error("Error al obtener el archivo JSON.", error);
    });
});

let btnIniciarSesion = document.getElementById("btnIniciarSesion");
btnIniciarSesion.addEventListener("click", () => {
  const elementData = localStorage.getItem("dataUsers");
  const objetoData = JSON.parse(elementData);

  let inputCuenta = document.getElementById("inputCuenta").value;
  let inputPassword = document.getElementById("inputPassword").value;
  let mensajeError = document.getElementById("mensajeError");

  let estadoBusqueda = false;

  objetoData.map((elemento) => {
    if (inputCuenta == elemento.numeroCuenta) {
      if (inputPassword == elemento.password) {
        let elementoActivo = JSON.stringify(elemento);
        localStorage.setItem("elementoActivo", elementoActivo);
        window.location.href = "profile.html";
      } else {
        console.log("Contraseña Incorrecta");
        mensajeError.style.color = "red";
        mensajeError.innerText = "Contraseña incorrecta";
      }
    }

    if (estadoBusqueda == true) {
      return 0;
    }
  });

  if (estadoBusqueda == false) {
    console.log("Usuario no encontrado");
    mensajeError.style.color = "red";
    mensajeError.innerText = "Usuario no encontrado";
  }
});
