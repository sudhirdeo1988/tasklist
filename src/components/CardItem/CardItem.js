import React from "react";
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {MODAL_STYLES} from '../../utilities/constants';
import { removeCardFromList} from '../../actions/list.action';
import './CardItem.scss';

Modal.setAppElement('*');

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
            style={MODAL_STYLES}
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