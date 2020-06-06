import React from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { dragDropCard } from "../../actions/list.action";

const Droppable = (props) => {
  const drop = (e) => {
    e.preventDefault();
    const sourceCardId = e.dataTransfer.getData("card");
    const sourceListId = e.dataTransfer.getData("list");

    console.log("source list : " + sourceListId);
    console.log("source card : " + sourceCardId);
    console.log("target list : " + e.target.id);
    props.dragDropCard(e.target.id, sourceListId, sourceCardId);
    e.target.appendChild(document.getElementById(sourceCardId));
  };
  const allowDrop = (e) => {
    e.preventDefault();
  };
  return (
    <div id={props.id} onDrop={drop} onDragOver={allowDrop}>
      {props.children}
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dragDropCard,
    },
    dispatch
  );

export default compose(connect(null, mapDispatchToProps))(Droppable);
