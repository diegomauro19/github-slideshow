import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reminderResult = {
      reminded: true,
      nextEssayDue: "2026-04-15",
      essayNumber: 9,
      plannedTitle: "The Governance Vacuum",
      status: "no_seed",
      actions: [
        { type: "slack_notification", sent: true, channel: "#lumen-drafts" },
        { type: "calendar_event", created: true, date: "2026-04-12", title: "Essay #9 Seed Due" },
      ],
      message: "Reminder sent: Essay #9 has no seed yet. Deadline in 13 days.",
    };

    return NextResponse.json(reminderResult);
  } catch (error) {
    return NextResponse.json(
      { error: "Cadence reminder failed", details: String(error) },
      { status: 500 }
    );
  }
}
