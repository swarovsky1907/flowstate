import { useEffect, useState } from "react";
import { toast } from "sonner";
import DashboardLayout from "../layouts/DashboardLayout";
import GlassCard from "../components/GlassCard";

import {
  getTodaySessions,
  getMissedSessions,
  completeSession,
  type TodaySession,
  type MissedSession,
} from "../api/sessions";

export default function Sessions() {
  const [todaySessions, setTodaySessions] =
    useState<TodaySession[]>([]);

  const [missedSessions, setMissedSessions] =
    useState<MissedSession[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [progressInputs, setProgressInputs] =
    useState<Record<number, number>>({});

  const fetchSessions = async () => {
    try {
      const today =
        await getTodaySessions();

      const missed =
        await getMissedSessions();

      setTodaySessions(today);
      setMissedSessions(missed);
    } catch (error) {
      console.error(error);
      toast.error(
            "Failed to load Sessions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleComplete = async (
    id: number
    ) => {
    try {
        await completeSession(
        id,
        progressInputs[id] || 0
        );
        toast.success("Progress saved");
        fetchSessions();
    } catch (error) {
        toast.error(
        "Failed to save progress"
        );
        console.error(error);
    }
  };

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold">
        Study Sessions
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : todaySessions.length === 0 &&
            missedSessions.length === 0 ? (
            <GlassCard className="p-8 text-center">
                <h3 className="text-xl font-semibold">
                No Sessions Today
                </h3>

                <p className="mt-2 text-slate-400">
                Create some tasks to generate
                study sessions.
                </p>
            </GlassCard>
        ) : (
        <>
          <h2 className="mb-4 text-2xl font-semibold">
            Today's Sessions
          </h2>

          <div className="space-y-4 mb-10">

            {todaySessions.length === 0 ? (
              <GlassCard className="p-6">
                No sessions today.
              </GlassCard>
            ) : (
              todaySessions.map((session) => (
                <GlassCard
                  key={session.session_id}
                  className="p-6"
                >
                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-xl font-semibold">
                        {session.task_title}
                      </h3>

                      <div className="mt-3 flex gap-6 text-sm text-slate-400">

                        <span>
                          Planned:
                          {" "}
                          {session.planned_hours}
                          h
                        </span>

                        <span>
                          Completed:
                          {" "}
                          {session.completed_hours}
                          h
                        </span>

                      </div>

                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            min="0"
                            step="0.5"
                            placeholder="Hours"
                            value={
                                progressInputs[
                                    session.session_id
                                ] ??
                                session.completed_hours
                            }
                            onChange={(e) =>
                            setProgressInputs({
                                ...progressInputs,
                                [session.session_id]:
                                Number(
                                    e.target.value
                                ),
                            })
                            }
                            className="
                            w-24
                            rounded-lg
                            border
                            border-white/10
                            bg-white/5
                            px-3
                            py-2
                            "
                        />

                        <button
                            onClick={() =>
                            handleComplete(
                                session.session_id
                            )
                            }
                            className="
                            rounded-lg
                            bg-purple-600
                            px-4
                            py-2
                            text-white
                            hover:bg-purple-500
                            "
                        >
                            Save Progress
                        </button>

                    </div>

                  </div>
                </GlassCard>
              ))
            )}

          </div>

          <h2 className="mb-4 text-2xl font-semibold">
            Missed Sessions
          </h2>

          <div className="space-y-4">

            {missedSessions.length === 0 ? (
              <GlassCard className="p-6">
                No missed sessions 🎉
              </GlassCard>
            ) : (
              missedSessions.map((session) => (
                <GlassCard
                  key={session.session_id}
                  className="p-6"
                >
                  <h3 className="text-xl font-semibold">
                    {session.task_title}
                  </h3>

                  <div className="mt-3 flex gap-6 text-sm text-slate-400">

                    <span>
                      Planned:
                      {" "}
                      {session.planned_hours}
                      h
                    </span>

                    <span>
                      Date:
                      {" "}
                      {new Date(
                        session.session_date
                      ).toLocaleDateString()}
                    </span>

                  </div>
                </GlassCard>
              ))
            )}

          </div>
        </>
      )}

    </DashboardLayout>
  );
}