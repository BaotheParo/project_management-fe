function StatusDot({ status }) {
  const color =
    status === "Done"
      ? "bg-green-400"
      : status === "Overdue"
      ? "bg-red-400"
      : status === "In Progress"
      ? "bg-yellow-400"
      : "bg-gray-300";
  return <span className={`inline-block w-2 h-2 rounded-full mr-2 ${color}`} />;
}

export default StatusDot;
