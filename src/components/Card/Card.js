import React, { useState } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { removeCard } from "../../actions/list.action";
import "./Card.scss";

const Card = (props) => {
  const { listData, cardData } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeCard = (listId, cardId) => {
    props.removeCard(listId, cardId);
    handleClose();
    props.showAlert(true, `Card removed successfully`, "success");
  };
  return (
    <div className="c-cardItem" id={props.id} listid={props.listId}>
      <div className="cardHeader">
        <Row className="align-items-center">
          <Col xs={9}>
            <span className="cardTitle">{cardData.name}</span>
          </Col>
          <Col xs={3}>
            <button
              className="btnRemove"
              type="button"
              title="Remove Card"
              onClick={() => handleShow()}
            >
              <CloseIcon />
            </button>
          </Col>
        </Row>

      </div>
      <div className="cardBody">
        <Row className="align-items-center">
            <Col xs={12}>
              <span className="cardDesc">{cardData.description}</span>
            </Col>
          </Row>
      </div>

      <Modal show={show} onHide={handleClose} className="c-Modal">
        <Modal.Header closeButton>
          <Modal.Title>Remove Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="c-modalMessage">
            Are you sure want to remove {cardData.name} Card from the list?
          </div>
          <div className="t-center">
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="c-btn"
              type="button"
              onClick={() => removeCard(listData.id, cardData.id)}
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
      removeCard,
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(Card);
