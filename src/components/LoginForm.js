import { useState } from "react";

export default function LoginForm({handleSubmit,noEmail=false}){

const [email, setEmail] = useState(noEmail?true:"");
const [password, setPassword] = useState("");

const handle = e =>{
    handleSubmit(e,email,password)
}

return (
    <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handle}>
     {!noEmail &&(
      <div>
        <label className="block text-sm font-medium text-gray-700">
          E-Posta
        </label>
        <div className="mt-1">
          <input
            type="email"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-400"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
     )}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Parola
        </label>
        <div className="mt-1">
          <input
            type="password"
           
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-400"
            placeholder="passowrd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

    
     <div>
     {/* disabled={!email||!password} */}
     <button 

     className="inline-flex disabled:opacity-20 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus-outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Gİriş Yap</button>
     </div>
    </form>
  );

}