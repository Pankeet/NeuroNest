import { useLayoutEffect, useRef } from "react";
import { CrossIcon } from "../icons/cross";
import { Button } from "./Button";
import { Input } from "./Input";
import { Card } from "./Card";
import gsap from 'gsap';
import axios from 'axios';

interface Content_Be {
    title : string;
    link : string;
    description : string;
}

// Controlled Component
export function CreateContent({open , onClose}){

    const title = useRef<HTMLTextAreaElement>(null);
    const link = useRef<HTMLTextAreaElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);

    useLayoutEffect(()=>{
        if(open){
            gsap.from("#addContentAnimate" , {
                z : -100,
                opacity : 0,
                duration : 0.6,
                delay : 0.2,
                scale : 0.8
            })
        }
    },[open]);

    async function newContent():Promise<void>{

        const title1= title.current?.value ?? '';
        const link1 = link.current?.value ?? '';
        const desc = description.current?.value ?? '';

        const linkRegex = /\b(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}(?::\d{2,5})?(?:\/[^\s]*)?\b/;
        const isValid = linkRegex.test(link1); 
        
        if (title1.trim() === '' || !isValid || desc.trim() === '') {
            return;
        }
        else{
            const data : Content_Be = {
                title : title1,
                link : link1,
                description: desc
            };

            const resp = await axios.post("http://localhost:3001/api/vi/content" , data);
            if(resp.status == 200){
                <Card title={data.title} link={data.link} description={data.description} type={resp.data.type_1}/>
                alert("Content Was Added Successfully !");
            }
            else{
                alert("Unable to create Content");
            }
        }
    }
    return (
        <div>
            {open && <div id="addContentAnimate" className="w-screen h-screen bg-gray-600 backdrop-blur-sm fixed top-0 left-0 flex justify-center items-center" onClick={onClose}>
                <div className="flex justify-center items-center" onClick={(e) => e.stopPropagation()} >
                    <span className="bg-white opacity-100 p-8 text-gray-600 rounded-lg">
                        <div className="flex justify-end">
                            <span className="cursor-pointer" onClick={onClose}><CrossIcon size="lg" /></span>
                        </div>
                        <div className="flex flex-col justify-center items-center w-80">
                            <Input placeholder="Title" type="text"/>
                            <Input placeholder="link" type="text"/>
                            <Input placeholder="description" type ="text-area"/>
                        </div>
                        <div className="flex flex-row justify-center mt-7">
                            <Button variant="primary" text="Submit" size="md" onClick={newContent}/>
                        </div>
                    </span>
                </div>
            </div>}
        </div>
    )

}

