import fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const app = fastify({ logger: true });

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
});
const prisma = new PrismaClient();

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskParams {
  id: string;
}

app.get("/tasks", async () => {
  try {
    const tasks = await prisma.task.findMany();
    return tasks;
  } catch (error) {
    app.log.error(error);
    throw new Error("Erro ao obter tarefas");
  }
});

app.get<{ Params: TaskParams }>("/tasks/:id", async (request) => {
  try {
    const { id } = request.params;
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) throw new Error("Tarefa não encontrada");
    return task;
  } catch (error) {
    app.log.error(error);
    throw new Error("Erro ao obter tarefa");
  }
});

app.post<{ Body: Task }>("/tasks", async (request, reply) => {
  try {
    const { title } = request.body;
    const task = await prisma.task.create({
      data: {
        title,
        completed: false,
      },
    });
    reply.status(201);
    return reply.status(201).send(task);
  } catch (error) {
    app.log.error(error);
    throw new Error("Erro ao criar tarefa");
  }
});

app.patch<{ Body: Task; Params: TaskParams }>("/tasks/:id", async (request) => {
  try {
    const { id } = request.params;
    const { title, completed } = request.body;
    const task = await prisma.task.update({
      where: { id },
      data: { title, completed },
    });
    return task;
  } catch (error) {
    app.log.error(error);
    throw new Error("Erro ao atualizar tarefa");
  }
});

app.delete<{ Params: TaskParams }>("/tasks/:id", async (request) => {
  try {
    const { id } = request.params;
    await prisma.task.delete({
      where: { id },
    });
    return { message: "Tarefa excluída com sucesso" };
  } catch (error) {
    app.log.error(error);
    throw new Error("Erro ao excluir tarefa");
  }
});

const start = async () => {
  try {
    await app.listen({
      port: 3333,
      host: "jurkotask.up.railway.app",
    });
    app.log.info("Servidor iniciado na porta 3333");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
