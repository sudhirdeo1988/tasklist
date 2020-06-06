import React from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { addNewCard, removeList } from "../../actions/list.action";
import Card from "../Card/Card";
import "./List.scss";

const List = (props) => {
  const listData = props.item;
  const [cardName, setcardName] = React.useState("");
  const [modalType, setModalType] = React.useState("modalType_addlist");
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function openModal(modalActionType) {
    setModalType(modalActionType);
    handleShow();
  }

  const setValue = (event) => {
    setcardName(event.target.value);
  };

  const addNewCard = () => {
    props.addNewCard(cardName, listData.id);
    handleClose();
    setcardName("");
    props.showAlert('Card Added');
  };

  const removeListFromTodo = (listId) => {
    openModal("modalType_removelist");
    props.removeList(listId);
    handleClose();
    props.showAlert('List Removed');
  };

  return (
    <div className="c-list">
      <div className="listHeader">
        <Row className="align-items-center">
          <Col xs={9}>
            <span className="listTitle">{listData.name}</span>
          </Col>
          <Col xs={3}>
            <button
              className="btnRemove"
              type="button"
              onClick={() => openModal("modalType_removelist")}
            >
              <CloseIcon />
            </button>
          </Col>
        </Row>
      </div>

      {listData.cards.map((cardItem, index) => {
        return <Card showAlert={props.showAlert} listData={listData} cardData={cardItem} key={index} />;
      })}
      <Button
        startIcon={<AddIcon />}
        onClick={() => openModal("modalType_addlist")}
        color="primary"
        size="small"
        className="c-btn"
      >
        Add New Card
      </Button>

      <Modal show={show} onHide={handleClose} className="c-Modal">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "modalType_addlist"
              ? "Add New Card"
              : "Remove List"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "modalType_addlist" ? (
            <ValidatorForm
              onSubmit={addNewCard}
              onError={(errors) => console.log(errors)}
            >
              <div className="mb-20">
                <TextValidator
                  label="Card Name"
                  variant="outlined"
                  name="cardName"
                  className="w100"
                  value={cardName}
                  onChange={(e) => setValue(e)}
                  validators={["required"]}
                  errorMessages={["Please enter card name"]}
                />
              </div>
              <div className="t-center">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="c-btn"
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </ValidatorForm>
          ) : (
            <div>
              <div className="t-center">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="c-btn"
                  type="button"
                  onClick={() => removeListFromTodo(listData.id)}
                >
                  Yes
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  className="c-btn"
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNewCard,
      removeList,
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(List);
