import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { TableManagement } from "./TableManagement";
import { MenuManagement } from "./MenuManagement";

interface SettingsProps {
  onBack: () => void;
  tables: Array<{ id: string; number: string; occupied: boolean }>;
  onTablesUpdate: (tables: Array<{ id: string; number: string; occupied: boolean }>) => void;
  menuItems: Array<{ id: string; name: string; price: number; category: string }>;
  onMenuUpdate: (menuItems: Array<{ id: string; name: string; price: number; category: string }>) => void;
}

export const Settings = ({ onBack, tables, onTablesUpdate, menuItems, onMenuUpdate }: SettingsProps) => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Pengaturan
          </h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="tables" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tables">Meja</TabsTrigger>
                <TabsTrigger value="menu">Menu</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tables" className="mt-6">
                <TableManagement tables={tables} onTablesUpdate={onTablesUpdate} />
              </TabsContent>
              
              <TabsContent value="menu" className="mt-6">
                <MenuManagement menuItems={menuItems} onMenuUpdate={onMenuUpdate} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};