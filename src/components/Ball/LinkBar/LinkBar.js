import { link } from "fs";
import path from "path";
import { useMutation } from '@apollo/react-hooks'
import {
    UPDATE_PROJECT_MUTATION
} from "../../../graphql"
import "../style/LinkBar.css"

const LinkBar = ({ links, userID, projectID }) => {
    const [updateProject] = useMutation(UPDATE_PROJECT_MUTATION);

    const addLink = (event) => {
        const linkNode = document.getElementById("addlink");
        const link = linkNode.value;

        updateProject({
            variables: {
                userID: userID,
                id: projectID,
                data: {
                    links: [...links, link]
                }
            }
        })
        linkNode.value = "";
    }

    return (
        <div className="linkbar__main">
            <div className="link__info">
                <h1>Links</h1>
                <label for="adddlink">Add link: </label>
                <input type="text" id="addlink" />
                <input type="submit" value="Add" onClick={addLink} />
            </div>
            {
                links.map(e => {
                    return <a href={e}>
                        <img
                            src={"https://www.google.com/s2/favicons?domain=" + e}
                            alt="img"
                        />
                    </a>
                })
            }
        </div>
    )
}

export default LinkBar;