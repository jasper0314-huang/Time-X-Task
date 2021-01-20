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

export { USER_QUERY };