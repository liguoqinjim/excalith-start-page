import fs from "fs"
import path from "path"
import JSON5 from "json5"

export default function handler(req, res) {
	const dataDir = path.join(process.cwd(), "data")
	const jsoncPath = path.join(dataDir, "settings.jsonc")
	const jsonPath = path.join(dataDir, "settings.json")

	const filePath = fs.existsSync(jsoncPath) ? jsoncPath : jsonPath
	const fileContents = fs.readFileSync(filePath, "utf8")
	res.status(200).json(JSON5.parse(fileContents))
}
