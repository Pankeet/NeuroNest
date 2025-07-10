interface InputProps {
    type : string;
    placeholder : string;
    onChange? : ()=>void;
}
export function Input({type , placeholder , onChange }:InputProps){
    return <div className="w-full my-2">
                <input className="flex rounded-sm p-3 w-full border-b-2 border-black justify-center items-center focus:outline-none" 
                 type={type}
                 placeholder={placeholder} 
                 onChange={onChange} />
            </div>
};