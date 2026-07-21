"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import type { Competency } from "@/lib/db/evaluation";

function label(name: string) {
  return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CompetencyRadar({
  competencies,
}: {
  competencies: Competency[];
}) {
  const data = competencies.map((c) => ({
    subject: label(c.name),
    score: c.score ?? 0, // not-assessed shows as 0 on the chart
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="rgba(42,37,33,0.12)" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#6f655a" }} />
        <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 10, fill: "#a99f92" }} />
        <Radar
          dataKey="score"
          stroke="#fb5a3c"
          fill="#fb5a3c"
          fillOpacity={0.3}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
