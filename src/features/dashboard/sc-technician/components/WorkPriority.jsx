import { getPriorityStatusColor } from "../../../../constants/WorkPriority";


function WorkPriority({ priority, label }) {
    const color = getPriorityStatusColor(label);
    return (
        <span
            className={`px-3 py-1 text-xs rounded-full ${color}`}
            aria-label={`Status: ${priority}`}
        >
            {label}
        </span>
    )
}

export default WorkPriority;
