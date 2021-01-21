import Ball from "../components/Ball/Ball"
import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Menu } from 'antd'
import {PlusOutlined, GlobalOutlined } from '@ant-design/icons'
import GlobalBall from "../components/Ball/GlobalBall"

import {
  CREATE_PROJECT_MUTATION
} from '../graphql'

import { Form, Input, InputNumber, Button } from 'antd';

const BallPool = ({ user }) => {
  const [focusProject, setFocusProject] = useState(-1)
  const [createProject] = useMutation(CREATE_PROJECT_MUTATION);

  const handleClick = e => {
    if (e.key === "global_ball") {
      setFocusProject(-1)
    } else if (e.key === "add_project") {
      setFocusProject(-2)
    } else if (e.key === focusProject) {
      setFocusProject(-1) // show nothing
    } else {
      setFocusProject(e.key)
    }
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = async (values) => {
    // console.log('Success:', values);
    // console.log(user.id);
    // console.log(values.project_name);
    await createProject({
      variables: {
        data: {
          userID: user.id,
          projectName: values.project_name,
        }
      }
    })
    setFocusProject(user.projects.length)
    // console.log(user.projects);
    // console.log(user.projects.length-1);

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  return (
    <>
      <div className="App-title">
        <h1>
          {user.userName}
        </h1>
      </div>
      <div>
        <Menu style={{fontSize: 20}} onClick={handleClick} selectedKeys={[focusProject]} mode="horizontal">
          <Menu.Item key="global_ball" icon={<GlobalOutlined />}>
            ALL
          </Menu.Item>
          <Menu.Item key="add_project" icon={<PlusOutlined />}>
            Add
          </Menu.Item>
          {user.projects.map( (project_i, i) => (
            <Menu.Item key={i}>
                { project_i.projectName }
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <div>
        {(focusProject === -1) ? (
          <GlobalBall user={user}/>
        ) : ( <>{ (focusProject === -2) ? (
          <Form
            {...layout}
            name="form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="project name"
              name="project_name"
              rules={[{required: true, message: 'Please input the project name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Ball userID={user.id} project={user.projects[focusProject]} />
        )
        } </>)}
      </div>
        
    </>
  )
}

export default BallPool;