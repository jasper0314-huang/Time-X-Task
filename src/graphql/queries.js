import { gql } from 'apollo-boost'

// export const USER_PROJECTS_QUERY = gql`
//   query user(
//       $userName: String
//       $id: ID
//     ) {
//       user(
//         userName: $userName
//         id: $ID
//       ) {
//         id
//         projects {
//           id
//           projectName
//           assignments {
//             id
//             assignmentName
//           }
//         }
//       }
//   }
// `

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
        }
      }
  }
`

const USERS_QUERY = gql`
  query {
    users {
      id
      userName
      projects {
        id
        projectName
      }
    }
  }
`

export {USER_QUERY, USERS_QUERY};