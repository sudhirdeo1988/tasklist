/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Suspense } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import Spinner from "../components/Spinner/Spinner";

const Header = React.lazy(() => import("../components/Header/Header"));
const List = React.lazy(() => import("../components/List/List"));
const Droppable = React.lazy(() => import("../components/Droppable/Droppable"));

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
      {alertMessage && (
        <Alert className="c-alert" variant="success">
          {message}
        </Alert>
      )}
      <Suspense fallback={<Spinner />}>
        <Header showAlert={showAlert} />
      </Suspense>
      <div className="c-listBody">
        <div className="listGrid">
          {props.todoList &&
            props.todoList.map((item, index) => {
              return (
                <Suspense fallback={<Spinner />} key={index}>
                  <Droppable id={item.id} >
                    <Suspense fallback={<Spinner />}>
                      <List
                        showAlert={showAlert}
                        item={item}
                        id={item.id}
                      />
                    </Suspense>
                  </Droppable>
                </Suspense>
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
