import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import './App.css'
import 'antd/dist/antd.css'; 
import { Button, Input, Tag } from 'antd'
import BallPool from "../BallPool"
import Search from "../Search"

import {
  USER_QUERY,
  USER_SUBSCRIPTION
} from '../../graphql'

function App() {
  var variables = { userName: "A" }
  const { loading, error, data, subscribeToMore } = useQuery(USER_QUERY, {
    variables: variables
  });
  const [changepage, setChangepage] = useState(true);

  useEffect(() => {
    subscribeToMore({
      document: USER_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newUser = subscriptionData.data.user.data
        // console.log(newUser);
        return {newUser}
      }
    })
  }, [subscribeToMore])

  const tmp = () => {
    console.log(data.user);
    setChangepage(!changepage);
  }
  // console.log(data);
  return (
    <div className="App">
      <Button onClick={tmp} >Switch</Button>
      <div>
        {loading ? (<div>Loading...</div>) : changepage ? ( 
          <div>
            <Search />
          </div>
        ) : (
          <div>
            {/* <BallPool user={data.user} /> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default App


