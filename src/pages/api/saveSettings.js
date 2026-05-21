import fs from "fs"
import path from "path"

export default function handler(req, res) {
	const dataDir = path.join(process.cwd(), "data")
	const jsoncPath = path.join(dataDir, "settings.jsonc")
	const jsonPath = path.join(dataDir, "settings.json")

	const filePath = fs.existsSync(jsoncPath) ? jsoncPath : jsonPath
	fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2))
	res.status(200).json({ message: "Settings saved" })
}
