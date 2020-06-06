import React from "react";
import CardItem from '../CardItem/CardItem';
import Modal from 'react-modal';
import {MODAL_STYLES} from '../../utilities/constants';
import './ListCompnent.scss';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {addNewCard, removeList} from '../../actions/list.action';

const ListComponent = (props) => {
    const listData = props.item;

    const [isValidInput,setIsValid] = React.useState('');
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [cardName,setcardName] = React.useState('');
    const [modalType,setModalType] = React.useState('modalType_addlist');

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
        props.addNewCard(cardName,listData.listId);
        setIsOpen(false);
        setcardName(''); 
        setIsValid('');
    }

    const removeListFromTodo = listId =>{
        openModal('modalType_removelist');
        props.removeList(listId);
        closeModal();
    }

    return (
    <div className="c-list">
        <span>{listData.listTitle}</span>
        <button className="c-btn" type="button" onClick={()=>openModal('modalType_removelist')}>Remove</button>
        {
            listData.listCards.map((item,index) => {
                return <CardItem listData={listData} cardData={item} key={index} />
            })
        }
        <button type="button" title="Add New ToDo Card" data-toggle="tooltip" onClick={()=>openModal('modalType_addlist')}>Add New Card</button>

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={MODAL_STYLES}
            contentLabel="New List"
            >
                {modalType === 'modalType_addlist' ? (
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
                        <button className="cbtn" onClick={() => removeListFromTodo(listData.listId)}>Yes</button>
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
  addNewCard,
  removeList
},dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ListComponent);