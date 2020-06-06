import React from "react";
import Modal from 'react-modal';
import './Header.scss';
import {setData} from '../../reducers/todoListAction';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

const Header = (props) =>{

    const [isValidInput,setIsValid] = React.useState('');
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [listName,setListName] = React.useState('');
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
      // references are now sync'd and can be accessed.
    }

    function closeModal(){
        setIsOpen(false);
    }

    const addNewList = () =>{
        if(listName === ''){
            setIsValid("Please Specify ToDo List Name!");
            return false;
        }
        props.setData(listName);
        setIsOpen(false);
        setListName('');
        setIsValid('');
    }
    const setValue = event =>{
        setIsValid('');
        setListName(event.target.value);
    }

    return(
        <div className="c-header">
            <h1 className="pageTitle">Header</h1>
            <button className="c-btn" title="Add New ToDo List" data-toggle="tooltip" onClick={openModal}>Add New List</button>

            <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <div>
                    <input type="text" name="listName" value={listName} onChange={(e) => setValue(e)} />
                    <button className="cbtn" onClick={addNewList}>Add List</button>
                    { isValidInput && <p>{isValidInput}</p> }
                </div>
            </Modal>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setData
},dispatch);

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(Header);