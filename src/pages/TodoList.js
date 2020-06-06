/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Header from '../components/Header/Header';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ListComponent from '../components/ListCompnent/ListComponent';

const TodoList = (props) =>{

    
    return(
        <div className="c-pageWrapper">
            <Header />
            {
              props.todoList && props.todoList.map((item, index) =>{
                return <ListComponent key={index} item={item} />;
              })
            }
        </div>
    );
}

const mapStateToProps = (state) => {
  return state;
};

export default compose(
  connect(
    mapStateToProps
  )
)(TodoList);