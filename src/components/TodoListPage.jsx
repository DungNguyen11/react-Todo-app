
import React, {useState, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidV4} from 'uuid';
import { addTaskAction, deleteTaskAction, editTaskAction} from '../redux/actions'

// import { todoListReducer } from '../redux/reducers'
import {Form, Input, Button, Card } from 'antd';
import TodoItem from './TodoItem'

function TodoList() {
  // const [taskList, setTaskList] = useState([]);
  const { taskList } = useSelector((state) => state.todoListReducer);
  const dispatch = useDispatch();

  const handleAddTask = (values) => {
    // setTaskList([ values, ...taskList])
    dispatch(addTaskAction(
      {
        ...values,
      id: uuidV4(),
      }
    ))
  };

  const handleDeleteTask = (id) => {
    // const newTaskList = [...taskList]
    // newTaskList.splice(index, 1)
    // setTaskList(newTaskList)

    dispatch(deleteTaskAction({ id }))
  }

  const handleEditTask = (id, values) => {
    // const newTaskList = [...taskList]
    // newTaskList.splice(index, 1, values)
    // setTaskList(newTaskList)

    dispatch(editTaskAction(
      {
      id,
      ...values,
      }
      ))
      console.log(values)
  }

  const renderTaskItem = useMemo(() => {
    return taskList.map((taskItem, taskIndex) => {
      return (
        <TodoItem
          key={taskIndex}
          data={taskItem}
          id={taskItem.id}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      );
    });
  }, [taskList]);

  return (
    <div >
      <Card title ="To Do List">
        <Form
          name="addTask"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={(values) => handleAddTask(values)}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { 
                required: true, 
                message: 'Please input your Title!' 
              },
              {
                min: 2,
                max: 32,
                message: "Title must be in 2-32 characters range"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { 
                required: true, 
                message: 'Please input your Description!' 
              }
            ]}
          >
            <Input/>
          </Form.Item>
          <Button 
            type="primary" block
            htmlType="submit"
          >
            ADD
          </Button>
        </Form>
      </Card>
      {renderTaskItem}
    </div>
  );
}

export default TodoList;

