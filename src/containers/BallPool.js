import Ball from "../components/Ball/Ball"
import React, { useState } from 'react'
import { Menu } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import GlobalBall from "../components/Ball/GlobalBall"
// import {  }

// const { SubMenu  } = Menu;

const BallPool = ({ user }) => {
  const [focusProject, setFocusProject] = useState(-1)
  const handleClick = e => {
    if (e.key === "global_ball") {
      setFocusProject(-1)
    } else if (e.key === "add_project") {
      setFocusProject(-2)
    } else if (e.key === focusProject) {
      setFocusProject(-3) // show nothing
    } else {
      setFocusProject(e.key)
    }
  }
  return (
    <>
      <div className="App-title">
        <h1>
          {user.userName}
        </h1>
      </div>
      <div>
        <Menu onClick={handleClick} selectedKeys={[focusProject]} mode="horizontal">
          <Menu.Item key="global_ball" icon={<PlusOutlined />}>
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
          <GlobalBall>

          </GlobalBall>
        ) : (
          <Ball userID={user.id} project={user.projects[focusProject]} />
        )}
      </div>
        
    </>
  )
}

export default BallPool;