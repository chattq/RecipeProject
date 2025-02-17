import { Select, Tabs } from "antd";
import React, { useMemo, useRef } from "react";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { RiArrowDownSFill } from "react-icons/ri";
import LevelTab from "./RecipeFilterTabs/LevelTab";
import IngredientTab from "./RecipeFilterTabs/IngredientTab";
import "./RecipeFilter.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import {
  DrawerReciperFilter,
  DrawerReciperFilterRef,
} from "./DrawerReciperFilter";
import useQueryParams from "../../../packages/hooks/useQueryParams";

export interface ListCheckBox {
  label: string;
  key: string;
}

interface RecipeFilterProps {
  onFilter?: () => void;
}

export default function RecipeFilter({ onFilter }: RecipeFilterProps) {
  const position: PositionType[] = ["left", "right"];
  const navigate = useNavigate();
  const location = useLocation();
  const drawerReciperFilterRef = useRef<DrawerReciperFilterRef>(null);
  const queryParamsHook = useQueryParams();

  const handleChange = (value: string) => {
    const queryParams = new URLSearchParams(location.search);
    if (value) {
      queryParams.set("arrange", value);
      navigate(`/results?${queryParams.toString()}`);
    } else {
      queryParams.delete("arrange");
      navigate(`/results?${queryParams.toString()}`);
    }
  };

  const OperationsSlot: Record<PositionType, React.ReactNode> = {
    left: (
      <div className="mt-1.5 pr-5.5">
        <HiMiniBars3CenterLeft size={20} />
      </div>
    ),
    right: (
      <div>
        <span className="mr-2">Sắp xếp:</span>
        <Select
          defaultValue={queryParamsHook.arrange || ""}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { label: "---", value: "" },
            { label: "Yêu thích", value: "like" },
          ]}
        />
      </div>
    ),
  };

  const slot = useMemo(() => {
    if (position.length === 0) {
      return null;
    }
    return position.reduce(
      (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
      {}
    );
  }, [position]);

  type PositionType = "left" | "right";

  const listCheckBoxIngredient: ListCheckBox[] = [
    {
      label: "Dâu tây",
      key: "dautay",
    },
    {
      label: "Sả",
      key: "sa",
    },
    {
      label: "Trân châu",
      key: "tranchau",
    },
    {
      label: "Đào",
      key: "dao",
    },
    {
      label: "Khế",
      key: "khe",
    },
    {
      label: "Dọc mùng",
      key: "docmung",
    },
    {
      label: "Tôm",
      key: "tom",
    },
    {
      label: "Cá",
      key: "ca",
    },
    {
      label: "Cà phê",
      key: "caphe",
    },
    {
      label: "Thạch",
      key: "thach",
    },
  ];
  const listCheckBoxLevel: ListCheckBox[] = [
    {
      label: "Dễ",
      key: "easy",
    },
    {
      label: "Trung bình",
      key: "medium",
    },
    {
      label: "Khó",
      key: "difficult",
    },
  ];

  const tabs = [
    {
      key: "1",
      label: "Nguyên liệu",
      icon: <RiArrowDownSFill />,
      component: (
        <IngredientTab
          listCheckBox={listCheckBoxIngredient}
          keyParam={"ingredient"}
        />
      ),
      listCheckBox: listCheckBoxIngredient,
      keyParam: "ingredient",
    },
    {
      key: "2",
      label: "Độ khó",
      icon: <RiArrowDownSFill />,
      component: (
        <LevelTab listCheckBox={listCheckBoxLevel} keyParam={"level"} />
      ),
      listCheckBox: listCheckBoxLevel,
      keyParam: "level",
    },
  ];

  const renderTabLabel = (label: string, icon: React.ReactNode) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <span>{label}</span>
      {icon}
    </div>
  );

  const { TabPane } = Tabs;

  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab") || tabs[0].key;

  const handleChangeTab = (val: string) => {
    const query = searchParams.get("q") || ""; // Hoặc lấy giá trị khác từ URL
    if (query) {
      searchParams.set("tab", val);
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } else {
      navigate(`/results?tab=${val}`);
    }
  };

  const showDrawerFilter = () => {
    drawerReciperFilterRef.current?.showDrawer();
  };

  return (
    <>
      <Tabs
        tabBarExtraContent={slot}
        className="recipe_filter"
        style={{
          marginTop: "15px",
        }}
        activeKey={currentTab}
        onChange={(val) => handleChangeTab(val)}>
        {tabs.map((tab) => (
          <TabPane tab={renderTabLabel(tab.label, tab.icon)} key={tab.key}>
            {tab.component}
          </TabPane>
        ))}
      </Tabs>
      <div className="px-2 py-2 flex justify-end recipe_filter_responsive">
        <div onClick={showDrawerFilter} className="cursor-pointer">
          <CiFilter size={25} />
        </div>
        <DrawerReciperFilter
          ref={drawerReciperFilterRef}
          dataCollapse={tabs}
          onFilter={onFilter}
        />
      </div>
    </>
  );
}
