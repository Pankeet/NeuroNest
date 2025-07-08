import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

export interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startingIcon?: ReactElement; 
    endIcon?: ReactElement;  
    onClick?: () => void;    
  }

  const variantStyles = {
      "primary" : "bg-purple-600 text-white",
      "secondary" : "bg-purple-300 text-purple-600"
  }
  const sizestyles = {
    "sm" : "px-2 py-1 text-sm rounded-lg",
    "md" : "px-3 py-2 text-md rounded-xl",
    "lg" : "px-4 py-3 text-lg rounded-xl",
}
  const defaultStyles = 'flex items-center';

  export function Button(props : ButtonProps) {
  
    return (
     <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${defaultStyles} ${sizestyles[props.size]}`}>{props.startingIcon ? <div className="pr-2"> {props.startingIcon} </div> : null}
      {props.text} {props.endIcon ? <div className="pr-1" >{props.endIcon}</div> : null}</button>
    );
  }
  