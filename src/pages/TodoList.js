/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import Header from "../components/Header/Header";
import List from "../components/List/List";
import Droppable from "../components/Droppable/Droppable";

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

  return (
    <div className="c-pageWrapper">
      {alertMessage.status && (
        <Alert className="c-alert" variant={alertMessage.type}>
          {alertMessage.message}
        </Alert>
      )}
      <Header showAlert={showAlert} />
      <div className="c-listBody">
        <div className="listGrid">
          {props.todoList &&
            props.todoList.map((item, index) => {
              return (
                <Droppable id={item.id} key={index}>
                  <List showAlert={showAlert} item={item} id={item.id} />
                </Droppable>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default compose(connect(mapStateToProps))(TodoList);
