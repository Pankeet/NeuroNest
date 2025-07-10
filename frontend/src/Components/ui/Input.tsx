import type { RefObject } from "react";

interface InputProps {
    type : string;
    placeholder : string;
    reference ?: RefObject<HTMLInputElement | null>;
}
export function Input({type , placeholder , reference}:InputProps){
    return <div className="w-full my-2">
                <input className="w-full px-4 py-2 border mt-1 rounded-lg focus:ring-2 focus:ring-red-400 outline-none" 
                 type={type}
                 placeholder={placeholder} 
                 ref = {reference}
                />
            </div>
};