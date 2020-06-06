import React from "react";

const Draggable = (props) => {
    const drag = (e)=>{
        e.dataTransfer.setData('card',props.id);
        e.dataTransfer.setData('list',props.listid);
    };
    const noAllowDrop = (e)=>{
        e.stopPropagation();
    }
    return(
    <div draggable="true" id={props.id} onDragStart = {drag} onDragOver = {noAllowDrop}>
        {props.children}
    </div>
    );
}
export default Draggable;