import gsap from "gsap";
import { useLayoutEffect  } from "react";
import { Button } from "../Components/ui/Button";
import { useNavigate } from "react-router-dom";
import img from "/Logo.png";
import homepageImg2 from "/OnlyRobot.png";

export default function LandingPage(){

    const nav = useNavigate();

    useLayoutEffect(() => {
        const tl = gsap.timeline();
        tl.from("#top-div div", {
            opacity : 0,
            delay : 0.2,
            duration : 0.8,
            y : -20,
            stagger : 0.1
        })
    },[])
    return (
        <div id="top-div" className="h-screen w-full overflow-hidden bg-[url('/HomePageBg.png')] bg-no-repeat bg-cover">
            <div className="m-8 px-10 py-3 bg-gray-700 rounded-lg grid grid-cols-11 place-content-center">
                <div className="flex justify-start text-2xl text-white col-span-2 mt-1">
                    <img src={img} className="w-10 h-10 mr-2 col-span-1" />
                    <span>NeuroLink</span>
                </div>
                <div className="flex justify-center text-white col-span-7 gap-5 text-xl pt-1">
                    <div>Feature</div>
                    <div>Blog</div>
                    <div>About</div>
                </div>
                <div className="col-span-2 flex justify-end gap-4">
                    <Button variant="secondary" text="Signup" onClick={() => nav("/signup")} size="md" />
                    <Button variant="primary" text="Login" onClick={() => nav('/get-started')} size="md" />
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="col-span-1 grid place-content-center font-serif">
                    <span className="text-5xl">
                        Store thoughts
                    </span>
                    
                    <span className="text-4xl"> 
                        and not tabs
                    </span>
                    <br />
                    <span className="text-xl">
                        Second Brain helps you save YouTube and Twitter <br /> content with rich previews.
                        Stop drowning <br /> in open tabs—organize your ideas <br /> into shareable collections.
                        Your curated <br />mindspace, available anytime, anywhere. 
                    </span>
                </div>
                <div className="col-span-1 flex justify-around">
                    <img src={homepageImg2} className="size-96 mt-24 rounded-xl shadow-purple-700 bg-transparent" />
                </div>
                <div className="flex justify-start ml-44 -mt-16">
                    <Button variant="primary" text="Get Started" size="lg" />
                </div>
            </div>
        </div>
    )
}