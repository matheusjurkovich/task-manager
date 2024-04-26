"use client";
import { useState, useEffect } from "react";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";

import { api } from "@/API/api";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function Component() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-xl">Tasks</h1>
          <Button className="ml-auto" size="sm">
            Add task
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card id="toDo">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">To-Do</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {tasks
                  .filter((task) => !task.completed)
                  .map((task) => (
                    <li key={task.id} className="flex items-center gap-2">
                      <Checkbox
                        onClick={() => console.log("clicado")}
                        className="h-4 w-4"
                        id={`task-${task.id}`}
                      />
                      <label
                        className="flex-1 text-sm"
                        htmlFor={`task-${task.id}`}
                      >
                        {task.title}
                      </label>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          <Card id="completed">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {tasks
                  .filter((task) => task.completed)
                  .map((task) => (
                    <li key={task.id} className="flex items-center gap-2">
                      <Checkbox
                        checked
                        disabled
                        className="h-4 w-4"
                        id={`task-${task.id}`}
                      />
                      <label
                        className="flex-1 text-sm line-through"
                        htmlFor={`task-${task.id}`}
                      >
                        {task.title}
                      </label>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
