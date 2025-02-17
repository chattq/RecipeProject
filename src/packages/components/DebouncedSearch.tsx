import { AutoComplete, Input } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";

export default function DebouncedSearch() {
  const nav = useNavigate();
  const location = useLocation();

  const [options, setOptions] = useState([
    { value: "Sữa chua" },
    { value: "Canh chua" },
    { value: "Lẩu gà" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState<any>(null);

  const performSearch = useCallback((query: string) => {
    if (query) {
      const dataCopy = [
        { value: "Sữa chua" },
        { value: "Canh chua" },
        { value: "Lẩu gà" },
      ];
      setOptions(
        dataCopy.filter((obj) =>
          removeVietnameseTones(obj.value.toLowerCase()).includes(
            removeVietnameseTones(query.toLowerCase())
          )
        )
      );
    } else {
      setOptions([
        { value: "Sữa chua" },
        { value: "Canh chua" },
        { value: "Lẩu gà" },
      ]);
    }
  }, []);

  // Hàm xử lý tìm kiếm với debounce được ghi nhớ
  const handleSearch = useCallback(
    (value: string) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout); // Xóa timeout trước đó
      }
      setSearchTerm(value);
      setDebounceTimeout(
        setTimeout(() => {
          performSearch(value);
        }, 300)
      );
    },
    [debounceTimeout, performSearch, searchTerm] // Đảm bảo debounceTimeout và performSearch được cập nhật đúng
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        if (debounceTimeout) {
          clearTimeout(debounceTimeout); // Xóa timeout nếu có
        }
        setSearchTerm(event.currentTarget.value);
        if (event.currentTarget.value) {
          nav(`/results?q=${event.currentTarget.value}&tab=1`);
        }
      }
    },
    [debounceTimeout, searchTerm]
  );

  const handleSelect = useCallback(
    (value: string) => {
      setSearchTerm(value);
      nav(`/results?q=${value}&tab=1`);
    },
    [nav]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get("q") || "";
    setSearchTerm(q);
  }, [location.search]);

  return (
    <AutoComplete
      popupClassName="certain-category-search-dropdown"
      className="header_search"
      style={{ width: "35%", marginTop: "-5px" }}
      onSearch={handleSearch}
      onSelect={handleSelect}
      options={options}
      dropdownStyle={{
        zIndex: 10,
      }}
      value={searchTerm}
      dropdownRender={(menu) => <div>{menu}</div>}>
      <Input
        size="large"
        onKeyDown={handleKeyDown}
        placeholder="Tìm kiếm tên công thức..."
      />
    </AutoComplete>
  );
}
