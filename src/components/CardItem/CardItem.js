import React from "react";
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './CardItem.scss';
import { removeCardFromList} from '../../reducers/todoListAction';

import Modal from 'react-modal';
Modal.setAppElement('*');
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

const CardItem = (props) => {

    const {listData, cardData} = props;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const removeCard = (listId, cardId) =>{
        props.removeCardFromList(listId, cardId);
        closeModal();
    }
    return (
    <div className="c-cardItem">
        <span>{cardData.cardName}</span>
        <button type="button" onClick={()=>openModal()}>Remove</button> 
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="New List"
            >
              <div>
                  <button className="cbtn" onClick={() => removeCard(listData.listId, cardData.cardId)}>Yes</button>
                  <button className="cbtn" onClick={closeModal}>No</button>
              </div>
            </Modal>
    </div>
    );
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    removeCardFromList
  },dispatch);
  
  export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(CardItem);