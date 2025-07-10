import { ShareSvg } from "../icons/share";
interface cardProps {
    title : string;
    link : string;
    description : string
    type : "twitter" | "youtube"
}

export function Card({title , link , description , type }: cardProps){
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

                {type === "youtube" ? <iframe className="w-full h-48"
                                        src={link.replace("watch?v=", "embed/")}
                                        title="YouTube video player"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                        ></iframe>
                                : 
                    <blockquote className="twitter-tweet">
                        <a href={link.replace("x","twitter")}></a> 
                    </blockquote>
                }
            </div>
            <div className="text-lg flex">
                #{description}
            </div>
        </div>
    </div>
}