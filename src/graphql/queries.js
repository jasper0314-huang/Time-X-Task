import { gql } from 'apollo-boost'

const USER_QUERY = gql`
  query user(
    $userName: String
    $id: ID
  ) {
      user(
        userName: $userName
        id: $id
      ) {
          id
          userName
          projects {
            id
            projectName
            links
            assignments {
              id
              assignmentName
              deadline
              records {
                startAt
                duration
              }
              status
              isComplete
            }
          }
        }
  }
`

const PROJECTNAMES_QUERY = gql`
  query {
    projectNames {
      name
      count
    }
  }
`

const ASSIGNMENTNAMES_QUERY = gql`
  query assignmentNames (
    $projectName: String
  ) {
    assignmentNames (
      projectName: $projectName
    ) {
      name
      count
    }
  }
`

const SEARCHSTATS_QUERY = gql`
  query searchStats (
    $projectName: String!
    $assignmentName: String
  ) {
    searchStats (
      projectName: $projectName
      assignmentName: $assignmentName
    )
  }

`

export { 
  USER_QUERY, 
  PROJECTNAMES_QUERY, 
  ASSIGNMENTNAMES_QUERY, 
  SEARCHSTATS_QUERY
};