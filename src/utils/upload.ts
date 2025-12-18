import fs from "node:fs/promises"
import path from "node:path"

export async function uploadPDF(file: File) {
	if (file.type !== "application/pdf") {
		throw new Error("File must be a PDF")
	}

	if (file.size > 2_000_000) {
		throw new Error("File must be under 2MB")
	}

	const uploadsDir = path.join(process.cwd(), "uploads")
	await fs.mkdir(uploadsDir, { recursive: true })

	const arrayBuffer = await file.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)

	const filename = `${crypto.randomUUID()}.pdf`

	const filePath = path.join(uploadsDir, filename)

	await fs.writeFile(filePath, buffer)

	return `/uploads/${filename}`
}
