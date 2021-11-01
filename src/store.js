import { configureStore } from '@reduxjs/toolkit'
import  todoListReducer  from './redux/reducers'

export const store = configureStore({
  reducer: {
    todoListReducer,
  },
})