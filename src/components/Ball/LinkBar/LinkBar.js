import { link } from "fs";
import path from "path";
import "../style/LinkBar.css"

const LinkBar = ({ links }) => {

    return (
        <>
            <h1>Links</h1>
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
        </>
    )
}

export default LinkBar;