import { Recipe_Instructions } from "../../../../packages/types/product.type";
import { nanoid } from "nanoid";
import {
  ModalInstructionImage,
  ModalInstructionImageRef,
} from "./ModalInstructionImage";
import { memo, useRef } from "react";

interface RecipeInstructionProps {
  data: Recipe_Instructions[];
}
export default memo(function RecipeInstruction({
  data,
}: RecipeInstructionProps) {
  const modalInstructionImageRef = useRef<ModalInstructionImageRef | null>(
    null
  );

  return (
    <div>
      {data?.map((item, index) => (
        <div key={nanoid()} className="flex gap-3 text-[14px] text-[#111]">
          <span>{index + 1}.</span>
          <div>
            <p>{item.instruction_description}</p>
            <div className="flex gap-1 flex-wrap py-3.5">
              {item.instruction_image_list.map((val, index) => {
                return (
                  <img
                    onClick={() =>
                      modalInstructionImageRef.current?.showModal(
                        index,
                        item?.instruction_image_list
                      )
                    }
                    className="w-[70px] h-[70px] object-cover rounded-[4px] cursor-pointer"
                    key={nanoid()}
                    src={val.instruction_image_image}
                    alt={val.instruction_image_image}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ))}
      <ModalInstructionImage ref={modalInstructionImageRef} />
    </div>
  );
});
