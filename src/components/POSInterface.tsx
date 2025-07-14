import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MenuCard, MenuItem } from "./MenuCard";
import { OrderItemComponent, OrderItem } from "./OrderItem";
import { TableSelector } from "./TableSelector";
import { CategoryTabs, categories } from "./CategoryTabs";
import { Settings } from "./Settings";
import { Receipt, Save, Trash2, CreditCard, Settings as SettingsIcon } from "lucide-react";

// Sample menu data
const sampleMenuItems: MenuItem[] = [
  // Makanan Utama
  { id: "1", name: "Nasi Goreng Spesial", price: 25000, category: "makanan-utama" },
  { id: "2", name: "Ayam Bakar", price: 30000, category: "makanan-utama" },
  { id: "3", name: "Rendang Daging", price: 35000, category: "makanan-utama" },
  { id: "4", name: "Soto Ayam", price: 20000, category: "makanan-utama" },
  
  // Minuman
  { id: "5", name: "Es Teh Manis", price: 8000, category: "minuman" },
  { id: "6", name: "Jus Jeruk", price: 12000, category: "minuman" },
  { id: "7", name: "Kopi Hitam", price: 10000, category: "minuman" },
  { id: "8", name: "Es Campur", price: 15000, category: "minuman" },
  
  // Pembuka
  { id: "9", name: "Kerupuk", price: 5000, category: "makanan-pembuka" },
  { id: "10", name: "Gado-gado", price: 18000, category: "makanan-pembuka" },
  
  // Penutup
  { id: "11", name: "Es Krim", price: 12000, category: "makanan-penutup" },
  { id: "12", name: "Pudding", price: 10000, category: "makanan-penutup" },
  
  // Cemilan
  { id: "13", name: "Pisang Goreng", price: 8000, category: "cemilan" },
  { id: "14", name: "Tahu Isi", price: 6000, category: "cemilan" },
];

// Sample tables
const sampleTables = [
  { id: "1", number: "T-01", occupied: false },
  { id: "2", number: "T-02", occupied: true },
  { id: "3", number: "T-03", occupied: false },
  { id: "4", number: "T-04", occupied: false },
  { id: "5", number: "T-05", occupied: true },
  { id: "6", number: "T-06", occupied: false },
  { id: "7", number: "T-07", occupied: false },
  { id: "8", number: "T-08", occupied: false },
];

export const POSInterface = () => {
  const [selectedCategory, setSelectedCategory] = useState("makanan-utama");
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(sampleMenuItems);
  const [tables, setTables] = useState(sampleTables);

  const filteredMenuItems = menuItems.filter(
    (item) => item.category === selectedCategory
  );

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || "orange";
  };

  const handleAddToOrder = (menuItem: MenuItem) => {
    if (!selectedTable) {
      alert("Silakan pilih meja terlebih dahulu!");
      return;
    }

    const existingItem = orderItems.find((item) => item.id === menuItem.id);
    
    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setOrderItems([
        ...orderItems,
        {
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
        },
      ]);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setOrderItems(
      orderItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const selectedTableNumber = selectedTable 
    ? tables.find(table => table.id === selectedTable)?.number 
    : null;

  if (showSettings) {
    return (
      <Settings
        onBack={() => setShowSettings(false)}
        tables={tables}
        onTablesUpdate={setTables}
        menuItems={menuItems}
        onMenuUpdate={setMenuItems}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        
        {/* Left Side - Menu */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Meja Pintar Kasir
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {selectedTableNumber && `Meja: ${selectedTableNumber}`}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
              >
                <SettingsIcon className="h-4 w-4 mr-2" />
                Pengaturan
              </Button>
            </div>
          </div>

          <TableSelector
            tables={tables}
            selectedTable={selectedTable}
            onSelectTable={setSelectedTable}
          />

          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredMenuItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                variant={getCategoryColor(selectedCategory)}
                onAddToOrder={handleAddToOrder}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="space-y-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pesanan</span>
                {selectedTableNumber && (
                  <span className="text-sm font-normal text-muted-foreground">
                    {selectedTableNumber}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Receipt className="mx-auto h-12 w-12 mb-2 opacity-50" />
                  <p>Belum ada pesanan</p>
                  <p className="text-xs">Pilih menu untuk menambah pesanan</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {orderItems.map((item) => (
                    <OrderItemComponent
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              )}

              {orderItems.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pajak (10%):</span>
                      <span>Rp {(calculateTotal() * 0.1).toLocaleString('id-ID')}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>Rp {(calculateTotal() * 1.1).toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={handleClearOrder}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Simpan
                    </Button>
                  </div>

                  <Button
                    variant="default"
                    className="w-full"
                    size="lg"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Bayar
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};