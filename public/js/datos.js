async function enviarFormulario() {
    const selectOption = document.getElementById('selectOption');
    const option = selectOption.value;

    const data = {
      id_cuminidad : option
    };

    console.log(option);
    try{

      const response = await fetch("/ver_familas",{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      const tableBody = document.getElementById('tableBody');
      console.log(responseData);
      tableBody.innerHTML = '';

      responseData.forEach(familia => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${parseFecha(familia.fecha_registro)}</td>
          <td>${familia.no_vivienda}</td>
          <td>${familia.miembros_familia}</td>
          <td>${familia.nombre_jefe_familia}</td>
          <td>${familia.ocupacion}</td>
          <td>${familia.escolaridad}</td>
          <td>
            <button class="btn btn-primary" onclick="verDetalle(${familia.id_familia})">Ver Detalle</button>
          </td>
        `;
        tableBody.appendChild(row);
      });

    }catch (error){
      console.log(error)
    }
  }


  async function verDetalle(idFamilia) {
    console.log('id familia '+idFamilia);
    const data = {
      id : idFamilia
    };
    const divFamilias = document.getElementById("div_famillias");
    const divParaMostrar = document.getElementById("div_detalle_Familia");

    divParaMostrar.style.visibility = "visible";
    divParaMostrar.style.display="block";

    divFamilias.style.visibility= "hidden";
    divFamilias.style.display="none";


    try{
      const response = await fetch("/ver_Datos_famila",{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      console.log(responseData);

      const tableBody = document.getElementById('tableMiembros');
      tableBody.innerHTML = '';

      responseData.familia.forEach(miembro => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${miembro.nombre}</td>
          <td>${miembro.sexo}</td>
          <td>${miembro.fecha_nacimiento}</td>
          <td>${miembro.ocupacion}</td>
          <td>${miembro.sabe_leer}</td>
          <td>${miembro.escolaridad}</td>

        `;
        tableBody.appendChild(row);
      });

      crearCard(responseData.vivienda,"cb_detalles_vivienda","Detalles de la vivienda");
      crearCard(responseData.gestionAmbiental,"cb_gestion_ambiental","Gestion Ambiental");

      const tableMascota = document.getElementById('tableMascota');
      tableMascota.innerHTML = '';

      responseData.mascotas.forEach(mascota =>{
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${mascota.Tipo_mascota}</td>
          <td>${mascota.cantidad}</td>
          <td>${mascota.ubicacion}</td>
        `;
        tableMascota.appendChild(row);
      });
     
      

    }catch (error){
      console.log(error)
    }
    
  }
  function regresar(){
    const divFamilias = document.getElementById("div_famillias");
    const divParaMostrar = document.getElementById("div_detalle_Familia");

    divParaMostrar.style.visibility = "hidden";
    divParaMostrar.style.display="none";

    divFamilias.style.visibility= "visible";
    divFamilias.style.display="block";

  }

  const crearCard = (data, nombreContenedor, titulo) => {
    const container = document.getElementById(nombreContenedor);

    const h3 = document.createElement("h3");
    h3.classList.add("card-title");
    h3.textContent = titulo;


    const list = document.createElement("ul");
    list.classList.add("list-group", "list-group-flush");


    for (const key in data) {

      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.classList.add("bg-dark")
      listItem.classList.add("text-light")

      let value = data[key];
      if (typeof value === "string") {
        // Eliminar las comillas de las cadenas de texto
        value = value.replace(/['"]+/g, "");
      }

      const keyElement = document.createElement("strong");
      keyElement.textContent = inicialMayuscula(key);

      listItem.appendChild(keyElement);
      listItem.innerHTML += `: ${value}`;

      list.appendChild(listItem);
    }
    container.innerHTML = "";
    container.appendChild(h3);
    container.appendChild(list);
  };

  const parseFecha = (fecha) => {
    const nombresMeses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
      "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const fechaObjeto = new Date(fecha);
    const día = fechaObjeto.getDate();
    const mes = fechaObjeto.getMonth(); // Aquí obtenemos el número del mes (0 a 11)
    const año = fechaObjeto.getFullYear();
    const horas = fechaObjeto.getHours();
    const minutos = fechaObjeto.getMinutes(); 
  
    return `${día} ${nombresMeses[mes]} ${año} ${horas}:${minutos.toString().padStart(2, '0')}`;
  }
  

const inicialMayuscula = (string) => string.charAt(0).toUpperCase() + string.slice(1);