import { isURL, isVideoURL } from "@/utils/isURL"

export async function fetchAsset(assetPath) {
	if (!assetPath) {
		return { url: "", isVideo: false }
	}
	
	if (isURL(assetPath)) {
		// 通过代理 API 获取重定向后的 URL
        const response = await fetch(`/api/proxy?url=${encodeURIComponent(assetPath)}`);
        const data = await response.json();
        if (data.location) {
            const finalUrl = data.location;
            // 检查重定向后的 URL 是否为视频
			console.log("重定向后的 URL: " + finalUrl)
            const isVideo = isVideoURL(finalUrl);
            return { url: finalUrl, isVideo: isVideo };
        } else {
            console.error("获取重定向后的 URL 失败:", error);
			return { url: "", isVideo: false };
        }
	} else {
		// 处理本地资产（保持不变）
		try {
			const response = await fetch(`/api/getData?file=${assetPath}`);
			if (!response.ok) {
				console.log("文件未找到: " + assetPath);
				return { url: "", isVideo: false };
			}
			
			// 尝试解析为 JSON 以查看是否是错误消息
			const data = await response.clone().json().catch(async () => {
				// 不是 JSON，视为 blob
				const blob = await response.blob();
				const url = URL.createObjectURL(blob);
				const isVideo = blob.type && blob.type.startsWith('video/');
				return { blob, url, isVideo };
			});
			
			// 检查响应是否为错误对象
			if (data.warning) {
				console.log("文件未找到: " + assetPath);
				return { url: "", isVideo: false };
			}
			
			// 如果数据有 blob 属性，则表示已处理为 blob
			if (data.blob) {
				return { url: data.url, isVideo: data.isVideo };
			}
			
			// 否则从响应创建 blob URL
			const blob = await response.blob();
			const url = URL.createObjectURL(blob);
			const isVideo = blob.type && blob.type.startsWith('video/');
			
			return { url, isVideo };
		} catch (error) {
			console.error("获取本地资产时出错:", error);
			return { url: "", isVideo: false };
		}
	}
}
