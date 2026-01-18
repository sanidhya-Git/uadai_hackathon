export function AgeFilter({ setAge }: any) {
  const ages = ["all", "0-5", "5-17", "18+"]

  return (
    <div className="flex gap-2">
      {ages.map(a => (
        <button key={a} onClick={() => setAge(a)}
          className="px-4 py-2 rounded bg-blue-500 text-white">
          {a}
        </button>
      ))}
    </div>
  )
}
