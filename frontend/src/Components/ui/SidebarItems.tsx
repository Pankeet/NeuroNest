import type { ReactElement } from "react";

interface SbProps {
    text : string;
    icon? : ReactElement ;
}
export function SideBarItems({text , icon }: SbProps){
    return (
        <div className=" transition-all duration-150 flex gap-1 p-2 items-center cursor-pointer hover:bg-gray-300 max-w-40 rounded-lg">
            {icon} {text}
        </div>
    )
}