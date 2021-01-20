const Record = ({ records }) => {
    console.log(records);

    return (
        <>
            <ul className="record__main">
            {
                records.sort((a, b) => {
                    return (a.startAt > b.startAt)? -1 : ((a.startAt < b.startAt)? 1 : 0);
                }).map((e) => {
                    return (
                        <li>{e.assignmentName}{e.startAt}{e.duration}</li>
                    )
                })
            }
            </ul>
        </>
    )
}

export default Record;