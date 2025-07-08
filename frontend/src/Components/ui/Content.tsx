import { CrossIcon } from "../icons/cross";
import { Button } from "./Button";
import { Input } from "./Input";

// Controlled Component
export function CreateContent({open , onClose}){
    return (
        <div>
            {open && <div className="w-screen h-screen bg-gray-600 fixed top-0 left-0 bg-opacity-50 flex justify-center items-center" onClick={onClose}>
                <div className="flex justify-center items-center" onClick={(e) => e.stopPropagation()} >
                    <span className="bg-white opacity-100 p-8 text-gray-600 rounded-lg">
                        <div className="flex justify-end">
                            <span className="cursor-pointer" onClick={onClose}><CrossIcon size="lg" /></span>
                        </div>
                        <div className="flex flex-col justify-center items-center w-80">
                            <Input placeholder="Title" />
                            <Input placeholder="link" />
                            <Input placeholder="description" />
                        </div>
                        <div className="flex flex-row justify-center mt-7">
                            <Button variant="primary" text="Submit" size="md" />
                        </div>
                    </span>
                </div>
            </div>}
        </div>
    )

}

