import React, { useMemo, useState} from 'react';

import { Card, Button, Row, Form, Input } from 'antd';

function TodoItem({ data, id, handleDeleteTask, handleEditTask}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editForm] = Form.useForm();

  const renderItemEdit = useMemo(() => {
    return (
      <Form
        form={editForm}
        name={`editTask-${id}`}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ 
          title: data.title,
          description: data.description,
        }}
        onFinish={(values) => {
          handleEditTask(id, values)
          setIsEdit(false)         
        }}
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
      </Form>
    )
  }, [data])

  const renderItem = useMemo(() => {
    return (
      <>
      <div>Title: {data.title} </div>
      <div>Description: {data.description} </div>
      </>
    )
  }, [data])

  return (
    <Card
      title = {
        <Row justify="end">
          {isEdit
            ? (
              <>
              <Button 
                type="primary" 
                style={{ marginRight: 8}} 
                onClick={() => {
                  editForm.submit()
                }}
                >
                OK
              </Button>
              <Button 
                type="primary" 
                ghost 
                style={{ marginRight: 8}} 
                onClick={() => setIsEdit(false)}
                >
                Cancel
              </Button>
              </>
            )
            : (
              <Button 
              type="primary" 
              ghost 
              style={{ marginRight: 8}} 
              onClick={() => setIsEdit(true)}
              >
                Edit
              </Button>           
            )
          }
          <Button 
          danger
          onClick = {() => handleDeleteTask(id)}
          >
            Delete
          </Button>
        </Row>
      }
      style={{ marginTop: 16 }}
    >
      {isEdit ? renderItemEdit : renderItem }
    </Card>
  )
}

export default TodoItem
