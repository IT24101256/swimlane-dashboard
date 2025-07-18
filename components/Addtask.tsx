'use client';

import { useTaskStore } from "@/store/useTaskStore";
import { useState } from "react";

type Props = {
  status: "todo" | "inprogress" | "done";
};

export default function AddTask({ status }: Props) {
  const [title, setTitle] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title, status);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task..."
          className="flex-1 border rounded-lg p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </form>
  );
}
