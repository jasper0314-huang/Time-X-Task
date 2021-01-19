import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import './App.css'
import 'antd/dist/antd.css'; 
import { Button, Input, Tag } from 'antd'


import {
  USER_QUERY,
  // CREATE_MESSAGE_MUTATION,
  // DELETE_MESSAGE_MUTATION,
  // MESSAGES_SUBSCRIPTION
} from '../../graphql'

function App() {
  var variables = { userName: "Tien" }
  const { loading, error, data, subscribeToMore } = useQuery(USER_QUERY, {
    variables: variables
  });

  const tmp = () => {
    console.log(loading);
    console.log(error);
    console.log(data.user);
    console.log("nothing happen");
  }
  return (
    <div>
      <div>hi</div>
      <Button onClick={tmp} >Get User Data(in console)</Button>
      <div>
        {loading ? (<div></div>) : ( 
          <div> 
            <h1> userID: { data.user.id } </h1>
            <h1> userName: { data.user.userName } </h1>
            <h1> userProjects:{ data.user.projects[0].projectName } </h1> 
          </div>
        )}
      </div>
    </div>
  )
}

export default App


