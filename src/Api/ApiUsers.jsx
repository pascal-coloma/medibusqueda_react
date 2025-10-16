export const obtainUsers = async ()=>{
    try{
    const ifoAPI=await fetch("http://demo7636403.mockable.io/clientes")

    if(!ifoAPI.ok) throw Error("No se encontraron usuarios")

    const usuarios= await ifoAPI.json()
    return usuarios
    }catch(error){
        console.log(error)
        return{tutal_users: 0,
               users: []
        }
    }
}
