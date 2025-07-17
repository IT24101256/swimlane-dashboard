import create from 'zustand';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

interface TaskState {
  tasks: Task[];
  searchQuery: string;
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (id: string, newStatus: Task['status']) => void;
  setSearchQuery: (query: string) => void;
}

const STORAGE_KEY = 'task-board-data';

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  searchQuery: '',
  setTasks: (tasks) => {
    set({ tasks });
    // persist
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },
  updateTaskStatus: (id, newStatus) => {
    const updatedTasks = get().tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    set({ tasks: updatedTasks });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export const loadTasksFromStorage = (): Task[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};


