import { type MetaFunction } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "drizzle/db";
import { stations } from "drizzle/schema";

export const meta: MetaFunction = () => {
  return [
    { title: "Gasolina Hoy" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type TableRow = {
  id: number;
  name: string;
  price: number;
  location: string;
  updatedAt: string;
};
const columnHelper = createColumnHelper<TableRow>();
const columns = [
  columnHelper.accessor("name", {
    header: () => "Estación",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: () => "Precio",
    cell: (info) => {
      const formatter = Intl.NumberFormat("es-MX", {
        style: "currency",
        maximumFractionDigits: 2,
        currency: "MXN",
      });
      return formatter.format(info.getValue());
    },
  }),
  columnHelper.accessor("location", {
    header: () => "Ubicación",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("updatedAt", {
    header: () => "Última actualización",
    cell: (info) => {
      if (!info.getValue()) return null;
      const date = new Date(info.getValue());
      const formatter = Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
      });
      return formatter.format(date);
    },
  }),
];

export async function loader() {
  const data = await db
    .select({
      id: stations.id,
      name: stations.name,
      price: stations.lastPrice,
      location: stations.location,
      updatedAt: stations.updatedAt,
    })
    .from(stations);
  console.log(data);
  return data;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-4xl font-bold">Gasolina Hoy</h1>
      <div className="flex gap-2">
        <Input placeholder="Ingresa tu ubicación" />
        <Button>
          <MagnifyingGlassIcon />
        </Button>
      </div>
      <Button variant="secondary" className="flex gap-2" asChild>
        <Link to="new-station">
          <PlusIcon /> Agregar estación
        </Link>
      </Button>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
