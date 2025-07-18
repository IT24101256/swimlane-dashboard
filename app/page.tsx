"use client";

import { useTaskStore } from "@/store/useTaskStore";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Swimlane from "@/components/Swimlane";
import { useState } from "react";

export default function Home() {
  const {
    tasks,
    addTask,
    deleteTask,
    moveTask,
    search,
    setSearch,
  } = useTaskStore();

  // Add task form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"todo" | "inprogress" | "done">("todo");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addTask({ title, description, status });
    setTitle("");
    setDescription("");
    setStatus("todo");
  };

  // Filtered by search box
  const filteredTasks = tasks.filter(
    (task) =>
      (!search ||
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()))
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (
      active.id !== over.id &&
      typeof over.id === "string" &&
      ["todo", "inprogress", "done"].includes(over.id)
    ) {
      moveTask(active.id as string, over.id as any);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-6">
      <h1 className="text-4xl font-bold text-white text-center mb-10">
        🧠 Swimlane Task Dashboard
      </h1>
      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="max-w-xl mx-auto mb-6 flex flex-col gap-3 p-4 bg-white rounded-lg shadow-md">
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 rounded px-2 py-1 border"
            placeholder="Task Title"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="rounded px-2 border bg-white"
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="rounded px-2 py-1 border"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white font-bold py-2 rounded hover:bg-purple-700 transition-colors"
        >
          Add Task
        </button>
      </form>

      {/* Search Box */}
      <div className="max-w-xl mx-auto mb-10 flex justify-between items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded px-2 py-1 border"
          placeholder="Search tasks..."
        />
        <button
          onClick={() => setSearch("")}
          className="ml-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
        >
          Clear
        </button>
      </div>

      <DndContext onDragEnd={onDragEnd}>
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          <Swimlane
            title="To Do"
            status="todo"
            tasks={filteredTasks.filter((task) => task.status === "todo")}
            deleteTask={deleteTask}
          />
          <Swimlane
            title="In Progress"
            status="inprogress"
            tasks={filteredTasks.filter((task) => task.status === "inprogress")}
            deleteTask={deleteTask}
          />
          <Swimlane
            title="Done"
            status="done"
            tasks={filteredTasks.filter((task) => task.status === "done")}
            deleteTask={deleteTask}
          />
        </div>
      </DndContext>
    </main>
  );
}
