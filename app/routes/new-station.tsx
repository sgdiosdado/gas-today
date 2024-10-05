import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { stations } from "drizzle/schema";
import { db } from "drizzle/db";

export const meta: MetaFunction = () => {
  return [
    { title: "Gasolina Hoy" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const rows = await db.select().from(stations);
  console.log(formData, rows);
  return {};
}

export default function NewStation() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-4xl font-bold">Agregar estación</h1>
      <Form method="POST" className="flex flex-col gap-2">
        <Input name="station" type="text" placeholder="Nombre de la estación" />
        <Input name="location" type="text" placeholder="Ubicación" />
        <Button>Proponer nueva estación</Button>
      </Form>
    </div>
  );
}
