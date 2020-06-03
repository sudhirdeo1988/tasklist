import React from "react";
import Modal from 'react-modal';
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
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
      // references are now sync'd and can be accessed.
    }

    function closeModal(){
        setIsOpen(false);
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
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
            </Modal>
        </div>
    );
}

export default Header;