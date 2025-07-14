import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import * as XLSX from "xlsx";

export default function ShiftReport() {
  const { orders } = useCart();

  // Hitung total penjualan
  const totalPenjualan = useMemo(() => {
    return orders.reduce((sum, order) => sum + order.total, 0);
  }, [orders]);

  // Contoh pengeluaran (bisa diganti dengan form input)
  const pengeluaranData = [
    { keterangan: "Beli galon air", jumlah: 20000 },
    { keterangan: "Kantong plastik", jumlah: 10000 },
    { keterangan: "Gas 3kg", jumlah: 25000 },
  ];

  const totalPengeluaran = pengeluaranData.reduce((sum, p) => sum + p.jumlah, 0);
  const selisih = totalPenjualan - totalPengeluaran;

  // Hitung menu terlaris
  const menuCount = useMemo(() => {
    const count: Record<string, number> = {};
    orders.forEach(order =>
      order.items.forEach(item => {
        count[item.name] = (count[item.name] || 0) + item.quantity;
      })
    );
    return Object.entries(count).sort(([, a], [, b]) => b - a);
  }, [orders]);

  // Export ke Excel
  const handleExport = () => {
    const ws1 = XLSX.utils.json_to_sheet(
      orders.flatMap(order =>
        order.items.map(item => ({
          Menu: item.name,
          Qty: item.quantity,
          Harga: item.price,
          Subtotal: item.quantity * item.price,
          Waktu: new Date(order.createdAt).toLocaleString(),
        }))
      )
    );

    const ws2 = XLSX.utils.json_to_sheet([
      { Keterangan: "Total Penjualan", Jumlah: totalPenjualan },
      { Keterangan: "Total Pengeluaran", Jumlah: totalPengeluaran },
      { Keterangan: "Selisih Kas", Jumlah: selisih },
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "Penjualan");
    XLSX.utils.book_append_sheet(wb, ws2, "Rekap Shift");
    XLSX.writeFile(wb, `laporan-shift-${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Laporan Shift Kasir</h1>

      <Card>
        <CardHeader>
          <CardTitle>Rekap Penjualan</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Total Penjualan:</strong> Rp {totalPenjualan.toLocaleString()}</p>
          <p><strong>Total Pengeluaran:</strong> Rp {totalPengeluaran.toLocaleString()}</p>
          <p><strong>Selisih Kas:</strong> Rp {selisih.toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menu Terlaris</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {menuCount.slice(0, 5).map(([name, qty]) => (
              <li key={name}>{name} - {qty} pcs</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Button onClick={handleExport}>📥 Export ke Excel</Button>
    </div>
  );
                                 }
