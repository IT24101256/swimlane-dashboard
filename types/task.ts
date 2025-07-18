export type TaskStatus = "todo" | "inprogress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};
