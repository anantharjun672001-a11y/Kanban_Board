import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function EditTaskModal({ task, close }) {
  const { updateTask } = useTasks();
  const [form, setForm] = useState({ ...task });

  const save = () => {
    updateTask(form);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-xl w-[90%] max-w-md">
        <h2 className="text-white font-semibold mb-4">Edit Task</h2>

        <input
          className="w-full mb-3 px-3 py-2 rounded bg-slate-700 text-white"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full mb-3 px-3 py-2 rounded bg-slate-700 text-white"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="w-full mb-4 px-3 py-2 rounded bg-slate-700 text-white"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={close}
            className="px-4 py-2 rounded bg-slate-600 text-white"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="px-4 py-2 rounded bg-indigo-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
