const TodoBotton = ({ buttonName, show, changePage }) => {
    return <button 
        onClick={changePage(buttonName)} 
        style={{borderColor:(show?"blue":"transparent")}}
    >{buttonName}</button>;
};

export default TodoBotton;