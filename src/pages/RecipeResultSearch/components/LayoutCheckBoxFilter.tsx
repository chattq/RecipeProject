import { Checkbox, CheckboxChangeEvent } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

interface LayoutCheckBoxFilterProps {
  listCheckBox: {
    label: string;
    key: string;
  }[];
  keyParam: string;
}
export const LayoutCheckBoxFilter = forwardRef(
  ({ listCheckBox, keyParam }: LayoutCheckBoxFilterProps, ref) => {
    const nav = useNavigate();
    const location = useLocation();
    const [checkedLevels, setCheckedLevels] = useState<string[]>([]);
    // Initialize checkedLevels from URL on component mount
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const levels = searchParams.get(keyParam)?.split(",") || [];
      setCheckedLevels(levels);
    }, [location.search]);

    useImperativeHandle(ref, () => ({}));

    const onChangeCheckItem = (e: CheckboxChangeEvent, value: string) => {
      const searchParams = new URLSearchParams(location.search);

      // Lấy danh sách các level đã tick
      let currentLevels = searchParams.get(keyParam)?.split(",") || [];

      // Thêm hoặc xóa level tùy thuộc vào trạng thái của checkbox
      if (e.target.checked) {
        if (!currentLevels.includes(value)) {
          currentLevels.push(value);
        }
      } else {
        currentLevels = currentLevels.filter((level) => level !== value);
      }

      // Cập nhật tham số 'level'
      if (currentLevels.length > 0) {
        searchParams.set(keyParam, currentLevels.join(","));
      } else {
        searchParams.delete(keyParam);
      }

      // Giữ nguyên các tham số khác và cập nhật URL
      nav(`${location.pathname}?${searchParams.toString()}`);
    };

    return (
      <div className="grid grid-cols-6 gap-[10px] layout-checkbox-filter">
        {listCheckBox.map((item) => (
          <Checkbox
            key={nanoid()}
            checked={checkedLevels.includes(item.key)}
            onChange={(e) => onChangeCheckItem(e, item.key)}>
            <div className="max-w-[150px] text-wrap leading-[16px] text-[13px]">
              {item.label}
            </div>
          </Checkbox>
        ))}
      </div>
    );
  }
);
