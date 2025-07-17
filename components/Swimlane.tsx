'use client';

import React from 'react';
import TaskCard from './TaskCard';
import { Task, useTaskStore } from '@/store/useTaskStore';
import { useDroppable } from '@dnd-kit/core';

interface Props {
  lane: Task['status'];
}

export default function Swimlane({ lane }: Props) {
  const tasks = useTaskStore((state) =>
    state.tasks.filter(
      (task) =>
        task.status === lane &&
        task.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    )
  );

  const { setNodeRef, isOver } = useDroppable({
    id: lane,
  });

  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  // Handle drop logic outside component in page.tsx for simplicity

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col bg-gray-100 p-4 rounded min-w-[250px] max-w-xs
        ${isOver ? 'bg-blue-100' : 'bg-gray-100'}`}
    >
      <h2 className="text-lg font-bold mb-4">{lane}</h2>
      {tasks.length === 0 && (
        <p className="text-gray-500">No tasks</p>
      )}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}


