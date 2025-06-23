type TableProps<T> = {
  columns: { key: keyof T; label: string }[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
};

export default function Table<T>({ columns, data, renderActions }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg bg-white">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={String(col.key)} className="px-4 py-2 border-b text-left font-semibold bg-slate-50">
                {col.label}
              </th>
            ))}
            {renderActions && <th className="px-4 py-2 border-b bg-slate-50">Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50">
              {columns.map(col => {
                const value = row[col.key];
                if (Array.isArray(value) && value.every(v => typeof v === "string")) {
                  return <td key={String(col.key)} className="px-4 py-2 border-b">{(value as string[]).join(", ")}</td>;
                }
                return <td key={String(col.key)} className="px-4 py-2 border-b">{value as React.ReactNode}</td>;
              })}
              {renderActions && (
                <td className="px-4 py-2 border-b">{renderActions(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 