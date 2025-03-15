export function isURL(str) {
	var urlPattern = new RegExp(
		"^(https?:\\/\\/)?" + // validate protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	) // validate fragment locator
	return !!urlPattern.test(str)
}

// 新增函数：检查是否为视频 URL
export function isVideoURL(url) {
	if (!url) return false

	// 检查常见的视频文件扩展名
	const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv", ".flv"]
	const lowercaseUrl = url.toLowerCase()

	// 检查 URL 中的文件扩展名
	return (
		videoExtensions.some((ext) => lowercaseUrl.endsWith(ext)) ||
		// 还检查 URL 中的查询参数是否包含视频 MIME 类型
		lowercaseUrl.includes("video/")
	)
}
