import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import './App.css'
import 'antd/dist/antd.css'; 
import { Button, Input, Tag } from 'antd'
import BallPool from "../BallPool"
import Search from "../Search"
import GlobalBall from "../../components/Ball/GlobalBall"

import {
  USER_QUERY,
  USER_SUBSCRIPTION
} from '../../graphql'

function App() {
  // var variables = { userName: "A" }
  const [user, setUser] = useState("");
  const [changepage, setChangepage] = useState(true);
  const { loading, error, data, subscribeToMore } = useQuery(USER_QUERY, {
    variables: { userName: user }
  });

  const checkLogging = (event) => {
    const name = event.target.parentNode.childNodes[1].value;
    setUser(name);
    event.target.parentNode.childNodes[1].value = "";
  }

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
    <>
    {
      (user === "" || data.user === null)? (
        <div className="Logging">
          <Tag for="logging">User Name:</Tag>
          <input type="text" id="logging" name="logging" />
          <input type="submit" value="Submit" onClick={checkLogging} />
        </div>
      ) : (
        <div className="App">
          <Button onClick={tmp} >Switch</Button>
          <div>
<<<<<<< HEAD
            {/* <BallPool user={data.user} /> */}
            <GlobalBall user={data.user} />
=======
            {loading ? (<div>Loading...</div>) : changepage ? ( 
              <div>
                <Search />
              </div>
            ) : (
              <div>
                <BallPool user={data.user} />
              </div>
            )}
>>>>>>> be4fa32a204cb2d03aa0823cf015f9268a84a13f
          </div>
        </div>
      )
    }
    </>
  )
}

export default App


