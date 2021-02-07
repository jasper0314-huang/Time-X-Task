import { Menu } from "antd"
const displayMenu = ( {setPageID, deleteCompleted} ) => {
    return <Menu>
        <Menu.Item onClick={setPageID(0)}>All</Menu.Item>
        <Menu.Item onClick={setPageID(1)}>Progress</Menu.Item>
        <Menu.Item onClick={setPageID(2)}>Trivial</Menu.Item>
        <Menu.Item onClick={setPageID(3)}>Completed</Menu.Item>
        <Menu.Item onClick={deleteCompleted()} danger>Clear completed</Menu.Item>
    </Menu>
};

export default displayMenu;