export default function DataTable({ columns, data }: any) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col: string) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, index: number) => (
          <tr key={index}>
            {columns.map((col: string) => (
              <td key={col}>{row[col.toLowerCase().replace(" ", "_")]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

