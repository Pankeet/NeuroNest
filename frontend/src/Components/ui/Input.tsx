interface InputProps {
    onChange : ()=>void;
    placeholder : string;
}
export function Input({onChange , placeholder}:InputProps){
    return <div className="w-full my-2">
                <input className="flex rounded-sm p-3 w-full border-b-2 border-black justify-center items-center focus:outline-none" 
                 type="text" 
                 placeholder={placeholder} 
                 onChange={onChange} />
            </div>
};