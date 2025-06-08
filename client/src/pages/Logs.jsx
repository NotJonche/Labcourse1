import React, { useEffect, useState } from "react";
import axios from "axios";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/logs/logs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLogs(response.data);
      } catch (err) {
        console.error("Error fetching logs:", err);
        setError("Failed to load logs. You may not have permission.");
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">System Logs</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">#</th>
              <th className="p-2">User ID</th>
              <th className="p-2">Action</th>
              <th className="p-2">Details</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={log.id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{log.user_id}</td>
                <td className="p-2">{log.action}</td>
                <td className="p-2">{log.details}</td>
                <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;
