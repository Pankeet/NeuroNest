import { Button } from "../Components/ui/Button"
import { useRef } from "react";
import axios from "axios";
export default function SignIn({setState}){

    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    async function login(){
        const email = emailRef.current?.value?? "";
        const password = passRef.current?.value?? "";

        if(email.trim() === "" || password.trim() === ""){
            alert("Fill the details to login !");
            return ;
        }
        else {
            const data = {
                username : email,
                password : password,
            }
            try{
                const res = await axios.post("http://localhost:3001/api/v1/signin",data);
                if(res.status == 200){
                    setState('dashboard');
                    alert("SignIn Successful !");
                }
            }catch(err){
                console.error(err);
                 confirm(err?.res?.data.message);
            }
        }
    }
    return <div className="w-screen min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="text-4xl">
            SignIn
        </div>
            <form>
                <div className="border p-7 pb-4 m-4 border-gray-600 rounded-xl bg-white">
                    <div className="mb-3 ">
                        <label htmlFor='email' className="text-lg">Email*</label>
                        <input type="email" 
                        id='email'
                        ref={emailRef}
                        className='w-full px-4 py-2 border mt-1 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'  
                        placeholder='username'></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='password' className="text-lg">Password*</label>
                        <input type="password" 
                        id='password'
                        ref={passRef}
                        className='w-full px-4 py-2 border mt-1 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'  
                        placeholder='Enter you email'></input>
                    </div>
                </div>
            </form>
                <div className="flex items-center justify-center">
                <Button variant='primary' size="lg" text="Signup" onClick={login}/>
                </div>
        </div>
}