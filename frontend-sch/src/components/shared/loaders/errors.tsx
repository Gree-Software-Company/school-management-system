import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Table Error Indicator
function TableErrorIndicator({ error }: { error: Errors }) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead colSpan={4} className="h-10 px-4">
              There was an Error!!
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {error?.response?.data?.error || error?.response?.data?.message}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export function TableError({ error }: { error: Errors }) {
  return (
    <section className="p-5">
      <TableErrorIndicator error={error} />
    </section>
  );
}
