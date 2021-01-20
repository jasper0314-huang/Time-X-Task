import React, { useEffect, useCallback, useRef, useState } from 'react'
import 'antd/dist/antd.css'; 
import { Button, Input, Tag } from 'antd'
import MyHistogram from '../components/Search/MyHistogram';
import Highlights from '../components/Search/InputBox';
import Pie from '../components/Search/Pie';
import Pie2 from '../components/Search/Pie_canvas';

// auto complete source: https://material-ui.com/components/autocomplete/#api

// TODO: 1. Get ProjectNames List, AssignmentNames List ( {name, count} )
//          use in (1) autoComplete
//                 (2) recommendation
//       2. SEARCHSTATS_QUERY
//          input: projectname, assignmentname
//          output: array of int (seconds) 

function Search() {
  const [findProject, setFindProject] = useState('');
  const [findAssignment, setFindAssignment] = useState('');
  // const data = this.props.data;

  const ProjectNames = [
    { name: 'Web Programming', count: 203 },
    { name: 'Computer Programming', count: 194 },
    { name: 'Advanced Machine Learning', count: 223 },
    { name: 'Machine Learning', count: 200 },
    { name: 'Statistic', count: 195 },
    { name: "Linear Algebra", count: 132 },
    { name: 'Algorithm', count: 121 },
    { name: 'Calculus', count: 12 },
    { name: 'Economics', count: 1966 },
    { name: 'Econometrics', count: 1999 },
  ];
  
  const AssignmentNames = [
      { name: 'HW1', count: 140 },
      { name: 'HW2', count: 150 },
      { name: 'HW3', count: 162 },
      { name: 'Hackathon 1', count: 111 },
      { name: 'Hackathon 2', count: 98 },
      { name: 'Hackathon 3', count: 102 },
      { name: 'Final Project', count: 200 },
  ];

  return (
    <div>
      <h1>What SECRET do you want to know?</h1>
      {/* <Input
        placeholder="Project name..."
        value={findProject}
        onChange={(e) => setFindProject(e.target.value)}
        style={{ marginBottom: 10 }}
      ></Input>
      <Input
        placeholder="Assignment name..."
        value={findAssignment}
        onChange={(e) => setFindAssignment(e.target.value)}
        style={{ marginBottom: 10 }}
      ></Input> */}
      {/* <div clasName="SearchBox__container">
        <div className="SearchBox">
          <Highlights label="Project Name" data={ProjectNames} setFindProject={setFindProject}></Highlights>
        </div>
        <div className="SearchBox">
          <Highlights label="Assignment Name" data={AssignmentNames} setFindProject={setFindProject}></Highlights>
        </div>
      </div>
      <div className="Histogram__container">
        <MyHistogram />
      </div> */}
      <div className="pie__container">
        <Pie />
        <Pie2 />
      </div>

    </div>
  )
}

export default Search


