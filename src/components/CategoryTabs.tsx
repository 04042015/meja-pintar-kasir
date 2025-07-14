import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const categories = [
  { id: "makanan-utama", name: "Makanan Utama", color: "red-accent" },
  { id: "minuman", name: "Minuman", color: "blue-accent" },
  { id: "makanan-pembuka", name: "Pembuka", color: "green-accent" },
  { id: "makanan-penutup", name: "Penutup", color: "yellow-accent" },
  { id: "cemilan", name: "Cemilan", color: "orange" },
] as const;

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryTabs = ({ selectedCategory, onSelectCategory }: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-card rounded-lg border">
      <div className="w-full text-sm font-medium text-muted-foreground mb-2">
        Kategori Menu:
      </div>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? category.color : "outline"}
          size="sm"
          className={cn(
            "transition-all duration-200",
            selectedCategory !== category.id && "hover:scale-105"
          )}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};