import express from "express";

const router = express.Router();

const FALLBACK_API_BASE_URL = "https://api.ur-wsl.com";

function isAllowedImageUrl(imageUrl) {
  if (imageUrl.protocol !== "http:" && imageUrl.protocol !== "https:") {
    return false;
  }

  const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL || FALLBACK_API_BASE_URL;
  const allowedHosts = new Set([
    "real-estate-projects-s3.s3.eu-north-1.amazonaws.com",
    "s3.eu-north-1.amazonaws.com",
  ]);

  if (process.env.AWS_BUCKET_NAME && process.env.AWS_REGION) {
    allowedHosts.add(
      `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`
    );
  }

  try {
    allowedHosts.add(new URL(configuredApiUrl).hostname);
  } catch {
    allowedHosts.add(new URL(FALLBACK_API_BASE_URL).hostname);
  }

  return allowedHosts.has(imageUrl.hostname);
}

router.get("/", async (req, res) => {
  const { src } = req.query;

  if (!src || typeof src !== "string") {
    return res.status(400).json({ error: "Missing src parameter" });
  }

  let imageUrl;
  try {
    imageUrl = new URL(src);
  } catch {
    return res.status(400).json({ error: "Invalid src parameter" });
  }

  if (!isAllowedImageUrl(imageUrl)) {
    return res.status(400).json({ error: "Unsupported image host" });
  }

  try {
    const response = await fetch(imageUrl.toString(), {
      cache: "no-store",
      headers: {
        Accept: "image/*,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Failed to fetch image: ${response.status}` });
    }

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";
    const arrayBuffer = await response.arrayBuffer();

    res.set({
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300",
    });
    return res.status(200).send(Buffer.from(arrayBuffer));
  } catch {
    return res.status(502).json({ error: "Unable to fetch image" });
  }
});

export default router;
