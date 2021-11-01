import { createReducer } from "@reduxjs/toolkit";
import { TASK_ACTION } from "../constants";

const initialState = {
  taskList: [],
}

const todoListReducer = createReducer(initialState, {
  [TASK_ACTION.ADD_TASK]: (state, action) => {
    return {
      ...state,
      taskList: [...state.taskList, action.payload],
    }
  },
  [TASK_ACTION.DELETE_TASK]: (state, action) => {
    const { id } = action.payload
    const newTaskList = state.taskList.filter((item) => item.id !== id)
    console.log(action.payload)
    console.log(newTaskList)
    return {
      ...state,
      taskList: newTaskList,
    }
  },
  [TASK_ACTION.EDIT_TASK]: (state, action) => { 
    const { id } = action.payload
    const newTaskList = [...state.taskList]
    const taskIndex = newTaskList.findIndex((item) => item.id === id)
    newTaskList.splice(taskIndex, 1, action.payload)
    console.log(action.payload)
    console.log(newTaskList)
    return {
      ...state,
      taskList: newTaskList
    }
  },
})

export default todoListReducer;
