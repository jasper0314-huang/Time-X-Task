import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks'
import { Button } from '@material-ui/core';
import MyHistogram from '../components/Search/MyHistogram';
import Highlights from '../components/Search/InputBox';

// auto complete source: https://material-ui.com/components/autocomplete/#api

// TODO: 1. Get ProjectNames List, AssignmentNames List ( {name, count} )
//          use in (1) autoComplete
//                 (2) recommendation
//       2. SEARCHSTATS_QUERY
//          input: projectname, assignmentname
//          output: array of int (seconds) 

import { 
  PROJECTNAMES_QUERY,
  ASSIGNMENTNAMES_QUERY,
  SEARCHSTATS_QUERY
} from '../graphql'

function Search() {
  const [findProject, setFindProject] = useState('');
  const [findAssignment, setFindAssignment] = useState('');
  // const data = this.props.data;
  
  const ProjectNames = useQuery(PROJECTNAMES_QUERY);
  const AssignmentNames = useQuery(ASSIGNMENTNAMES_QUERY, {
    variables: {projectName: findProject},
    // pollInterval: 500, // Update every 500ms
  });
  // useEffect(() => { AssignmentNames.refetch() }, [findProject])
  const SearchStats = useQuery(SEARCHSTATS_QUERY, {
    variables: {
      projectName: findProject,
      assignmentName: findAssignment
    },
  });

  const ClickSearch = () => {
    // console.log("Search");
    // console.log(SearchStats.data.searchStats);
    // console.log(SearchStats.loading);
  }

  const ProjectDataCall = () => {
    if (!ProjectNames.loading) {
      return ProjectNames.data.projectNames;
    }
    return [];
  }

  const AssignmentDataCall = () => {
    if (!AssignmentNames.loading) {
      return AssignmentNames.data.assignmentNames;
    }
    return [];
  }

  const SearchStatsDataCall = () => {
    if (!SearchStats.loading && findProject) {
      console.log("searchStats");
      console.log(SearchStats.data.searchStats);
      if (SearchStats.data.searchStat !== []) {
        return (
            <div className="Histogram__container">
              <MyHistogram data={SearchStats.data.searchStats}/>
            </div>
        )
      }
    }
    return (<div></div>);
  }

  return (
    <div>
      <h1>What SECRET do you want to know?</h1>
      <div>
          <div className="SearchBox__container">
            <div className="SearchBox">
              <Highlights 
                label="Project Name" 
                data={ProjectDataCall()} 
                setValue={setFindProject} 
                setValueAssign={setFindAssignment} 
                value={findProject}
              ></Highlights>
            </div>
            <div className="SearchBox">
              <Highlights
                label="Assignment Name"
                data={AssignmentDataCall()}
                setValue={setFindAssignment}
                setValueAssign={()=>{}}
                value={findAssignment}
              ></Highlights>
            </div>
            {/* <div className="SearchBox">
              <div>
                <Button variant="contained" color="primary" fullWidth={true} onClick={ClickSearch}>
                  Search
                </Button>
              </div>
            </div> */}
          </div>
          { SearchStatsDataCall() }
          {/* <div className="pie__container">
            <Pie />
          </div> */}
        </div>
    </div>
  )
}

export default Search




// const ProjectNames = [
//   { name: 'Web Programming', count: 203 },
//   { name: 'Computer Programming', count: 194 },
//   { name: 'Advanced Machine Learning', count: 223 },
//   { name: 'Machine Learning', count: 200 },
//   { name: 'Statistic', count: 195 },
//   { name: "Linear Algebra", count: 132 },
//   { name: 'Algorithm', count: 121 },
//   { name: 'Calculus', count: 12 },
//   { name: 'Economics', count: 1966 },
//   { name: 'Econometrics', count: 1999 },
// ];

// const AssignmentNames = [
//     { name: 'HW1', count: 140 },
//     { name: 'HW2', count: 150 },
//     { name: 'HW3', count: 162 },
//     { name: 'Hackathon 1', count: 111 },
//     { name: 'Hackathon 2', count: 98 },
//     { name: 'Hackathon 3', count: 102 },
//     { name: 'Final Project', count: 200 },
// ];