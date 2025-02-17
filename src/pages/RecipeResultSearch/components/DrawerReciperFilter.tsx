import { Button, Collapse, CollapseProps, Drawer } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

import { ListCheckBox } from "./RecipeFilter";
import { LayoutCheckBoxFilter } from "./LayoutCheckBoxFilter";
import { useSetAtom } from "jotai";
import { applyChangesAtom } from "../store";

export interface DrawerReciperFilterRef {
  showDrawer: () => void;
}

interface DrawerReciperFilterProps {
  dataCollapse: {
    key: string;
    label: string;
    icon: React.ReactNode;
    component: React.ReactNode;
    listCheckBox: ListCheckBox[];
    keyParam: string;
  }[];
  onFilter?: () => void;
}
export const DrawerReciperFilter = forwardRef<
  DrawerReciperFilterRef,
  DrawerReciperFilterProps
>(({ dataCollapse, onFilter }: DrawerReciperFilterProps, ref) => {
  const [open, setOpen] = useState(false);
  const setApplyChange = useSetAtom(applyChangesAtom);

  useImperativeHandle(ref, () => ({
    showDrawer() {
      setOpen(true);
    },
  }));

  const onClose = () => {
    setOpen(false);
  };

  const items: CollapseProps["items"] = dataCollapse?.map((item) => {
    return {
      key: item.key,
      label: item.label,
      children: (
        <LayoutCheckBoxFilter
          keyParam={item.keyParam}
          listCheckBox={item.listCheckBox}
        />
      ),
    };
  });

  const handleFilter = () => {
    setOpen(false);
    setApplyChange(true);
    onFilter?.();
  };
  return (
    <Drawer
      title={
        <>
          <div className="flex justify-between items-center">
            <Button type="text" onClick={onClose}>
              Hủy
            </Button>
            <Button type="primary" onClick={handleFilter}>
              Áp dụng
            </Button>
          </div>
        </>
      }
      onClose={onClose}
      open={open}
      closable={false}
      className="reciper_drawer_filter">
      <Collapse className="reciper_drawer_collapse" items={items} />
    </Drawer>
  );
});
