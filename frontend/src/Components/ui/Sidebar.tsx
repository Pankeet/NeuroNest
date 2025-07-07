import { SideBarItems } from "./SidebarItems";
import Twitter from "../icons/twitter";
import Yt from "../icons/yt";
import Docs from "../icons/docs";

export function SideBar(){
    return <div className="fixed top-0 left-0 h-screen bg-white border-r w-64"> 
        <div className="p-3 pt-7 flex flex-col gap-4 font-serif ">
            <SideBarItems text="Twitter" icon={<Twitter />}/>
            <SideBarItems text="Youtube" icon={<Yt />} />
            <SideBarItems text="Documents" icon={<Docs />} />
        </div>
    </div>
}