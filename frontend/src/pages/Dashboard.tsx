import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import GlassCard from "../components/GlassCard";

import {
  getOverview,
  getProductivity,
  getStreak,
} from "../api/analytics";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [overview, setOverview] = useState({
    total_tasks: 0,
    completed_tasks: 0,
    completion_rate: 0,
    total_hours_studied: 0,
    missed_sessions: 0,
  });

  const [productivity, setProductivity] = useState({
    planned_hours: 0,
    completed_hours: 0,
    productivity_score: 0,
  });

  const [streak, setStreak] = useState({
    current_streak: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [
          overviewData,
          productivityData,
          streakData,
        ] = await Promise.all([
          getOverview(),
          getProductivity(),
          getStreak(),
        ]);

        setOverview(overviewData);
        setProductivity(productivityData);
        setStreak(streakData);
      } catch (error) {
        console.error(
          "Failed to fetch analytics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <DashboardLayout>
      <h1
        className="
          mb-8
          text-4xl
          font-extrabold
        "
      >
        Dashboard
      </h1>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        <GlassCard className="p-6">
          <p className="text-slate-400">
            Total Tasks
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {loading
              ? "..."
              : overview.total_tasks}
          </h2>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-slate-400">
            Completed
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {loading
              ? "..."
              : overview.completed_tasks}
          </h2>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-slate-400">
            Productivity
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {loading
              ? "..."
              : `${Math.round(
                  productivity.productivity_score
                )}%`}
          </h2>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-slate-400">
            Streak
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {loading
              ? "..."
              : `${streak.current_streak} Days`}
          </h2>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}