import React, { Suspense, useState } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { addNewCard, removeList } from "../../actions/list.action";
import Spinner from "../Spinner/Spinner";
import "./List.scss";

const Card = React.lazy(() => import("../Card/Card"));
const Draggable = React.lazy(() => import("../Draggable/Draggable"));

const List = (props) => {
  const listData = props.item;
  const [cardData, setcardData] = useState({
    cardName: '',
    cardDescription: ''
  });
  const [modalType, setModalType] = useState("modalType_addlist");
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function openModal(modalActionType) {
    setModalType(modalActionType);
    handleShow();
  }

  const setValue = (event) => {
    console.log(event.target.value);
    cardData[event.target.name] = event.target.value;
    console.log(cardData)
    setcardData({...cardData});
  };

  const addNewCard = () => {
    const isCardExistInList = listData.cards.some((el) => el.name === cardData.cardName);
    if (!isCardExistInList) {
      props.addNewCard(cardData, listData.id);
      handleClose();
      setcardData({
        cardName: '',
        cardDescription: ''
      });
      props.showAlert(true, "Card added successfully", "success");
    } else {
      handleClose();
      setcardData({
        cardName: '',
        cardDescription: ''
      });
      props.showAlert(true, "Card already exist in same list", "danger");
    }
  };

  const removeListFromTodo = (listId) => {
    openModal("modalType_removelist");
    props.removeList(listId);
    handleClose();
    props.showAlert(true, "List removed successfully", "success");
  };

  return (
    <div className="c-list" id={props.id}>
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
        return (
          <Suspense fallback={<Spinner />} key={index}>
            <Draggable id={cardItem.id} listid={props.id}>
              <Suspense fallback={<Spinner />}>
                <Card
                  showAlert={props.showAlert}
                  listData={listData}
                  cardData={cardItem}
                />
              </Suspense>
            </Draggable>
          </Suspense>
        );
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
            {modalType === "modalType_addlist" ? "Add New Card" : "Remove List"}
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
                  value={cardData.cardName}
                  onChange={(e) => setValue(e)}
                  validators={["required"]}
                  errorMessages={["Please enter card name"]}
                />
                <TextValidator
                  label="Card Description"
                  variant="outlined"
                  name="cardDescription"
                  className="w100"
                  value={cardData.cardDescription}
                  onChange={(e) => setValue(e)}
                  validators={["required"]}
                  errorMessages={["Please enter description"]}
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
              <div className="c-modalMessage">
                Are you sure you want to remove list from dashboard.?
              </div>
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
