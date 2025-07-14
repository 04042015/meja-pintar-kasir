import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { categories } from "./CategoryTabs";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface MenuManagementProps {
  menuItems: MenuItem[];
  onMenuUpdate: (menuItems: MenuItem[]) => void;
}

export const MenuManagement = ({ menuItems, onMenuUpdate }: MenuManagementProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("makanan-utama");
  const { toast } = useToast();

  const filteredMenuItems = menuItems.filter(item => item.category === selectedCategory);

  const handleAddItem = () => {
    if (!itemName.trim() || !itemPrice.trim() || !itemCategory) {
      toast({
        title: "Error",
        description: "Semua field harus diisi",
        variant: "destructive",
      });
      return;
    }

    const price = parseInt(itemPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Error",
        description: "Harga harus berupa angka positif",
        variant: "destructive",
      });
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: itemName,
      price: price,
      category: itemCategory,
    };

    onMenuUpdate([...menuItems, newItem]);
    setItemName("");
    setItemPrice("");
    setItemCategory("");
    setIsAddDialogOpen(false);
    toast({
      title: "Berhasil",
      description: "Menu berhasil ditambahkan",
    });
  };

  const handleEditItem = () => {
    if (!editingItem || !itemName.trim() || !itemPrice.trim() || !itemCategory) {
      toast({
        title: "Error",
        description: "Semua field harus diisi",
        variant: "destructive",
      });
      return;
    }

    const price = parseInt(itemPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Error",
        description: "Harga harus berupa angka positif",
        variant: "destructive",
      });
      return;
    }

    const updatedItems = menuItems.map(item =>
      item.id === editingItem.id
        ? { ...item, name: itemName, price: price, category: itemCategory }
        : item
    );

    onMenuUpdate(updatedItems);
    setItemName("");
    setItemPrice("");
    setItemCategory("");
    setEditingItem(null);
    setIsEditDialogOpen(false);
    toast({
      title: "Berhasil",
      description: "Menu berhasil diubah",
    });
  };

  const handleDeleteItem = (itemId: string) => {
    const updatedItems = menuItems.filter(item => item.id !== itemId);
    onMenuUpdate(updatedItems);
    toast({
      title: "Berhasil",
      description: "Menu berhasil dihapus",
    });
  };

  const openEditDialog = (item: MenuItem) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemPrice(item.price.toString());
    setItemCategory(item.category);
    setIsEditDialogOpen(true);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || categoryId;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Manajemen Menu</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Menu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Menu Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="itemName">Nama Menu</Label>
                <Input
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Contoh: Nasi Goreng"
                />
              </div>
              <div>
                <Label htmlFor="itemPrice">Harga</Label>
                <Input
                  id="itemPrice"
                  type="number"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  placeholder="25000"
                />
              </div>
              <div>
                <Label htmlFor="itemCategory">Kategori</Label>
                <Select value={itemCategory} onValueChange={setItemCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddItem} className="w-full">
                Tambah Menu
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMenuItems.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-xs text-muted-foreground">
                Rp {item.price.toLocaleString('id-ID')}
              </div>
              <div className="text-xs text-muted-foreground">
                {getCategoryName(item.category)}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(item)}
                  className="flex-1"
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
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
            <DialogTitle>Edit Menu</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editItemName">Nama Menu</Label>
              <Input
                id="editItemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Contoh: Nasi Goreng"
              />
            </div>
            <div>
              <Label htmlFor="editItemPrice">Harga</Label>
              <Input
                id="editItemPrice"
                type="number"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                placeholder="25000"
              />
            </div>
            <div>
              <Label htmlFor="editItemCategory">Kategori</Label>
              <Select value={itemCategory} onValueChange={setItemCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleEditItem} className="w-full">
              Simpan Perubahan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};