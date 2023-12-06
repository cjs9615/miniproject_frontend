import { SERVER_URL } from "../comm/constants";

const MycalorieDay = () => {
    return (
        <div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>시간</th>
                        <th>음식이름</th>
                        <th>그램수</th>
                    </tr>
                </thead>
                <tbody>
                    {dietTag}
                </tbody>
            </table>
        </div>
    )
}

export default MycalorieDay
