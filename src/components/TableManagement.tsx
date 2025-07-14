import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Table {
  id: string;
  number: string;
  occupied: boolean;
}

interface TableManagementProps {
  tables: Table[];
  onTablesUpdate: (tables: Table[]) => void;
}

export const TableManagement = ({ tables, onTablesUpdate }: TableManagementProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [tableNumber, setTableNumber] = useState("");
  const { toast } = useToast();

  const handleAddTable = () => {
    if (!tableNumber.trim()) {
      toast({
        title: "Error",
        description: "Nomor meja tidak boleh kosong",
        variant: "destructive",
      });
      return;
    }

    const newTable: Table = {
      id: Date.now().toString(),
      number: tableNumber,
      occupied: false,
    };

    onTablesUpdate([...tables, newTable]);
    setTableNumber("");
    setIsAddDialogOpen(false);
    toast({
      title: "Berhasil",
      description: "Meja berhasil ditambahkan",
    });
  };

  const handleEditTable = () => {
    if (!editingTable || !tableNumber.trim()) {
      toast({
        title: "Error",
        description: "Nomor meja tidak boleh kosong",
        variant: "destructive",
      });
      return;
    }

    const updatedTables = tables.map(table =>
      table.id === editingTable.id
        ? { ...table, number: tableNumber }
        : table
    );

    onTablesUpdate(updatedTables);
    setTableNumber("");
    setEditingTable(null);
    setIsEditDialogOpen(false);
    toast({
      title: "Berhasil",
      description: "Meja berhasil diubah",
    });
  };

  const handleDeleteTable = (tableId: string) => {
    const updatedTables = tables.filter(table => table.id !== tableId);
    onTablesUpdate(updatedTables);
    toast({
      title: "Berhasil",
      description: "Meja berhasil dihapus",
    });
  };

  const openEditDialog = (table: Table) => {
    setEditingTable(table);
    setTableNumber(table.number);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Manajemen Meja</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Meja
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Meja Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tableNumber">Nomor Meja</Label>
                <Input
                  id="tableNumber"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Contoh: T-01"
                />
              </div>
              <Button onClick={handleAddTable} className="w-full">
                Tambah Meja
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables.map((table) => (
          <Card key={table.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{table.number}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-xs text-muted-foreground">
                Status: {table.occupied ? "Terisi" : "Kosong"}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(table)}
                  className="flex-1"
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteTable(table.id)}
                  className="flex-1"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Meja</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editTableNumber">Nomor Meja</Label>
              <Input
                id="editTableNumber"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="Contoh: T-01"
              />
            </div>
            <Button onClick={handleEditTable} className="w-full">
              Simpan Perubahan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};