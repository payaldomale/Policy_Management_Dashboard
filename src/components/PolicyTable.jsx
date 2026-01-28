const PolicyTable = ({ policies, onSort, sort }) => {
  if (!policies.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No policies found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Policy ID</th>
            <th className="p-2 text-left">Holder</th>
            <th className="p-2 text-left">Status</th>
            <th
              className="p-2 text-left cursor-pointer"
              onClick={() => onSort("premium")}
            >
              Premium {sort.key === "premium" && (sort.order === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="p-2 text-left cursor-pointer"
              onClick={() => onSort("startDate")}
            >
              Start Date {sort.key === "startDate" && (sort.order === "asc" ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {policies.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.holder}</td>
              <td className="p-2">{p.status}</td>
              <td className="p-2">${p.premium}</td>
              <td className="p-2">{p.startDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyTable;
