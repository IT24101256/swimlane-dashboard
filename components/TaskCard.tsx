import { useDraggable } from '@dnd-kit/core';

type Props = {
  task: {
    id: string;
    title: string;
    description?: string;
    status: string;
  };
};

export default function TaskCard({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-4 mb-2 bg-white rounded shadow cursor-move"
    >
      <h3 className="font-bold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  );
}
