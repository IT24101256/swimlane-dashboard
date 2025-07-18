"use client";

import { useDraggable } from "@dnd-kit/core";
import { Task } from "@/types/task";
import { cn } from "@/lib/utils";

type Props = {
  task: Task;
  onDelete: () => void;
};

export default function TaskCard({ task, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: { task },
    });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={cn(
        "bg-white p-4 shadow-md rounded-xl mb-4 border-l-8 transition-all relative",
        isDragging && "opacity-50",
        task.status === "todo"
          ? "border-red-500"
          : task.status === "inprogress"
          ? "border-yellow-500"
          : "border-green-500"
      )}
    >
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
        title="Delete"
        aria-label="Delete"
      >
        ×
      </button>
      <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  );
}
