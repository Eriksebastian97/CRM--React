import {Form , useNavigate,useLoaderData, useActionData,redirect} from "react-router-dom"
import { obtenerCliente,actualizarCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

// definimos un loader cuando cargue el componente de editar cliente
export async function loader({params}){ //obtnemos el valor de la url mediante params obtenemos en este caso el valor de la variable de la url
   const cliente = await obtenerCliente(params.clienteId) // pasamos el id que estamos obteniedo y lo comunicamos con el servidor  
    if(Object.values(cliente).length === 0){
      throw new Response("",{ //como valor inicial toma un valor vacio , le pasamos un objeto
        status:404, // un sitio web cuando no es encontrado marcamos error 404
        statusText:"El cliente no fue encontrado" // tambien le cambiamos el texto , tambien podemos crear unos propios mensajes de error
      })
    }
   
  //  console.log(cliente)
   return cliente
}

export async function action ({request,params}){
  const formData = await request.formData()                    //el formData es la forma de acceder a la informacion de un formulario
  

  //diferentes formas de acceder a un formulario y obtener esos valores que fueron ingresados a un formulario para poderlo validar o enviarlos a una API 
  const datos = Object.fromEntries(formData)
  //validacion
  const email = formData.get("email") //validar un campo en especifico

  const errores = []
  if(Object.values(datos).includes("")){
    errores.push("Todos los campos son obligatorios")
  }

  // la mejor forma de validar un email es con una exprecion regular como esta
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  
  if(!regex.test(email)){ //la mejor forma de comprobar o ejecutar una exprecion regular es mediante un if , utilizamos .test es un metodo que existe cuando crear una exprecion regular y le pasamos el campo que queremos validar en este caso email
    errores.push("el Email no es valido") // regex.test(email) evalua si el mail cumple con el formato de la exprecion regular en este caso es false y no se ejecuta en este caso , lo que tenemos que hacer es negarlo con un ! , en caso que no se cumpla la condicion entonces agrega errores 
  }


 //se valida nuevamente si esta el formulario se lleno o paso la validacion 
  if(Object.keys(errores).length){
    return errores
  }

  //Actualizar el Cliente
  await actualizarCliente(params.clienteId,datos)
  // console.log(datos)
  // console.log([...formData])
  // console.log(formData.get("nombre"))

  return redirect("/") //redirencionamos la pagina a la pagina principal
  // navigate es bueno si queremos redirecionar por medio de un boton
  // linl es ideal para crear un barra de navegacion y permitirle al usuario navegar
  // y utilizamos redirect cuando vallamos redireccionar al usuario en action y en louder y cada una se utiliza en acciones en especifico
}


const EditarCliente = () => {

  const navigate = useNavigate()
 const cliente = useLoaderData()
 const errores = useActionData()

 console.log(cliente)

  return (
    <>
    <h1 className="font-black text-4xl text-blue-900">Editar CLiente</h1>
    <p className="mt-3">Podras modificar las datos de un cliente</p>

    <div className="flex justify-end">
     <button
     className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
     onClick={()=> navigate("/")}
     >
     Volver
     </button>
     </div>

     <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10">
      
      {errores?.length && errores.map((error,i)=><Error key={i}>{error}</Error>)} 
      <Form
      method="post"
      noValidate
      
      > 
      <Formulario
      cliente={cliente}
      />
       <input 
       type="submit"
       className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
       value="Guardar Cliente"
       />
       </Form>
     </div>
    
   </>
  )
}

export default EditarCliente