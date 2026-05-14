import { useRef } from "react";
import type { InputRef } from "antd";
import { Input, Button as AntButton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type Getter<T> = (record: T) => string | number | null | undefined;

/**
 * Returns Ant Design column props that turn the column's search icon into a
 * working filter: clicking the icon opens an input; typing filters rows by
 * the column value.
 *
 * Usage:
 *   {
 *     ...searchableColumn<Category>("CATEGORY NAME", "name"),
 *     dataIndex: "name",
 *     render: ...
 *   }
 */
export function searchableColumn<T = any>(
  label: string,
  field: keyof T | Getter<T>,
) {
  const getValue: Getter<T> =
    typeof field === "function"
      ? (field as Getter<T>)
      : (record: T) => (record as any)[field];

  return {
    title: (
      <div className="flex items-center justify-between">
        <span>{label}</span>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <FontAwesomeIcon
        icon={faSearch}
        className={`text-xs ${filtered ? "text-primary" : "text-gray-300"}`}
      />
    ),
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <SearchDropdown
        label={label}
        setSelectedKeys={setSelectedKeys}
        selectedKeys={selectedKeys}
        confirm={confirm}
        clearFilters={clearFilters}
      />
    ),
    onFilter: (value: any, record: T) => {
      const raw = getValue(record);
      if (raw === null || raw === undefined) return false;
      return String(raw).toLowerCase().includes(String(value).toLowerCase());
    },
  } as const;
}

const SearchDropdown = ({
  label,
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}: {
  label: string;
  setSelectedKeys: (keys: React.Key[]) => void;
  selectedKeys: React.Key[];
  confirm: () => void;
  clearFilters?: () => void;
}) => {
  const inputRef = useRef<InputRef>(null);

  return (
    <div className="p-2 flex items-center gap-2" onKeyDown={(e) => e.stopPropagation()}>
      <Input
        ref={inputRef}
        placeholder={`Search ${label.toLowerCase()}`}
        value={selectedKeys[0] as string}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => confirm()}
        className="rounded-md"
        style={{ width: 200 }}
        autoFocus
      />
      <AntButton type="primary" size="small" onClick={() => confirm()}>
        Search
      </AntButton>
      <AntButton
        size="small"
        onClick={() => {
          clearFilters?.();
          setSelectedKeys([]);
          confirm();
        }}
      >
        Reset
      </AntButton>
    </div>
  );
};

export default searchableColumn;
