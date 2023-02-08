export async function obtenerClientes(){
   
    const respuesta = await fetch(import.meta.env.VITE_API_URL) // ese el fetch hacia esa url que tenemos en .env variables de entorno
    const resultado = await respuesta.json()

    return resultado

}

// obtenemos el cliente de nuestra Api Rest
export async function obtenerCliente(id){ // va tomar un id,vamos añadirle un id  al final de la url que queremos obtener
   
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`) 
    const resultado = await respuesta.json()

    return resultado

}

// estamos añadiendo nuevo clientes en nuestro formulario y json-server
export async function agregarCliente(datos){
    try{
     const respuesta = await fetch(import.meta.env.VITE_API_URL,{
        method: 'POST', //post , estamos registrando o creando un nuevo cliente
        body: JSON.stringify(datos), //body son los datos que le vamos a pasar al servidor y como datos es un objeto lo covertirmos a un string 
        headers:{
            'Content-Type': 'application/json'
        }

     })
     await respuesta.json()
    }catch(error){
        console.log(error)
    }
}
 export async function actualizarCliente(id,datos){

    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
           method: 'PUT', //es el verbo http para actualizar
           body: JSON.stringify(datos), //body son los datos que le vamos a pasar al servidor y como datos es un objeto lo covertirmos a un string 
           headers:{
               'Content-Type': 'application/json'
           }
   
        })
        await respuesta.json()
       }catch(error){
           console.log(error)
       }
 }

 export async function eliminarCliente(id){
    
    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
           method: 'DELETE', //es el verbo http para actualizar
          
        })
        await respuesta.json()
       }catch(error){
           console.log(error)
       }
 }