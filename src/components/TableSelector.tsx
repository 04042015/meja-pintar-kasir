import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Table {
  id: string;
  number: string;
  occupied: boolean;
}

interface TableSelectorProps {
  tables: Table[];
  selectedTable: string | null;
  onSelectTable: (tableId: string) => void;
}

export const TableSelector = ({ tables, selectedTable, onSelectTable }: TableSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-card rounded-lg border">
      <div className="w-full text-sm font-medium text-muted-foreground mb-2">
        Pilih Meja:
      </div>
      {tables.map((table) => (
        <Button
          key={table.id}
          variant={selectedTable === table.id ? "default" : "outline"}
          size="sm"
          className={cn(
            "min-w-[60px]",
            table.occupied && selectedTable !== table.id && "bg-red-accent/10 border-red-accent text-red-accent hover:bg-red-accent hover:text-red-accent-foreground"
          )}
          onClick={() => onSelectTable(table.id)}
        >
          {table.number}
        </Button>
      ))}
    </div>
  );
};