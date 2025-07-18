// store/useTaskStore.ts
import { create } from "zustand";
import { Task, TaskStatus } from "@/types/task";
import { nanoid } from "nanoid";

type State = {
  tasks: Task[];
  addTask: (data: Omit<Task, "id">) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  search: string;
  setSearch: (s: string) => void;
};

export const useTaskStore = create<State>((set) => ({
  tasks: [],
  search: "",
  setSearch: (s) => set({ search: s }),
  addTask: (data) =>
    set((state) => ({
      tasks: [...state.tasks, { ...data, id: nanoid() }],
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  moveTask: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status } : t
      ),
    })),
}));


