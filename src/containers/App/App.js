import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import './App.css'
import 'antd/dist/antd.css'; 
import { Button, Input, Tag } from 'antd'
import Pie from '../../components/Statistic/Pie';
import MyHistogram from '../../components/Statistic/MyHistogram';



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
  const [changepage, setChangepage] = useState(true);
  const [keyword, setKeyword] = useState('');

  const tmp = () => {
    setChangepage(!changepage);
  }
  return (
    <div className="App">
      <Button onClick={tmp} >Switch</Button>
      <div>
        {loading ? (<div>Loading...</div>) : changepage ? ( 
          <div> 
            <Input
              placeholder="What SECRET do you want to know?"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ marginBottom: 10 }}
            ></Input>
            <MyHistogram data={ data } />
          </div>
        ) : (
          <div>
            <Pie />
          </div>
        )}
      </div>
    </div>
  )
}

export default App


