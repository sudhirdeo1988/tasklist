/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Header from "../components/Header/Header";
import { compose } from "redux";
import { connect } from "react-redux";
import List from "../components/List/List";
import Droppable from "../components/Droppable/Droppable";
import { Alert } from "react-bootstrap";

const TodoList = (props) => {
  const [alertMessage, setAlertMessage] = useState(false);
  const [message, setMessage] = useState("");

  const showAlert = (msg) => {
    setMessage(msg);
    setAlertMessage(true);
    setTimeout(() => {
      setAlertMessage(false);
      setMessage("");
    }, 3000);
  };

  return (
    <div className="c-pageWrapper">
      {alertMessage && <Alert variant="success">{message}</Alert>}
      <Header showAlert={showAlert} />
      <div className="c-listBody">
        <div className="listGrid">
          {props.todoList &&
            props.todoList.map((item, index) => {
              return (
                <Droppable id={item.id} key={index}>
                  <List showAlert={showAlert} key={index} item={item} id={item.id} />
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
