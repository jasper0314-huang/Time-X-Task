import { gql } from 'apollo-boost'

const CREATE_ASSIGNMENT_MUTATION = gql`
  mutation createAssignment(
    $userID: ID!
    $data: CreateAssignmentInput
  ) {
    createAssignment(
      userID: $userID
      data: $data
    ) {
      assignmentName
    }
  }
`

const UPDATE_ASSIGNMENT_MUTATION = gql`
  mutation updateAssignment(
    $userID: ID!
    $assignmentID: ID!
    $data: UpdateAssignmentInput
  ) {
    updateAssignment(
      userID: $userID
      id: $assignmentID
      data: $data
    ) {
      assignmentName
    }
  }
`

const DELETE_ASSIGNMENT_MUTATION = gql`
  mutation deleteAssignment(
    $userID: ID!
    $assignmentID: ID!
  ) {
    deleteAssignment(
      userID: $userID
      id: $assignmentID
    )
  }
`
export { 
  CREATE_ASSIGNMENT_MUTATION, 
  UPDATE_ASSIGNMENT_MUTATION,
  DELETE_ASSIGNMENT_MUTATION
}
