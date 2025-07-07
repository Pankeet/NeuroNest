import { ShareSvg } from "../icons/share";
interface cardProps {
    title : string;
    link : string;
    type : "twitter" | "youtube"
}

export function Card({title , link , type }){
    return <div>
        <div className="max-w-80 bg-white rounded-md shadow-sm border shadow-gray-100 p-5">
            <div className="flex justify-between items-center">
               <div className="flex items-center text-lg">
                <div className="pr-3 text-gray-500">
                    <ShareSvg size="sm" />
                </div>
                {title}
               </div>
               <div className="flex text-gray-500">
                <div className="px-3">
                    <ShareSvg size="sm" />
                </div>
                <ShareSvg size="sm" />
               </div>
            </div>
            <div className="pt-6">
                {/*Ek vaaar  type=== '&&' try karje*/}
                {type === "youtube" ? <iframe className="w-full h-48" src={link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> : 
                    <blockquote className="twitter-tweet">
                        <a href={link.replace("x","twitter")}></a> 
                    </blockquote>
                }
            </div>
        </div>
    </div>
}