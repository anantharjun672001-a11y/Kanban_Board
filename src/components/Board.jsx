import { DndContext, closestCenter } from "@dnd-kit/core";
import { useTasks } from "../context/TaskContext";
import Column from "./Column";
import TaskForm from "./TaskForm";

const columns = ["To Do", "In Progress", "Done"];

export default function Board() {
  const { tasks, updateTask } = useTasks();

  const handleDragEnd = ({ active, over }) => {
  if (!over) return;

  const task = tasks.find(t => t.id === active.id);
  if (!task) return;

  // over.id = column title
  if (task.status !== over.id) {
    updateTask({
      ...task,
      status: over.id
    });
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 p-8">
      <h1 className="text-3xl font-bold text-white">Kanban Board</h1>
      <p className="text-slate-400 mb-6">
        Create, organize, and move tasks between columns.
      </p>

      <TaskForm />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {columns.map(col => (
            <Column key={col} title={col} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
