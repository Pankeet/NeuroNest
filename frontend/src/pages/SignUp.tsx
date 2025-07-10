import { useRef , useState } from "react";
//import gsap from "gsap";
import axios from 'axios';
import { BACKEND_URL } from "../config";
import { Button } from "../Components/ui/Button"
import { HidePass } from "../Components/icons/eye";
import { Input } from "../Components/ui/Input";
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [hidepassword ,  setHidepassword] = useState(true); 
    const navigate = useNavigate();


    async function signup(){
        const email = emailRef.current?.value?? "";
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
                const response = await axios.post(BACKEND_URL + "/api/v1/signup" ,data);
                if(response.status == 200){
                    alert("User Created Successfully !");
                    navigate('/login');
                }   
            }catch(error) {
                console.error("Error :- ", error);
                confirm(error?.response?.data?.message);
            }
        }
        }
    return <div className="font-serif w-screen min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="text-4xl">
            SignUp
        </div>
            <form>
                <div className="peer border p-9 pb-4 m-4 border-gray-600 rounded-xl bg-white grid place-content-center">
                    <div className="w-80 mb-3 ">
                        <label htmlFor='email' className="text-lg">Email*</label>
                        <Input type="email" placeholder="UserName" reference={emailRef} />
                    </div>
                  
                    <div className="w-80 mb-2">
                        <div>
                        <label htmlFor='password' className="text-lg">Password*</label>
                        <Input type={`${hidepassword ? "password" : "text"}`} reference={passRef} placeholder="Enter you passwor" />
                        </div>
                    </div>
                    
                    <span className="text-gray-700 text-md">Already a User ? <span className="cursor-pointer font-semibold">Login</span></span>
                </div>
                <div className="ml-[21rem] -translate-y-[102px] cursor-pointer" onClick={() => setHidepassword(!hidepassword)}>
                    <HidePass hidepassword={hidepassword}/>
                </div>
            </form>
                <div className="flex items-center justify-center">
                <Button variant='primary' size="lg" text="Signup" onClick={signup} />
                </div>
        </div>
}