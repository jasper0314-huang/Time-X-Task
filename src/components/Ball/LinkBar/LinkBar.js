import { link } from "fs";
import path from "path";
import { useMutation } from '@apollo/react-hooks'
import {
    UPDATE_PROJECT_MUTATION
} from "../../../graphql"
import "../style/LinkBar.css"
import Img from "../img/x.png"

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
        linkNode.value = "https://";
    }
    const deleteLink = (event) => {
        const link = event.target.id;
        const newlinks = links.filter((e) => (e !== link))

        console.log(newlinks);
        
        updateProject({
            variables: {
                userID: userID,
                id: projectID,
                data: {
                    links: newlinks
                }
            }
        })
    }

    return (
        <div className="linkbar__main">
            <div className="link__info">
                <h1 for="adddlink" id="addlink__text">Add link: </h1>
                <input type="text" id="addlink" value="https://" />
                <input type="submit" value="Add" onClick={addLink} />
            </div>
            <div className="link__img">
            {
                links.map(e => {
                    console.log(e)
                    return (
                        <div className="link__img__box">
                            <img src={Img} alt="delete" className="delete" id={e} onClick={deleteLink} />
                            <a href={e} rel="noreferrer" target="_blank">
                                <img
                                    src={"https://www.google.com/s2/favicons?domain=" + e}
                                    alt="img"
                                />
                            </a>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default LinkBar;