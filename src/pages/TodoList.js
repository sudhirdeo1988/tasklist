/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Alert } from "react-bootstrap";
import Header from "../components/Header/Header";
import List from "../components/List/List";
// import Droppable from "../components/Droppable/Droppable";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { dragDropCard } from "../actions/list.action";

const TodoList = (props) => {
  const [alertMessage, setAlertMessage] = useState({
    status: false,
    message: "",
    type: "success",
  });

  const showAlert = (status, msg, type) => {
    setAlertMessage({
      status: status,
      message: msg,
      type: type,
    });
    setTimeout(() => {
      setAlertMessage({
        status: false,
        message: "",
        type: "success",
      });
    }, 2000);
  };

  const onDragEnd = (result) => {
    if (
      result.source &&
      result.destination &&
      result.source.droppableId &&
      result.destination.droppableId
    ) {
      const newObj = {
        sourseId: result.source.droppableId,
        targetId: result.destination.droppableId,
        dragCardId: result.draggableId,
        destinationIndex: result.destination.index,
      };
      props.dragDropCard(newObj);
    }
  };

  return (
    <div className="c-pageWrapper">
      {alertMessage.status && (
        <Alert className="c-alert" variant={alertMessage.type}>
          {alertMessage.message}
        </Alert>
      )}
      <Header showAlert={showAlert} />
      <div className="c-listBody">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="listGrid">
            {props.todoList &&
              props.todoList.map((item, index) => {
                return (
                  <Droppable droppableId={item.id} key={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <List showAlert={showAlert} item={item} id={item.id} />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dragDropCard,
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(TodoList);
