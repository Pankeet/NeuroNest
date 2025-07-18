import { Button } from "../Components/ui/Button"
import { useRef } from "react";
import axios from "axios";
import { Input } from "../Components/ui/Input";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
export default function SignIn(){

    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    function toSignup(){
        navigate('/signup')
    }

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
                const res = await axios.post(BACKEND_URL + "/api/v1/signin", data);
                if(res.status == 200){
                    localStorage.setItem("token", res?.data.token);
                    alert("SignIn Successful !");
                    navigate('/dashboard');
                }
            }catch(err){
                console.error(err);
                // @ts-ignore
                 alert(err?.response?.data.message || err?.message) ;
            }
        }
    }
    return <div className="min-w-screen min-h-screen bg-gray-100 flex flex-col justify-center items-center font-serif">
        <div className="text-4xl">
            SignIn
        </div>
            <form>
                <div className="w-full border p-6 pb-4 m-4 border-gray-600 rounded-xl bg-white grid place-content-center">
                    <div className="w-80 mb-3">
                        <label htmlFor='email' className="text-lg">Email*</label>
                        <Input type="email" placeholder="Username" reference={emailRef} />
                    </div>
                    <div className="w-80 mb-1">
                        <label htmlFor='password' className="text-lg">Password*</label>
                        <Input type="password" placeholder="Password" reference={passRef} />
                    </div>
                    <span className=" text-md text-gray-700">Not a User ? <span className="cursor-pointer font-semibold" onClick={toSignup}>SignUp</span></span>
                </div>
            </form>
                <div className="flex items-center justify-center">
                <Button variant='primary' size="lg" text="SignIn" onClick={login}/>
                </div>
        </div>
}