import { LayoutCheckBoxFilter } from "../LayoutCheckBoxFilter";
import { ListCheckBox } from "../RecipeFilter";

interface LevelTabProps {
  listCheckBox: ListCheckBox[];
  keyParam: string;
}
export default function LevelTab({ listCheckBox, keyParam }: LevelTabProps) {
  return (
    <div className="border-l-[1px] border-r-[1px] border-b-[1px] border-[#e0e0e0] rounded-br-[8px] rounded-bl-[8px] p-[10px]">
      <LayoutCheckBoxFilter listCheckBox={listCheckBox} keyParam={keyParam} />
    </div>
  );
}
