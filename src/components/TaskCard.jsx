import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task }) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}
      className="bg-slate-900/80 border border-slate-700 rounded-xl p-4 mb-3 shadow-md cursor-move"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-white text-sm font-medium">{task.title}</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white">
          {task.priority}
        </span>
      </div>

      <p className="text-slate-400 text-xs mt-1">{task.description}</p>

      {task.dueDate && (
        <p className="text-slate-500 text-xs mt-2">
          Due: {task.dueDate}
        </p>
      )}
    </div>
  );
}
