import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, emailVerification,addTodo, deleteTodo } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { modal } from "../utils";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/tr"

dayjs.extend(relativeTime)
dayjs.locale("tr")

function Home() {
  const [todo,setTodo] = useState("")
  const [done,setDone] = useState(true)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const {todos} = useSelector(state=>state.todos)
 


const submitHandle = async e=>{
e.preventDefault()
await addTodo({
  todo,
  uid:user.uid,
  done
})
setTodo("")
}
const handleDelete= async id =>{
  await deleteTodo(id)
}

const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
};
const handleVerification = async () => {
    await emailVerification();
};

  if (user) {
    return (
      <>
        <h1 className="flex gap-x-4 items-center">
          {user.photoURL && (
            <img src={user.photoURL} className="w-8 h-8 rounded-full"></img>
          )}
          Hoşgeldin, {user.displayName} {user.email}
          <Link
            to="/settings"
            className="h-8 px-4 text-sm flex items-center text-white bg-indigo-700"
          >
            Ayarlar
          </Link>
          <button
            onClick={handleLogout}
            className="h-8 px-4 text-sm text-white bg-indigo-700"
          >
            Çıkış Yap
          </button>
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className="h-8 px-4 text-sm text-white bg-indigo-700"
            >
              E posta onayla
            </button>
          )}
        </h1>
        <form className="flex gap-x-4 mt-4" onSubmit={submitHandle}>
          <input type="text"  value={todo} onChange={e=>setTodo(e.target.value)} placeholder="todo yaz" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

            <label>
              <input type="checkbox" checked={done} onChange={e=>setDone(e.target.checked)} /> 
              Tamamlandı oalrak işaretle
            </label>

          <button disabled={!todo} className="inline-flex disabled:opacity-20 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus-outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Ekle
          </button>

        </form>
      
         <ul  className="mt-4 flex flex-col gap-y-2">

         {todos.map((todo)=>(
             <li key={todo.id} className="p-4 flex justify-between imtes-center rounded bg-indigo-50 text-sm text-indigo-700">
               <span className={`${todo.done?"line-through":""}`}>
               {todo.todo}
               </span>
               
                {todo?.createdAt&&<span>{dayjs.unix(todo.createdAt.seconds).fromNow()}</span>}
                

               <div className="flex gap-x-2">
               <button onClick={()=>handleDelete(todo.id)} className="h-7 rounded px-3 text-xs bg-indigo-700 text-white">Delete</button>
               <button onClick={()=>modal("edit-todo-modal",todo)} className="h-7 rounded px-3 text-xs bg-indigo-700 text-white">Update</button>
               </div>
              
             </li>
           ))
         }
         {
          todos.length === 0 &&(
            <li className="p-4 flex justify-between imtes-center rounded bg-orange-50 text-sm text-orange-700">Hiç todo eklemediniz</li>
          )
         }
     </ul>
    
      
      </>
    );
  }

  return (
    <div className="flex  items-center gap-x-8 justify-center">
      <Link to="/register" className="fl text-xl font-bold h-7 rounded px-3  bg-indigo-700 text-white ">Kayıt Ol</Link>
      <Link to="/login" className="text-xl font-bold  h-7 rounded px-3  bg-indigo-700 text-white">Giriş Yap</Link>
      <button onClick={()=>modal("password-reset-modal")} className="h-7  rounded px-3 text-xl bg-indigo-700 text-white">Şifremi unuttum</button>
      <br/> <br/>
   
    </div>
  );
}

export default Home;
