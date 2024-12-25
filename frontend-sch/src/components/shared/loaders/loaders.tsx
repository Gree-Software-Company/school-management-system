import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Table Skeleton
function TableLoader() {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead colSpan={4} className="h-10 px-4">
              <Skeleton className="h-6 w-2/3 bg-primary-foreground/20" />
            </TableHead>
          </TableRow>
          <TableRow>
            {[1, 2, 3, 4].map((i) => (
              <TableHead key={i} className="h-10 px-4">
                <Skeleton className="h-4 w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4].map((row) => (
            <TableRow key={row}>
              {[1, 2, 3, 4].map((cell) => (
                <TableCell key={cell} className="px-4 py-2">
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <section className="p-5">
      <TableLoader />
    </section>
  );
}
