import React from "react";
import Modal from 'react-modal';
import {createNewList} from '../../utilities/utilityFunctions';
import './Header.scss';

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
        createNewList(listName);
        setIsOpen(false);
    }
    const setValue = event =>{
        setListName(event.target.value);
    }

    return(
        <div className="c-header">
            <h1 className="pageTitle">Header</h1>
            <button className="c-btn" onClick={openModal}>Add New List</button>

            <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
                {listName}
                <button onClick={closeModal}>close</button>
                <div>
                    <input type="text" name="listName" value={listName} onChange={(e) => setValue(e)} />
                    <button className="cbtn" onClick={addNewList}>List</button>
                </div>
            </Modal>
        </div>
    );
}

export default Header;