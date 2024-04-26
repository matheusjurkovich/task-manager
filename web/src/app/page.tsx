"use client";
import { useState, useEffect } from "react";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Pencil, PlusCircle, Trash } from "@phosphor-icons/react";

import { api } from "@/API/api";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  updatedAt: string;
}

export default function Component() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { toast } = useToast();

  const getTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (title: string, description?: string) => {
    try {
      if (!title) {
        throw new Error("Title is required");
      }
      const response = await api.post("/tasks", {
        title,
        description,
      });
      setTasks([...tasks, response.data]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const updateTask = async (id: string, completed: boolean, title?: string) => {
    try {
      const response = await api.patch(`/tasks/${id}`, {
        title,
        completed,
      });
      console.log(response.data);
      setTasks(
        tasks.map((task) =>
          task.id === response.data.id ? response.data : task
        )
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
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
          <h1 className="font-semibold text-xl">Tarefas</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-auto gap-1" size="sm">
                <PlusCircle size={20} /> Adicionar tarefa
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Tarefa</DialogTitle>
                <DialogDescription>
                  Informe o nome e a descrição da tarefa a ser feita.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Titulo
                  </Label>
                  <Input
                    id="title"
                    placeholder="Titulo da sua tarefa"
                    className="col-span-3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descrição
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Informações sobre sua tarefa (Opcional)"
                    className="col-span-3 "
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={async () => {
                    const success = await createTask(title);
                    if (success) {
                      toast({
                        variant: "success",
                        title: "Sucesso!",
                        description: "Tarefa criada com sucesso!",
                      });
                    } else {
                      toast({
                        variant: "destructive",
                        title: "Erro!",
                        description: "Ocorreu um erro ao criar a tarefa.",
                      });
                    }
                  }}
                  type="submit"
                >
                  Adicionar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card id="toDo">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">A fazer</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {tasks.filter((task) => !task.completed).length === 0 ? (
                  <p className="opacity-50 text-sm">
                    Nenhuma tarefa para realizar...
                  </p>
                ) : (
                  tasks
                    .filter((task) => !task.completed)
                    .map((task) => (
                      <li key={task.id} className="flex items-center gap-2">
                        <Checkbox
                          onClick={() => {
                            updateTask(task.id, true);
                          }}
                          className="h-4 w-4"
                          
                        />

                        <label
                          className="flex-1 text-sm"
                          
                        >
                          {task.title}
                        </label>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <Pencil size={16} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Editar Tarefa</DialogTitle>
                              <DialogDescription>
                                Edite os campos que quer alterar.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                  Titulo
                                </Label>
                                <Input
                                  id="title"
                                  placeholder="Titulo da sua tarefa"
                                  className="col-span-3"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="description"
                                  className="text-right"
                                >
                                  Descrição
                                </Label>
                                <Textarea
                                  id="description"
                                  placeholder="Informações sobre sua tarefa"
                                  className="col-span-3 "
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={() => {
                                  updateTask(task.id, false, title);
                                }}
                                type="submit"
                              >
                                Adicionar
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </li>
                    ))
                )}
              </ul>
            </CardContent>
          </Card>

          <Card id="completed">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {tasks.filter((task) => task.completed).length === 0 ? (
                  <p className="opacity-50 text-sm">
                    Nenhuma tarefa concluida...
                  </p>
                ) : (
                  tasks
                    .filter((task) => task.completed)
                    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
                    .map((task) => (
                      <li key={task.id} className="flex items-center gap-2">
                        <Checkbox
                          checked
                          disabled
                          className="h-4 w-4"
                          id={`task-${task.id}`}
                        />
                        <label
                          className="flex-1 peer-disabled:line-through text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor={`task-${task.id}`}
                        >
                          {task.title}
                        </label>
                      </li>
                    ))
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
