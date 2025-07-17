import { SideBarItems } from "./SidebarItems";
import Twitter from "../icons/twitter";
import Yt from "../icons/yt";
import Docs from "../icons/docs";
import { Button } from "./Button";
//import Links from "../icons/links";

function logout(){
    localStorage.removeItem("token");
}

export function SideBar(){
    return <div className="fixed top-0 left-0 h-screen bg-white border-r w-64"> 
        <div className='p-3 flex-row gap-1 flex items-center text-2xl'>
            <img src="/Logo.png" alt="Logo" className="w-10 h-10" />
            <span>NeuroLink</span>
        </div>
        
        <div className="p-3 ml-1 pt-7 flex flex-col gap-2 font-serif">
            <SideBarItems text="Twitter" icon={<Twitter />}/>
            <SideBarItems text="Youtube" icon={<Yt />} />
            <SideBarItems text="Documents" icon={<Docs />} />
            {/*<SideBarItems text="Links" icon={<Links />} /> */}
        </div>
        <div className="flex lg:mt-96 ml-4 justify-start">
            <Button variant="primary" size="md" text="Logout" onClick={logout}/>
        </div>
    </div>
}