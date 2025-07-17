'use client';

import React, { useEffect, useState } from 'react';
import Swimlane from '@/components/Swimlane';
import { useTaskStore, loadTasksFromStorage, Task } from '@/store/useTaskStore';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const setTasks = useTaskStore((state) => state.setTasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const searchQuery = useTaskStore((state) => state.searchQuery);
  const setSearchQuery = useTaskStore((state) => state.setSearchQuery);

  useEffect(() => {
    // Load from localStorage or fetch JSON
    const storedTasks = loadTasksFromStorage();
    if (storedTasks.length) {
      setTasks(storedTasks);
      setLoading(false);
    } else {
      fetch('/data/tasks.json')
        .then((res) => res.json())
        .then((data: Task[]) => {
          setTasks(data);
          setLoading(false);
        });
    }
  }, [setTasks]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      updateTaskStatus(String(active.id), over.id as Task['status']);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <main className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Task Board</h1>

      <input
        type="text"
        placeholder="Search tasks..."
        className="mb-6 p-2 border border-gray-300 rounded w-full max-w-md"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-wrap gap-6">
          <Swimlane lane="To Do" />
          <Swimlane lane="In Progress" />
          <Swimlane lane="Done" />
        </div>
      </DndContext>
    </main>
  );
}
