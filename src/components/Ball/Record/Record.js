import "../style/Record.css"

const Record = ({ records }) => {
    console.log(records);

    const duration2timestring = (sec) => {
        const hr = parseInt(sec / 3600);
        const min = parseInt((sec % 3600) / 60);
        return `${hr} hr ${min} min`
    }

    return (
        <div id="table-wrapper">
            <div id="table-scroll">
                <table className="record__main">
                    <thead className="record__title">
                        <tr>
                            <th>Assignment</th>
                            <th>Start Time</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        records.sort((a, b) => {
                            return (a.startAt > b.startAt)? -1 : ((a.startAt < b.startAt)? 1 : 0);
                        }).map((e) => {
                            return (
                                <tr className="record__info">
                                    <td>{e.assignmentName}</td>
                                    <td>{(new Date(e.startAt)).toLocaleString()}</td>
                                    <td>{duration2timestring(e.duration)}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Record;