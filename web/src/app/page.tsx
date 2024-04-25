"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          href="#"
        >
          <h1 className="text-3xl font-bold">Tasks manager</h1>
        </Link>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-xl">Tasks</h1>
          <Button className="ml-auto" size="sm">
            Add task
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">To-Do</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                <li className="flex items-center gap-4">
                  <Checkbox className="h-4 w-4" id="task-1" />
                  <label className="flex-1 text-sm" htmlFor="task-1">
                    Wireframe user interface
                  </label>
                </li>
                <li className="flex items-center gap-4">
                  <Checkbox className="h-4 w-4" id="task-2" />
                  <label className="flex-1 text-sm" htmlFor="task-2">
                    Implement task manager
                  </label>
                </li>
                <li className="flex items-center gap-4">
                  <Checkbox className="h-4 w-4" id="task-3" />
                  <label className="flex-1 text-sm" htmlFor="task-3">
                    Write documentation
                  </label>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                <li className="flex items-center gap-4">
                  <Checkbox checked className="h-4 w-4" id="task-6" />
                  <label className="flex-1 text-sm" htmlFor="task-6">
                    Design database schema
                  </label>
                </li>
                <li className="flex items-center gap-4">
                  <Checkbox checked className="h-4 w-4" id="task-7" />
                  <label className="flex-1 text-sm" htmlFor="task-7">
                    Create user stories
                  </label>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
