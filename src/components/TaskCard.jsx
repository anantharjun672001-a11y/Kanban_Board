import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTasks } from "../context/TaskContext";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

export default function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const [openEdit, setOpenEdit] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition
  } = useSortable({ id: task.id });

  return (
    <>
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition
        }}
        className="bg-slate-900/80 border border-slate-700 rounded-xl p-4 mb-3 shadow-md"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start">
          {/* CLICK = EDIT */}
          <div
            onClick={() => setOpenEdit(true)}
            className="cursor-pointer"
          >
            <h3 className="text-white text-sm font-medium">
              {task.title}
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              {task.description}
            </p>
          </div>

          {/* DELETE BUTTON (ONLY DELETE HERE) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
            className="ml-2 px-2 py-1 text-xs rounded-md
                       bg-red-600 hover:bg-red-500 text-white"
          >
            Delete
          </button>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-3">
          {task.dueDate && (
            <p className="text-slate-500 text-xs">
              Due: {task.dueDate}
            </p>
          )}

          {/* DRAG HANDLE ONLY */}
          <div
            {...attributes}
            {...listeners}
            className="text-slate-400 text-xs cursor-grab select-none"
          >
            ⠿ Drag
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {openEdit && (
        <EditTaskModal
          task={task}
          close={() => setOpenEdit(false)}
        />
      )}
    </>
  );
}
