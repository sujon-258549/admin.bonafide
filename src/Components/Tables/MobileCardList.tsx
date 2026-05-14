import { Spin } from "antd";
import type { ReactNode } from "react";

type ColumnDef = {
  title?: ReactNode;
  dataIndex?: string | string[];
  key?: string;
  render?: (value: any, record: any, index: number) => ReactNode;
};

interface MobileCardListProps {
  data: any[];
  columns: ColumnDef[];
  rowKey: string;
  loading?: boolean;
  onRowClick?: (record: any, rowIndex: number) => { onClick?: (e: any) => void };
}

// Pull plain text out of a title that may be a JSX node like
//   <div><span>NAME</span><icon/></div>
const titleToText = (node: ReactNode): string => {
  if (node === null || node === undefined) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(titleToText).join(" ");
  if (typeof node === "object" && "props" in (node as any)) {
    return titleToText((node as any).props.children);
  }
  return "";
};

const getValue = (record: any, dataIndex?: string | string[]) => {
  if (!dataIndex) return undefined;
  if (Array.isArray(dataIndex)) {
    return dataIndex.reduce((acc, k) => (acc == null ? acc : acc[k]), record);
  }
  return record[dataIndex];
};

const renderCell = (col: ColumnDef, record: any, idx: number) => {
  const value = getValue(record, col.dataIndex);
  if (col.render) return col.render(value, record, idx);
  return value ?? "—";
};

const MobileCardList = ({
  data,
  columns,
  rowKey,
  loading,
  onRowClick,
}: MobileCardListProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
        <Spin />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 text-sm py-10 bg-white rounded-lg border border-gray-200">
        No data
      </div>
    );
  }

  // Identify common column roles
  const actionCol = columns.find(
    (c) => (c.key || "").toLowerCase() === "action",
  );
  const titleCol = columns.find((c) => {
    const k = (c.key || "").toLowerCase();
    return k === "name" || k === "title" || k === "label";
  });
  const restCols = columns.filter(
    (c) => c !== actionCol && c !== titleCol && c.dataIndex !== undefined,
  );

  return (
    <div className="space-y-3">
      {data.map((record, idx) => {
        const handlers = onRowClick ? onRowClick(record, idx) : undefined;
        return (
          <div
            key={record[rowKey] ?? idx}
            onClick={handlers?.onClick}
            className={`bg-white rounded-lg border border-gray-200 p-4 ${
              handlers?.onClick ? "cursor-pointer active:bg-gray-50" : ""
            }`}
          >
            {/* Header: title + action */}
            {(titleCol || actionCol) && (
              <div className="flex items-start justify-between gap-3 pb-3 mb-3 border-b border-gray-100">
                {titleCol ? (
                  <div className="min-w-0 flex-1">
                    {renderCell(titleCol, record, idx)}
                  </div>
                ) : (
                  <div />
                )}
                {actionCol && (
                  <div
                    className="shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {renderCell(actionCol, record, idx)}
                  </div>
                )}
              </div>
            )}

            {/* Body: label/value pairs for remaining columns */}
            <div className="space-y-2">
              {restCols.map((col) => (
                <div
                  key={col.key || String(col.dataIndex)}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 shrink-0 pt-0.5">
                    {titleToText(col.title)}
                  </span>
                  <div className="text-right min-w-0 max-w-[65%]">
                    {renderCell(col, record, idx)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileCardList;
