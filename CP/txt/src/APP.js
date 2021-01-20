import Ball from "./Ball/Ball"
import { useQuery } from '@apollo/client'
import {
    USER_QUERY
} from './graphql'

//   const user_data = {
//     "data": {
//       "user": {
//         "id": "6006c07974a4fd4df4c3a7f1",
//         "userName": "Tien",
//         "projects": [
//           {
//             "id": "6006c18a74a4fd4df4c3a7f2",
//             "projectName": "DSP",
//             "links": [
//               "https://youtube.com",
//               "https://ceiba.ntu.edu.tw",
//               "https://cool.ntu.edu.tw/login/portal"
//             ],
//             "assignments": [
//               {
//                 "id": "6006c1fc74a4fd4df4c3a7f4",
//                 "assignmentName": "Final Project",
//                 "deadline": {
//                   "day": 9,
//                   "month": 10,
//                   "year": 1992,
//                   "hour": 0,
//                   "minute": 0,
//                   "second": 0,
//                   "formatted": "1992-10-09T00:00:00Z"
//                 },
//                 "record": [],
//                 "status": null,
//                 "isComplete": false
//               }
//             ]
//           }
//         ]
//       }
//     }
// }

const APP = () => {

    const { loading, error, data, subscribeToMore } = useQuery(USER_QUERY, {
        variables: { userName: "Tien" },
    })
    

    return (
        loading? (
            <h1>Loading ...</h1>
        ) : error ? (
            <h1>Error!</h1>
        ) : (
            <Ball userID={data.user.id} project={data.user.projects[0]} />
        )
    )
}

export default APP;
