import React, { useEffect } from "react";
import Header from '../components/Header/Header';
import {setWebStorage, getWebStorage} from '../utilities/utilityFunctions';
import { LIST_CONSTANTS } from "../utilities/constants";
import { compose } from 'redux';
import { connect } from 'react-redux';

const TodoList = (props) =>{

  const data = getWebStorage();
  
    useEffect(() => {
        setWebStorage();
        props.todoListReducer(data);
    }, [data, props]);



    return(
        <div className="c-pageWrapper">
            <Header />
        </div>
    );
}


const mapDispatchToProps = (dispatch) => {
  return {
    todoListReducer: (payload) =>{
      console.log(payload)
      dispatch({ type: LIST_CONSTANTS.ADD.LIST, payload })
    }

  };
};
  
  export default compose(
    connect(
      null,
      mapDispatchToProps
    )
  )(TodoList);