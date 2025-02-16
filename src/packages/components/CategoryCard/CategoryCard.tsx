import { CategorieItem } from "../../types/categories.type";

interface CategoryCardProps {
  data: CategorieItem;
}
export default function CategoryCard({ data }: CategoryCardProps) {
  return (
    <div className="cursor-pointer group category_card_wapper">
      <img
        src={data.image}
        alt={data.image}
        className="w-[60px] h-[60px] p-[10px] overflow-hidden m-auto rounded-[8px] hover:bg-[#d3f1dc] border-[1px] border-[#D9D9D9]"
      />
      <div className="text-center truncate text-[12px] pt-1 font-semibold group-hover:underline">
        {data.name}
      </div>
    </div>
  );
}
