import { gql } from 'apollo-boost'

const CREATE_ASSIGNMENT_MUTATION = gql`
  mutation createAssignment(
    $userID: ID!
    $projectID: ID!
    $assignmentName: String!
  ) {
    createAssignment(data: {
      userID: $userID
      projectID: $projectID
      assignmentName: $assignmentName
    }) {
      assignmentName
    }
  }
`

// input UpdateAssignmentInput {
//   assignmentName: String
//   deadline: DateTime
//   status: Int
//   isComplete: Boolean
// }
const UPDATE_ASSIGNMENT_MUTATION = gql`
  mutation updateAssignment(
    $assignmentID: ID!
    $data: UpdateAssignmentInput
  ) {
    updateAssignment(
      id: $assignmentID
      data: $data
    ) {
      assignmentName
    }
  }
`

const DELETE_ASSIGNMENT_MUTATION = gql`
  mutation deleteAssignment(
    $assignmentID: ID!
  ) {
    deleteAssignment(id: $assignmentID)
  }
`
export { 
  CREATE_ASSIGNMENT_MUTATION, 
  UPDATE_ASSIGNMENT_MUTATION,
  DELETE_ASSIGNMENT_MUTATION
}
