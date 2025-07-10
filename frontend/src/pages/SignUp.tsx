import { Button } from "../Components/ui/Button"
//import gsap from "gsap";
import axios from 'axios';
import { useRef , useLayoutEffect } from "react";

export default function SignIn({setstate}){
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    async function signup(){
        const email:string = emailRef.current?.value?? "";
        const password = passRef.current?.value?? "";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = emailRegex.test(email);

        if( !isValid || password?.trim() === ""){
            alert("Please fill the details first");
            return ;
        }   else{
            const data = {
                username : email,
                password : password
            }

            try{
                const response = await axios.post("http://localhost:3001/api/v1/signup" ,data);
                if(response.status == 200){
                    setstate("login");
                    alert("User Created Successfully !");
                }   
            }catch(error) {
                console.error("Error :- ", error);
                confirm(error?.response?.data?.message);
            }
        }
        }
    return <div className="w-screen min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="text-4xl">
            SignUp
        </div>
            <form>
                <div className="peer border p-7 pb-4 m-4 border-gray-600 rounded-xl bg-white">
                    <div className="mb-3 ">
                        <label htmlFor='email' className="text-lg">Email*</label>
                        <input type="email" 
                        id='email'
                        ref={emailRef}
                        className='w-full px-4 py-2 border mt-1 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'  
                        placeholder='Enter you email'></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='password' className="text-lg">Password*</label>
                        <input type="password" 
                        id='password'
                        ref={passRef}
                        className='w-full px-4 py-2 border mt-1 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'  
                        placeholder='Enter you password'></input>
                    </div>
                </div>
            </form>
                <div className="flex items-center justify-center">
                <Button variant='primary' size="lg" text="Signup" onClick={signup} />
                </div>
        </div>
}