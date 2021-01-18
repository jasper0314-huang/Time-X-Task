import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import './App.css'
import 'antd/dist/antd.css'; 
import { Button, Input, Tag } from 'antd'


import {
  USER_PROJECTS_QUERY,
  // CREATE_MESSAGE_MUTATION,
  // DELETE_MESSAGE_MUTATION,
  // MESSAGES_SUBSCRIPTION
} from '../../graphql'

function App() {
  // const [username, setUsername] = useState('')
  // const [towhom, setToWhom] = useState('')
  // const [body, setBody] = useState('')

  // const bodyRef = useRef(null)
  // const bodyRef2 = useRef(null)

  const { loading, error, data, subscribeToMore } = useQuery(USER_PROJECTS_QUERY, {
    variables: { userName: userName }
  })
  // const [addMessage] = useMutation(CREATE_MESSAGE_MUTATION)

  // useEffect(() => {
  //   subscribeToMore({
  //     document: MESSAGES_SUBSCRIPTION,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev
  //       const newMessage = subscriptionData.data.message.data
  //       return {
  //         ...prev,
  //         Messages: [...prev.Messages, newMessage]
  //       }
  //     }
  //   })
  // }, [subscribeToMore])
  
  // const handleFormSubmit = useCallback(
  //   (e) => {
  //     if (!username || !towhom || !body) return

  //     addMessage({
  //       variables: {
  //         from: username,
  //         to: towhom,
  //         body: body
  //       }
  //     })

  //     setBody('')
  //   },
  //   [addMessage, username, towhom, body]
  // )

  // const clearMessages = () => {
  //   console.log(data);
  //   console.log("nothing happen");
  // }
  const tmp = () => {
    console.log(data);
    console.log("nothing happen");
  }
  return (
    <div>
      <div>hi</div>
      <Button onClick={tmp} >Testing</Button>
    </div>
  //   <div className="App">
  //     <div className="App-title">
  //       <h1>Simple Chat</h1>
  //       <Button type="primary" danger onClick={clearMessages}>
  //         Clear
  //       </Button>
  //     </div>
  //     <Input
  //       placeholder="Username"
  //       value={username}
  //       onChange={(e) => setUsername(e.target.value)}
  //       style={{ marginBottom: 10 }}
  //       onKeyDown={(e) => {
  //         if (e.key === 'Enter') {
  //           bodyRef2.current.focus()
  //         }
  //       }}
  //     ></Input>
  //     <div className="App-messages">
  //       {loading ? (
  //         <p style={{ color: '#ccc' }}>
  //           { 'Loading...' }
  //         </p>
  //       ) : error ? (
  //         <p style={{ color: '#ccc' }}>
  //           { 'Error :((((' }
  //         </p>
  //       ) : (
  //         data.Messages.map(({ from, to, body }, i) => {
  //           return from == username ? (
  //             <p className="App-message" key={i} align="right">
  //             {body + "　"}
  //             <Tag color="blue">{ to }</Tag>
  //             </p>
  //           ) : (
  //             <p className="App-message" key={i} align="left">
  //             <Tag color="red">{ from }</Tag>
  //             {body}
  //           </p>
  //           )})    
  //       )}
  //     </div>


  //     <Input
  //       placeholder="ToWhom"
  //       value={towhom}
  //       ref={bodyRef2}
  //       onChange={(e) => setToWhom(e.target.value)}
  //       style={{ marginBottom: 10 }}
  //       onKeyDown={(e) => {
  //         if (e.key === 'Enter') {
  //           bodyRef.current.focus()
  //         }
  //       }}
  //     ></Input>
  //     <Input.Search
  //       rows={4}
  //       value={body}
  //       ref={bodyRef}
  //       enterButton="Send"
  //       onChange={(e) => setBody(e.target.value)}
  //       placeholder="Type a message here..."
  //       onSearch={handleFormSubmit}
  //     ></Input.Search>
  //   </div>
  )
}

export default App


