"use client";

import { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { year: "2020", travelers: 12000 },
  { year: "2021", travelers: 18000 },
  { year: "2022", travelers: 28000 },
  { year: "2023", travelers: 42000 },
  { year: "2024", travelers: 58000 },
  { year: "2025", travelers: 72000 },
];

const stats = [
  { label: "Destinations", value: 50, suffix: "+" },
  { label: "Happy Travelers", value: 72, suffix: "K+" },
  { label: "Curated Tours", value: 200, suffix: "+" },
  { label: "Years Experience", value: 8, suffix: "+" },
];

function Counter({
  target,
  suffix,
  duration = 2000,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-white rounded-2xl shadow-sm"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary font-heading">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-body">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <h3 className="text-xl font-bold text-dark font-heading mb-6">
            Travelers Over the Years
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#BDC9C6" />
                <XAxis
                  dataKey="year"
                  stroke="#3E4947"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="#3E4947"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [
                    `${Number(value).toLocaleString()}`,
                    "Travelers",
                  ]}
                />
                <Bar
                  dataKey="travelers"
                  fill="#005C55"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
