export default async function handler(req, res) {
  const { url } = req.query; // 从查询参数中获取目标 URL
  if (!url) {
      return res.status(400).json({ error: "Missing URL parameter" });
  }

  try {
      // 在服务器端发送 HEAD 请求
      const response = await fetch(url, { method: "HEAD", redirect: "manual" });
      if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get("location");
          if (location) {
              return res.status(200).json({ location });
          }
      }
      // 如果没有重定向，返回原始 URL
      return res.status(200).json({ location: url });
  } catch (error) {
      console.error("Proxy error:", error);
      return res.status(500).json({ error: "Failed to fetch URL" });
  }
}