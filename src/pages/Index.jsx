import { useLoaderData } from "react-router-dom" // con este hook vamos a poder acceder a lo que hallamos retornado
import { obtenerClientes } from "../data/clientes";
import Cliente from "../components/Cliente";


export function loader(){ //exportamos loader se comporta similiar a un useffect , se va ejecutar cuando el componente este listo
// console.log(import.meta.env)

const clientes = obtenerClientes() //mandamos a llamar a esa funcion y siempre loader tiene que retorna algo

return clientes
}

const Index = () => {

const clientes= useLoaderData() //lo que colocamos en el return va estar disponible en esta parte //useLoaderData cuando quieras obtener el resultado de un loader tiene que tener un return 

// console.log(clientes)
//error boundaries en react : es un error cuando carga un componente en este caso esta dentro un loader , son componentes de react que obtienen los errores en cualquier lugar del componente
//ademas de mostrar los errores cuando ocurre ,tambien muestra los errores y una interfaz en  el lugar del componente que causo este error

  return (
    <>  
    <h1 className="font-black text-4xl text-blue-900">clientes</h1>
    <p className="mt-3">Administra tus Clientes </p>

    {clientes ? (
    <table className="w-full bg-white shadow mt-5 table-auto">
      <thead className="bg-blue-800 text-white">
         <tr>
          <th className="p-2">Clientes</th>
          <th className="p-2">Contacto</th>
          <th className="p-2">Acciones</th>
         </tr>
         </thead>

         <tbody>
          {clientes.map(cliente=>( 
            <Cliente
            cliente={cliente}
            key={cliente.id}
            />
          ))}
         </tbody>

    </table>
    ):(
      <p className="text-center mt-10">No hay Clientes aun</p>
    )}
    
    </>
  )
}

export default Index