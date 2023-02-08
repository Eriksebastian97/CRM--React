import {useRouteError} from "react-router-dom" // obtener el error del que se este presentando

export default function ErrorPage(){
    const error = useRouteError()
     //mostramos en consola el error y con el message espeficamos cual es el error
     // error.statusText ||  error.message revisa el error message o el error statusText
    return (
        <div className="space-y-8">
            <h1 className="text-center text-6xl font-extrabold mt-20 text-blue-900" >CRM - clientes</h1>
            <p className="text-center">Hubo un Error</p>
            <p className="text-center">{error.statusText ||  error.message}</p> 
        </div>
    )
}
