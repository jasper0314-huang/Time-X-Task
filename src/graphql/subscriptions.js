import { gql } from 'apollo-boost'

export const USER_SUBSCRIPTION = gql`
  subscription {
    user {
      mutation
      data {
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
  }
`
