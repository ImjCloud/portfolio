import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseRest } from "@/lib/supabase-rest";
import { consumeRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

type SubmissionBody = {
  name?: string;
  role?: string;
  company?: string;
  linkedinUrl?: string;
  rating?: number;
  recommendation?: string;
  email?: string;
  honeypot?: string;
};

export async function GET() {
  if (!isSupabaseConfigured("anon")) {
    return NextResponse.json({ configured: false, testimonials: [] });
  }
  try {
    const rows = await supabaseRest.select(
      "testimonials",
      "select=id,name,role,company,linkedin_url,rating,recommendation,created_at&approved=eq.true&order=created_at.desc&limit=24",
    );
    return NextResponse.json({ configured: true, testimonials: rows });
  } catch {
    return NextResponse.json({ configured: true, testimonials: [], error: "Unable to load recommendations." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const rate = await consumeRateLimit(req, "testimonial-submit", 5, 3600);
  if (!rate.configured) {
    return NextResponse.json({ error: "Submission protection is not configured yet." }, { status: 503 });
  }
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429, headers: { "Retry-After": "3600" } });
  }

  if (!isSupabaseConfigured("anon")) {
    return NextResponse.json({ error: "The recommendation system is not connected yet. Please email directly instead." }, { status: 503 });
  }

  const body = (await req.json().catch(() => null)) as SubmissionBody | null;
  if (!body) return NextResponse.json({ error: "Invalid submission." }, { status: 400 });

  // Honeypot: a hidden field real visitors never fill in. Bots that fill every
  // field will trip this, and we quietly report success without writing anything.
  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const recommendation = (body.recommendation ?? "").trim();
  const rating = Number(body.rating);

  if (!name || name.length > 120) return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  if (!recommendation || recommendation.length < 20 || recommendation.length > 2000) {
    return NextResponse.json({ error: "Please add a recommendation between 20 and 2000 characters." }, { status: 400 });
  }
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Please choose a rating between 1 and 5." }, { status: 400 });
  }
  if (body.linkedinUrl && !/^https:\/\/(www\.)?linkedin\.com\//i.test(body.linkedinUrl)) {
    return NextResponse.json({ error: "That doesn't look like a LinkedIn URL." }, { status: 400 });
  }

  try {
    await supabaseRest.insert("testimonials", {
      name,
      role: (body.role ?? "").trim().slice(0, 120) || null,
      company: (body.company ?? "").trim().slice(0, 120) || null,
      linkedin_url: body.linkedinUrl?.trim().slice(0, 300) || null,
      rating: Math.round(rating),
      recommendation: recommendation.slice(0, 2000),
      email: body.email?.trim().slice(0, 200) || null,
      approved: false,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to submit recommendation." }, { status: 500 });
  }
}
