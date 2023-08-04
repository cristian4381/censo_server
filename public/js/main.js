
const boton = document.getElementById("boton");

boton.onclick = async (e) => {
  e.preventDefault();

  
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  if(!correo || !password ){
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, ingresa el correo y la contraseña",
    });
    return;
  }


  const data = {
    correo: correo,
    password: password
  };

  try {

    const response = await fetch("/auth", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });


    // Verificar si la respuesta contiene información de usuario
    const responseData = await response.json();
    console.log(responseData);
    if (!responseData.ok) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Credenciales inválidas",
      });
    } 
  } catch (error) {
    console.log("Error en la petición:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Inténtalo mas tarde",
    });

  }

}

