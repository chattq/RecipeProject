import { ProductItem } from "../../types/product.type";
import { GoClock } from "react-icons/go";
import { IoIosFlash } from "react-icons/io";
import { FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { Tooltip } from "antd";
import { memo } from "react";

interface ProductCardProps {
  data: ProductItem;
}
export default memo(function ProductCard({ data }: ProductCardProps) {
  return (
    <div className="group border-[1px] rounded-xl border-[#e0e0e0] overflow-hidden">
      <Link
        to={{
          pathname: `/cong-thuc/${data.name}`,
          search: `recipe_id=${data.id}`,
        }}>
        <div className="overflow-hidden text-center">
          <img
            src={data.image}
            alt={data.image}
            className=" w-full product_image object-cover h-[180px] transition-transform duration-300 ease-in-out hover:scale-110 "
          />
        </div>
      </Link>

      <div className="pt-1 px-3 pb-3 product_name">
        <Link
          to={{
            pathname: `/cong-thuc/${data.name}`,
            search: `recipe_id=${data.id}`,
          }}>
          <Tooltip title={data.name} placement="top">
            <h3 className="font-semibold line-clamp-1 hover:underline">
              {data.name}
            </h3>
          </Tooltip>
        </Link>

        <div>
          <ul className="flex gap-[5px] mt-[3px] product_card_infor">
            <li>
              <div className="flex items-center gap-1">
                <span className="font-semibold">
                  <GoClock size={15} color="#B2b2b2" />
                </span>
                <span className="text-[12px] font-semibold text-[#B2b2b2]">
                  {data.cook_time}
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-[2px] mr-2">
                <span className="font-semibold">
                  <IoIosFlash size={15} color="#B2b2b2" />
                </span>
                <span className="text-[12px] font-semibold text-[#B2b2b2]">
                  {data.cook_level}
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-[5px]">
                <span className="font-semibold">
                  <FaChartBar size={15} color="#B2b2b2" />
                </span>
                <span className="text-[12px] font-semibold text-[#B2b2b2] ">
                  {data.cook_view}
                </span>
              </div>
            </li>
          </ul>
          <div className="flex items-center justify-between mt-[5px] product_infor_user">
            <Link to="*">
              <div className="flex items-center gap-3 hover:underline">
                <img
                  src={
                    data.recipe_by_image
                      ? data.recipe_by_image
                      : "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/fd35c-no-user-image-icon-27.png?fit=500%2C500&ssl=1"
                  }
                  alt={data.recipe_by_image}
                  className="w-[24px] h-[24px] rounded-full object-cover "
                />
                <div className="text-[13px] font-bold text-[#6b6b6b]">
                  {data.recipe_by}
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold text-[#B2b2b2]">
                {data.cook_like}
              </span>
              <Tooltip title="Yêu thích">
                <span className="FaRegHeart cursor-pointer">
                  <FaRegHeart size={18} color="#B2b2b2" />
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
