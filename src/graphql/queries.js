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

export const USER_PROJECTS_QUERY = gql`
  query user(
      $userName: String
      $id: ID
    ) {
      user(
        userName: $userName
        id: $ID
      ) {
        id
      }
  }
`
