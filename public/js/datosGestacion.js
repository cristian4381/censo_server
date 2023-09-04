const selectComunidad = document.getElementById('slc_comunidad');
const selectSector = document.getElementById("slc_sector");

selectComunidad.addEventListener("change", function() {
  buscarSectores();
});

async function buscarIformacion(){
    //const selectComunidad = document.getElementById('selectComunidad');
    const idComunidad = selectComunidad.value;
    const idSector = selectSector.value;
    
    try{
        const url = `/buscar_embarzadas?comunidad=${encodeURIComponent(idComunidad)}&sector=${encodeURIComponent(idSector)}`;

        const responseData = await fetch(url);
        const data = await responseData.json();



        const tableBody = document.getElementById('tableBody');
        
        tableBody.innerHTML = '';

        for (const item of data) {

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.PersonaE.detalle.detalleF.no_familia}</td>
                <td>${item.PersonaE.nombre}</td>
                <td>${item.tiempo_gestacion  ? item.tiempo_gestacion: '--'}</td>
                <td>${item.lleva_control ? item.lleva_control: '--'}</td>
                <td>${item.lugar_control ? item.lugar_control: '--'}</td>
                <td>${item.telefono ? item.telefono: '--'}</td>
            `;

            tableBody.appendChild(row);
        }

    }catch (error){
        console.log(error)
    }
}

document.getElementById('bt_excel').addEventListener('click', async () =>{
    //const selectComunidad = document.getElementById('selectComunidad');
    const option = selectComunidad.value;

    try{


        const response = await fetch(`/excelGestacion?comunidad=${encodeURIComponent(option)}`);
        if (!response.ok) throw { status: res.status, statusText: res.statusText };
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);


        
        
    }catch (error){
        console.log(error)
    }
});

const buscarSectores = async () =>{
    const option = selectComunidad.value;

    selectSector.innerHTML = "";
    try{
      const responseData = await fetch(`/buscarSectores?comunidad=${encodeURIComponent(option)}`);
      
      if (!responseData.ok) throw { status: res.status, statusText: res.statusText };
      
      const data = await responseData.json();

      for (const item of data) {
        let opcion = document.createElement("option");
        opcion.text = item.nombre
        opcion.value = item.id;
        selectSector.appendChild(opcion);
      }

    }catch (error){
      console.log(error)
    }

  }

  buscarSectores();
