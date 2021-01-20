import Ball from "../components/Ball/Ball"

const BallPool = ({ user }) => {

    return (
        <div className="App">
            <Ball userID={user.id} project={user.projects[0]} />
        </div>
        
    )
}

export default BallPool;