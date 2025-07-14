import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
}

interface MenuCardProps {
  item: MenuItem;
  variant?: "red-accent" | "green-accent" | "blue-accent" | "orange" | "yellow-accent";
  onAddToOrder: (item: MenuItem) => void;
}

export const MenuCard = ({ item, variant = "orange", onAddToOrder }: MenuCardProps) => {
  const handleClick = () => {
    onAddToOrder(item);
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer">
      <Button
        variant={variant}
        className={cn(
          "w-full h-20 p-3 flex flex-col items-center justify-center text-center rounded-lg font-medium",
          "hover:scale-100 transition-all duration-200"
        )}
        onClick={handleClick}
      >
        <div className="text-sm font-semibold truncate w-full">
          {item.name}
        </div>
        <div className="text-xs opacity-90 mt-1">
          Rp {item.price.toLocaleString('id-ID')}
        </div>
      </Button>
    </Card>
  );
};