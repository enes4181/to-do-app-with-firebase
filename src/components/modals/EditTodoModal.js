import { useState } from "react"
import { updateTodo } from "../../firebase"


export default function EditTodoModal ({close,data}){
    const [todo,setTodo] = useState(data.todo)
  
    const [done,setDone] = useState(data.done)
    const clickHandle =async ()=>{
        await updateTodo(data.id,{
            todo,
            done
        })
        close()
    }

    return (
        <div>
       <input className="mb-2" type="text" value={todo} onChange={e=>setTodo(e.target.value)}/><br/>
       <label>
       <input type="checkbox" checked={done} onChange={e=>setDone(e.target.checked)}/>
       Tamamlandı olarak işaretle
       </label><br/>
       <button className="inline-flex mt-3 disabled:opacity-20 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus-outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={clickHandle}>Kaydet</button>
       </div>
    ) 
}