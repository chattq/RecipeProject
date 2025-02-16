import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import DebouncedSearch from "../DebouncedSearch";

export default memo(function Header() {
  const nav = useNavigate();

  return (
    <div className="h-[55px] bg-[#F22726] fixed w-full z-[9] top-0 px-3">
      <div className="leading-[55px]">
        <div className="flex items-center justify-between">
          <div
            className="text-[25px] font-semibold text-[#fff] header_logo w-[120px] text-right cursor-pointer"
            onClick={() => nav("/")}>
            Cooky
          </div>
          <DebouncedSearch />
          <div className="w-[80px] header_avt">
            <Avatar
              style={{
                backgroundColor: "#e4e6eb",
                color: "black",
                borderRadius: "50%",
              }}
              size={35}
              icon={<UserOutlined />}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
