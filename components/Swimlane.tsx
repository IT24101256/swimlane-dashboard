"use client";

import { useDroppable } from "@dnd-kit/core";
import { Task, TaskStatus } from "@/types/task";
import TaskCard from "./TaskCard";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  deleteTask: (id: string) => void;
};

export default function Swimlane({ title, status, tasks, deleteTask }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div className="flex-1 min-w-[300px]">
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <div
        ref={setNodeRef}
        className={cn(
          "rounded-xl p-4 min-h-[400px] transition-colors",
          isOver ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-800"
        )}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={() => deleteTask(task.id)} />
        ))}
      </div>
    </div>
  );
}


