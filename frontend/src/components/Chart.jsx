import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

function TaskChart({ doneTasks, pendingTasks }) {
  const chartData = {
    labels: ["Done", "Pending"],
    datasets: [
      {
        data: [doneTasks, pendingTasks],
        backgroundColor: ["#4caf50", "#1b5e20"],
      },
    ],
  };

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <h4 style={{ textAlign: "center" }}>Today Tasks</h4>
      <Doughnut data={chartData} />
    </div>
  );
}

export default TaskChart;
