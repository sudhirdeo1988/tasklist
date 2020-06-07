import React, { useState } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { addNewList } from "../../actions/list.action";
import "./Header.scss";

const Header = (props) => {
  const [listName, setListName] = React.useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addNewListFunction = () => {
    const isListExist = props.todoList.some((el) => el.name === listName);
    console.log(props.todoList);
    if (!isListExist) {
      props.addNewList(listName);
      setShow(false);
      setListName("");
      props.showAlert(true, 'List Added Successfuly', 'success');
    } else {
      setShow(false);
      props.showAlert(true, 'List Already Exist', 'danger');
      setListName("");
    }
  };
  const setValue = (event) => {
    setListName(event.target.value);
  };

  return (
    <div className="c-header">
      <Container fluid>
        <Row className="align-items-center">
          <Col md={4} xs={12}>
            <h1 className="pageTitle">Tasklist Dashboard</h1>
          </Col>
          <Col md={8} xs={12} className="t-right">
            <Button
              startIcon={<AddIcon />}
              onClick={handleShow}
              variant="contained"
              color="primary"
              size="small"
              className="c-btn"
            >
              Create List
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} className="c-Modal">
        <Modal.Header closeButton>
          <Modal.Title>Create List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ValidatorForm
            onSubmit={addNewListFunction}
            onError={(errors) => console.log(errors)}
          >
            <div className="mb-20">
              <TextValidator
                label="List Name"
                onChange={setValue}
                variant="outlined"
                name="listName"
                className="w100"
                value={listName}
                validators={["required"]}
                errorMessages={["Please enter list name"]}
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
        </Modal.Body>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(`state`, state);
  return state;
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNewList,
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(Header);
