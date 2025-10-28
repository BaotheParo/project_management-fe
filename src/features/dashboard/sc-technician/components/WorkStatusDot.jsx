import { getWorkStatusColor } from "../../../../constants/WorkStatus";


function WorkStatusDot({ status }) {
    const color = getWorkStatusColor(status);
    return (
        <span
            className={`inline-block w-2 h-2 rounded-full mr-2 ${color}`}
            aria-label={`Status: ${status}`}
        />
    )
}

export default WorkStatusDot;
