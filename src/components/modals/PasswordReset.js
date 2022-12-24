import { useState } from "react"
import { passwordReset } from "../../firebase"


export default function PasswordReset ({close}){

    const [email, setEmail] = useState(null)

    const resetPassword =async ()=>{
        await passwordReset({
            email
        })       
        close()
       
    }
    
    return (
       <div>
        <h2 className="mb-3">Sıfırlanıcak Maili Lütfen Giriniz...</h2>
         <input
            type="email"
            className="shadow-sm  focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-400"
            placeholder="you@example.com"
            
            onChange={e => setEmail(e.target.value)}
          />
            <br/>
         
         <button disabled={!email} className="inline-flex mt-1 disabled:opacity-20 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus-outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={resetPassword}>Sıfırla</button>
       </div>
    ) 
}