import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskForm() {
  const { addTask } = useTasks();
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "normal",
    dueDate: "",
    tags: ""
  });

  const submit = () => {
    if (!form.title) return;

    addTask({
      id: Date.now().toString(),
      ...form,
      tags: form.tags.split(",").map(t => t.trim())
    });

    setForm({
      title: "",
      description: "",
      status: "To Do",
      priority: "normal",
      dueDate: "",
      tags: ""
    });
  };

  return (
    <div className="bg-slate-800/70 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-xl">
      <h2 className="text-white font-semibold mb-4">Create Task</h2>

      <input
        className="w-full mb-3 px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-400"
        placeholder="Task title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full mb-3 px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-400"
        placeholder="Description (optional)"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <select
          className="px-4 py-3 rounded-lg bg-slate-700 text-white"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select
          className="px-4 py-3 rounded-lg bg-slate-700 text-white"
          value={form.priority}
          onChange={e => setForm({ ...form, priority: e.target.value })}
        >
          <option>low</option>
          <option>normal</option>
          <option>high</option>
        </select>

        <input
          type="date"
          className="px-4 py-3 rounded-lg bg-slate-700 text-white"
          value={form.dueDate}
          onChange={e => setForm({ ...form, dueDate: e.target.value })}
        />
      </div>

      <input
        className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-700 text-white"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={e => setForm({ ...form, tags: e.target.value })}
      />

      <button
        onClick={submit}
        className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl text-white font-medium"
      >
        Add Task
      </button>
    </div>
  );
}
