"use client"

import { useState } from "react"

export function UploadDataset() {
  const [status, setStatus] = useState("")

  const uploadFile = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    const form = new FormData()
    form.append("file", file)

    const res = await fetch("http://localhost:8000/upload/", {
      method: "POST",
      body: form
    })

    const data = await res.json()
    setStatus(data.status || data.error)
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-3">Upload Aadhaar Dataset</h3>
      <input type="file" accept=".csv" onChange={uploadFile} />
      {status && <p className="mt-3 text-green-600">{status}</p>}
    </div>
  )
}
