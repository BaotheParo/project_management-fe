const MockData = Array.from({ length: 10 }).map((_, i) => ({
  id: `RO-00${i + 1}`,
  vehicle: i === 1 ? "Neiro Green" : "VinFast VF-3",
  vin: "LSV1E7AL0MC123456",
  status: [
    "On hold",
    "Done",
    "On hold",
    "Overdue",
    "In Progress",
    "On hold",
    "On hold",
    "Done",
    "On hold",
    "In Progress",
  ][i],
  dueDate: "2024-07-21",
}));

export default MockData;