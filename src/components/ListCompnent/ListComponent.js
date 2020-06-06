import React from "react";
import CardItem from '../CardItem/CardItem';
import Modal from 'react-modal';
import './ListCompnent.scss';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {addCard, removeList} from '../../reducers/todoListAction';

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

const ListComponent = (props) => {
    const listData = props.item;

    const [isValidInput,setIsValid] = React.useState('');
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [cardName,setcardName] = React.useState('');
    const [modalType,setModalType] = React.useState('addList');

    function openModal(modalActionType) {
        setModalType(modalActionType);
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const setValue = event =>{
        setIsValid('');
        setcardName(event.target.value);
    }

    const addNewCard = () =>{
        if(cardName === ''){
             setIsValid("Please Specify ToDo Task Name!");
             return false;
        }
        props.addCard(cardName,listData.listId);
        setIsOpen(false);
        setcardName(''); 
        setIsValid('');
    }

    const removeList = listId =>{
        openModal('removeList');
        props.removeList(listId);
    }

    return (
    <div className="c-list">
        <span>{listData.listTitle}</span>
        <button className="c-btn" type="button" onClick={()=>openModal('removeList')}>Remove</button>
        {
            listData.listCards.map((item,index) => {
                return <CardItem listData={listData} cardData={item} key={index} />
            })
        }
        <button type="button" title="Add New ToDo Card" data-toggle="tooltip" onClick={()=>openModal('addList')}>Add New Card</button>

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="New List"
            >
                {modalType === 'addList' ? (
                <div>
                    <button onClick={closeModal}>close</button>
                    <div>
                        <input type="text" name="cardName" value={cardName} onChange={(e) => setValue(e)} />
                        <button type="submit" className="cbtn" onClick={addNewCard}>Add Card</button>
                        { isValidInput && <p>{isValidInput}</p> }
                    </div>
                </div>
                ) : (
                    <div>
                        <button className="cbtn" onClick={() => removeList(listData.listId)}>Yes</button>
                        <button className="cbtn" onClick={closeModal}>No</button>
                    </div>
                    ) } 
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
  addCard,
  removeList
},dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ListComponent);