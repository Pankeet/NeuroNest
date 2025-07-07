import type { ReactElement } from "react";

interface SbProps {
    text : string;
    icon : ReactElement;
}
export function SideBarItems({text , icon}: SbProps){
    return (
        <div className="flex gap-3 items-center">
            {icon} {text}
        </div>
    )
}