const btnRecuperarPassword = document.getElementById('btn_recuperar_password');

btnRecuperarPassword.addEventListener('click', async () =>{
    const correo = document.getElementById('ipt_correo');
    
    if(!correo.value){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ingrese el correo',
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }

    const data = {
        correo_recuperacion : correo.value
    };
    try {
        const response = await fetch("/recuperar_password",{
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();

        if(responseData.ok){
            Swal.fire({
                icon: 'success',
                title: 'Contraseña restablecida',
                text: responseData.nuevo_password,
            });
            correo.value = '';
        }else{
            Swal.fire({
                icon: 'error',
                title: 'No se pudo restablecer la contraseña',
                text: responseData.msg
            });
        }
        
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrio un error intente mas tarde',
        })
    }
    
});