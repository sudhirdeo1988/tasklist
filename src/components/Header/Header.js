import React from "react";
import Modal from 'react-modal';
import './Header.scss';
import {addNewList} from '../../actions/list.action';
import {MODAL_STYLES} from '../../utilities/constants';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Header = (props) =>{

    const [isValidInput,setIsValid] = React.useState('');
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [listName,setListName] = React.useState('');

    function openModal() {
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const addNewListFunction = () =>{
        if(listName === ''){
            setIsValid("Please Specify ToDo List Name!");
            return false;
        }
        props.addNewList(listName);
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
            onRequestClose={closeModal}
            style={MODAL_STYLES}
            contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <div>
                    <input type="text" name="listName" value={listName} onChange={(e) => setValue(e)} />
                    <button className="cbtn" onClick={addNewListFunction}>Add List</button>
                    { isValidInput && <p>{isValidInput}</p> }
                </div>
            </Modal>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addNewList
},dispatch);

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(Header);