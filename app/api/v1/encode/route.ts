import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text");
    const type = searchParams.get("type");

    if (!text) {
      return NextResponse.json(
        { error: "Missing required query parameter: text" },
        { status: 400 },
      );
    }

    if (!type) {
      return NextResponse.json(
        { error: "Missing required query parameter: type" },
        { status: 400 },
      );
    }

    let result: string;

    switch (type.toLowerCase()) {
      case "base64-encode":
        result = Buffer.from(text, "utf-8").toString("base64");
        break;
      case "base64-decode":
        try {
          result = Buffer.from(text, "base64").toString("utf-8");
        } catch {
          return NextResponse.json(
            { error: "Invalid base64 input" },
            { status: 400 },
          );
        }
        break;
      case "hex-encode":
        result = Buffer.from(text, "utf-8").toString("hex");
        break;
      case "hex-decode":
        try {
          result = Buffer.from(text, "hex").toString("utf-8");
        } catch {
          return NextResponse.json(
            { error: "Invalid hex input" },
            { status: 400 },
          );
        }
        break;
      case "sha256":
        result = crypto
          .createHash("sha256")
          .update(text, "utf-8")
          .digest("hex");
        break;
      case "url-encode":
        result = encodeURIComponent(text);
        break;
      case "url-decode":
        result = decodeURIComponent(text);
        break;
      default:
        return NextResponse.json(
          {
            error: `Invalid type: ${type}`,
            allowedTypes: [
              "base64-encode",
              "base64-decode",
              "hex-encode",
              "hex-decode",
              "sha256",
              "url-encode",
              "url-decode",
            ],
          },
          { status: 400 },
        );
    }

    return NextResponse.json({ type, input: text, result });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to process encoding",
        message: err?.message ?? "unknown error",
      },
      { status: 500 },
    );
  }
}
