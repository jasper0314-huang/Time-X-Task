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

export { USER_QUERY, PROJECTNAMES_QUERY};