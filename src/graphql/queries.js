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
          assignments {
            id
            assignmentName
          }
        }
      }
  }
`

// const USERS_QUERY = gql`
//   query {
//     users {
//       id
//       userName
//       projects {
//         id
//         projectName
//       }
//     }
//   }
// `

export {USER_QUERY};