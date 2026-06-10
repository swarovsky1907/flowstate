import { useEffect, useState } from "react";
import {
  getOverview,
  getProductivity,
  getStreak,
  getWeeklyAnalytics,
} from "../api/analytics";
import DashboardLayout from "../layouts/DashboardLayout";
import GlassCard from "../components/GlassCard";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Analytics() {
  const [overview, setOverview] = useState<any>(null);
  const [productivity, setProductivity] = useState<any>(null);
  const [streak, setStreak] = useState<any>(null);
  const [weekly, setWeekly] = useState<any[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [
        overviewData,
        productivityData,
        streakData,
        weeklyData,
      ] = await Promise.all([
        getOverview(),
        getProductivity(),
        getStreak(),
        getWeeklyAnalytics(),
      ]);

      setOverview(overviewData);
      setProductivity(productivityData);
      setStreak(streakData);
      setWeekly(weeklyData);
    } catch (error) {
      console.error(error);
      toast.error(
            "Failed to load Analytics"
      );
    }
  };

  if (!overview || !productivity || !streak) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400 text-lg">
          Loading analytics...
        </p>
      </div>
    );
  }

  if (overview.total_hours_studied === 0) {
    return (
        <DashboardLayout>
            <h1 className="mb-8 text-4xl font-bold">
                Analytics
            </h1>
        <GlassCard className="p-10 text-center">
            <h2 className="text-2xl font-semibold text-white">
            No Analytics Yet
            </h2>

            <p className="mt-3 text-slate-400">
            Start studying to unlock
            productivity insights.
            </p>
        </GlassCard>
        </DashboardLayout>
    );
  }

  const formattedWeekly = weekly.map((item) => ({
    ...item,
    day: new Date(item.date).toLocaleDateString(
      "en-US",
      {
        weekday: "short",
      }
    ),
  }));

  return (
    <DashboardLayout>
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-white">
          Analytics
        </h1>

        <p className="text-slate-400 mt-2">
          Track your study performance and progress.
        </p>
      </div>

      {/* Top Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-slate-400">
            Completion Rate
          </h3>

          <p className="text-3xl font-bold text-white mt-2">
            {overview.completion_rate}%
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-slate-400">
            Productivity Score
          </h3>

          <p className="text-3xl font-bold text-cyan-400 mt-2">
            {productivity.productivity_score}%
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-slate-400">
            Current Streak
          </h3>

          <p className="text-3xl font-bold text-orange-400 mt-2">
            🔥 {streak.current_streak}
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-slate-400">
            Hours Studied
          </h3>

          <p className="text-3xl font-bold text-green-400 mt-2">
            {overview.total_hours_studied}
          </p>
        </GlassCard>
      </div>

      {/* Weekly Chart */}

      <GlassCard className="p-6 w-full">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Weekly Study Hours
          </h2>

          <p className="text-slate-400">
            Actual study time over the last week.
          </p>
        </div>

        {weekly.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-slate-300">
              No study data yet.
            </p>

            <p className="text-slate-500 mt-2">
              Complete your first session to start
              building insights.
            </p>
          </div>
        ) : (
          <div className="h-80 w-full min-w-0">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={formattedWeekly}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#8B5CF6"
                  strokeWidth={4}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </GlassCard>

      {/* Bottom Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white">
            Tasks Completed
          </h3>

          <p className="text-4xl font-bold mt-4 text-green-400">
            {overview.completed_tasks}
          </p>

          <p className="text-slate-400 mt-2">
            out of {overview.total_tasks} tasks
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white">
            Missed Sessions
          </h3>

          <p className="text-4xl font-bold mt-4 text-red-400">
            {overview.missed_sessions}
          </p>

          <p className="text-slate-400 mt-2">
            Sessions requiring attention
          </p>
        </GlassCard>
      </div>
    </div>
    </DashboardLayout>
  );
}