import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderItemProps {
  item: OrderItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const OrderItemComponent = ({ item, onUpdateQuantity, onRemove }: OrderItemProps) => {
  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="flex items-center justify-between py-2 px-3 bg-background border rounded-lg">
      <div className="flex-1">
        <div className="text-sm font-medium">{item.name}</div>
        <div className="text-xs text-muted-foreground">
          Rp {item.price.toLocaleString('id-ID')}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={handleDecrease}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="text-sm font-medium min-w-[20px] text-center">
          {item.quantity}
        </span>
        
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={handleIncrease}
        >
          <Plus className="h-3 w-3" />
        </Button>
        
        <Button
          variant="destructive"
          size="icon"
          className="h-6 w-6 ml-1"
          onClick={handleRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="text-sm font-medium ml-3 min-w-[80px] text-right">
        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
      </div>
    </div>
  );
};