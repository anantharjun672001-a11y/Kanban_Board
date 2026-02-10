import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const headerColor = {
  "To Do": "bg-slate-700",
  "In Progress": "bg-indigo-600",
  "Done": "bg-emerald-600"
};

export default function Column({ title }) {
  const { tasks } = useTasks();
  const list = tasks.filter(t => t.status === title);

  
  const { setNodeRef } = useDroppable({
    id: title
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-slate-800/70 border border-slate-700 rounded-2xl overflow-hidden shadow-xl min-h-[350px]"
    >
      <div className={`px-4 py-3 text-white font-semibold ${headerColor[title]}`}>
        {title}
      </div>

      <div className="p-4">
        <SortableContext
          items={list.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {list.length === 0 && (
            <p className="text-slate-500 text-sm">No tasks</p>
          )}

          {list.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
