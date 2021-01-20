import Ball from "../components/Ball/Ball"

const BallPool = ({ user }) => {
    return (
        <Ball userID={user.id} project={user.projects[0]} />
    )
}

export default BallPool;