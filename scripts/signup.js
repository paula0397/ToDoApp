
window.addEventListener("load", function () {
  const form = document.forms[0];

  /* ---------------------- obtenemos variables globales ---------------------- */

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = document.getElementById("inputNombre");
    const apellido = document.getElementById("inputApellido");
    const email = document.getElementById("inputEmail");
    const contrasenia = document.getElementById("inputPassword");
    const contrasenia2 = document.getElementById("inputPasswordRepetida");
    let valorContrasenia = "";

    if (contrasenia.value == contrasenia2.value){
      valorContrasenia = contrasenia.value;
    }
    else{
      alert("verificar contrasenia")
    }

    const userRegistrer = {
      "firstName": nombre.value,
      "lastName": apellido.value,
      "email": email.value,
      "password": valorContrasenia
    }

    realizarRegister(userRegistrer)
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
    const apiURL = "https://ctd-todo-api.herokuapp.com/v1/users"

    const configuraciones = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    };

    fetch(apiURL, configuraciones)
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        if (respuesta.jwt) {
          localStorage.setItem("jwt", respuesta.jwt);
          location.replace("/mis-tareas.html");
        }
      });
  }
});