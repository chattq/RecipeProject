import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
interface LayoutProductProps {
  title: string;
  child?: React.ReactNode;
  style?: {
    styleTitle?: string;
    styleContainer?: string;
  };
  buttonMore?: {
    isMore: boolean;
    pathName: string;
    style?: string;
  };
}
export default function LayoutProduct({
  title,
  child,
  style,
  buttonMore,
}: LayoutProductProps) {
  return (
    <div className={style?.styleContainer}>
      <div className="flex gap-[20px] layout_product_content">
        <h3
          className={`font-semibold layout_product_title text-[18px] ${style?.styleTitle}`}>
          {title}
        </h3>
        {buttonMore?.isMore && (
          <Link to={buttonMore?.pathName}>
            <div
              className={`flex items-center gap-1 hover:underline text-[#969696] mt-0.5  ${buttonMore?.style}`}>
              <span className=" cursor-pointer text-[15px] font-semibold ">
                Xem thêm
              </span>
              <IoIosArrowForward color="#b2b2b2" size={18} />
            </div>
          </Link>
        )}
      </div>
      {child}
    </div>
  );
}
