import React from "react";
import { FlatList } from "react-native";

import { ItemWrapper } from "./ItemWrapper";

import { TaskItem } from "./TaskItem";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface EditTask {
  taskId: number;
  taskNewTitle: string;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (task: EditTask) => void;
  taskAlreadyExists: (title: string) => boolean;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
  taskAlreadyExists,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              index={index}
              item={item}
              removeTask={removeTask}
              toggleTaskDone={toggleTaskDone}
              editTask={editTask}
              taskAlreadyExists={taskAlreadyExists}
            />
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
