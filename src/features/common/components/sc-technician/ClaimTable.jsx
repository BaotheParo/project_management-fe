import { warrantyClaims } from "../../../../api/warrantyClaims"
import Loader from "../../../../components/Loader";

const ClaimTable = () => {
    const { rows, loading, error } = warrantyClaims();

    if (loading) return Loader();
    if (error) return <p className="text-red-500">Error loading claims: {error.message}</p>;

    return (
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Vehicle</th>
            <th className="p-2 border">VIN</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Due Date</th>
            <th className="p-2 border">Issue</th>
            <th className="p-2 border">Mileage</th>
            <th className="p-2 border">Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="p-2 border">{row.id}</td>
              <td className="p-2 border">{row.vehicle}</td>
              <td className="p-2 border">{row.vin}</td>
              <td className="p-2 border">{row.status}</td>
              <td className="p-2 border">{row.dueDate}</td>
              <td className="p-2 border">{row.issue}</td>
              <td className="p-2 border">{row.mileage}</td>
              <td className="p-2 border">{row.totalCost.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}

export default ClaimTable;