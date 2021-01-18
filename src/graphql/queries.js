import { gql } from 'apollo-boost'

// export const MESSAGES_QUERY = gql`
//   query Messages(
//       $user: String!
//     ) {
//       Messages(
//         user: $user
//       ) {
//         from
//         to
//         body
//       }
//   }
// `
export const USER_PROJECTS_QUERY = gql`
  query User(
      $userName: String!
    ) {
      User(
        userName: $userName
      ) {
        id
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
