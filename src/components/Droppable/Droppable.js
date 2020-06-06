import React from "react";

const Droppable = (props) => {
    const drop = (e)=>{
        e.preventDefault();
        const data = e.dataTransfer.getData('card');
        const sourceListId = e.dataTransfer.getData('list');
        
        console.log('source list : '+sourceListId);
        console.log('source card : '+data);
        console.log('target list : '+e.target.id);
        e.target.appendChild(document.getElementById(data));
    };
    const allowDrop = (e)=>{
        e.preventDefault();
    }
    return(
    <div id={props.id} onDrop={drop} onDragOver={allowDrop}>
        {props.children}
    </div>
    );
}
export default Droppable;