import { NextResponse } from "next/server";
import { getIPOList } from "@/lib/ipo";

export async function GET() {
  const result = await getIPOList();
  return NextResponse.json(result);
}