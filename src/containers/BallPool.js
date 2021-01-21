import Ball from "../components/Ball/Ball"
import React, { useState } from 'react'
import { Menu } from 'antd'


const BallPool = ({ user }) => {
  const [focusProject, setFocusProject] = useState(-1)
  const handleClick = e => {
    if (e.key === focusProject) {
      setFocusProject(-1)
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
        {/* <Menu onClick={handleClick} selectedKeys={[focusProject]} mode="horizontal">
          {user.projects.map( (project_i, i) => (
            <Menu.Item key={i}>
                { project_i.projectName }
            </Menu.Item>
          ))
          }
        </Menu> */}

        <div onClick={handleClick} selectedKeys={[focusProject]} mode="horizontal">
          {user.projects.map( (project_i, i) => (
            <div key={i}>
                { project_i.projectName }
            </div>
          ))
          }
        </div>

      </div>
      <div>
        {(focusProject === -1) ? (
          <div>
          </div>
        ) : (
          <Ball userID={user.id} project={user.projects[focusProject]} />
        )}
      </div>
        
    </>
  )
}

export default BallPool;