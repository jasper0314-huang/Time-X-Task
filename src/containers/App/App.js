import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import './App.css'
import 'antd/dist/antd.css'; 
import { Input, Tag } from 'antd'
import BallPool from "../BallPool"
import Search from "../Search"
import GlobalBall from "../../components/Ball/GlobalBall"
// import { Bounce, Shake } from 'react-motions'
// import { Dimensions, TouchableHighlight, Text } from 'react-native';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';

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
            {loading ? (<div>Loading...</div>) : changepage ? ( 
              <div>
              <div>
                <Search />
              </div>
              <div className="switchPage">
                <IconButton>
                  <HomeIcon onClick={tmp} style={{ fontSize: 50 }} />
                </IconButton>
              </div>
            </div>
          ) : (
            <div>
              <div className="BallPoll__container">
                <BallPool user={data.user} />
              </div>
              <div className="switchPage">
                <IconButton>
                  <SearchIcon onClick={tmp} style={{ fontSize: 50 }} />
                </IconButton>
              </div>
              {/* <GlobalBall user={data.user} /> */}
            </div>
            )}
          </div>
        </div>
      )
    }

    </>
  )
}

export default App


