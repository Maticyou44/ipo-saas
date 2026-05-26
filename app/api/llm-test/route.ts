import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: "환경변수 ANTHROPIC_API_KEY 없음",
    });
  }

  try {
    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: "안녕하세요! 한국 IPO 분석을 도와줄 AI라고 한 줄로 자기소개 해주세요.",
        },
      ],
    });

    const text = message.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("");

    return NextResponse.json({
      success: true,
      response: text,
      model: message.model,
      usage: message.usage,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 에러";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}