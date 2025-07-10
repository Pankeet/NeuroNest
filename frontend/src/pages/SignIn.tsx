import { Button } from "../Components/ui/Button"
export default function SignIn({setState}){
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
                        className='w-full px-4 py-2 border mt-1 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'  
                        placeholder='username'></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='password' className="text-lg">Password*</label>
                        <input type="password" 
                        id='password'
                        className='w-full px-4 py-2 border mt-1 rounded-lg focus:ring-2 focus:ring-red-400 outline-none'  
                        placeholder='Enter you email'></input>
                    </div>
                </div>
            </form>
                <div className="flex items-center justify-center">
                <Button variant='primary' size="lg" text="Signup" />
                </div>
        </div>
}