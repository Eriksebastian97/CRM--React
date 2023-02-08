import {useNavigate ,Form,useActionData , redirect} from "react-router-dom" //importar el componente form para acceder a sus herramientas tambien extramos  useActionData para obtener o leer la informacion del action en nuestros componentes 
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { agregarCliente } from "../data/clientes"


export async function action({request}){ //action es un archivo o una url donde se envia los datos del formulario , es la accion del usuario con toda la informacion del formulario
  // console.log(request) // es un action casi siemre se presenta un request , el request es una peticion que estas realizando a este action por ejemplo , colocar datos en el formData y despues enviarlo a un servidor
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

  //cuando pase la validacion se va agregar el cliente
  await agregarCliente(datos)
  // console.log(datos)
  // console.log([...formData])
  // console.log(formData.get("nombre"))

  return redirect("/") //redirencionamos la pagina a la pagina principal
  // navigate es bueno si queremos redirecionar por medio de un boton
  // linl es ideal para crear un barra de navegacion y permitirle al usuario navegar
  // y utilizamos redirect cuando vallamos redireccionar al usuario en action y en louder y cada una se utiliza en acciones en especifico
}


// errores?.length && errores.map((error,i)=><Error key={i}>{error}</Error>
// el ? optional channing permite leer el valor de una propiedad ubicada dentro de una  cadena de objetos conectados
// ejemplo : si hay algo: errores?.length && se manda a llamar esta otra errores.map
//ejemplo : en caso que se cumpla esta condiccion && llamamos esta
//iteramos con el .map
// el key{i} si tenemos multiples errores que seria la posicion que tendria ese error en el arreglo
//evitar el key sobre todo cuando hay datos que pueden cambiar por ejemplo clientes o eliminar


//noValiDate nos va a sacar la validacion de html5
const NuevoCliente = () => {

  const errores = useActionData()  //useActionData cuando quieras obtener el resultado de un action
  const navigate = useNavigate()

  console.log(errores)
  return (
   <>
    <h1 className="font-black text-4xl text-blue-900">Nuevo CLiente</h1>
    <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

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
      <Formulario />
       <input 
       type="submit"
       className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
       value="Registrar Cliente"
       />
       </Form>
     </div>
    
   </>
  )
}

export default NuevoCliente