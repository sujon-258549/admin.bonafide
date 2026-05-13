import React, { useMemo } from "react";
import { Tag } from "antd";
import DataTable from "../../Tables/DataTable";
import Button from "../../ui/Button";
import TakaIcon from "../../ui/TakaIcon";
import type { FilterType } from "../../filter/DateFilter";

interface RecentOrdersTableProps {
  externalFilter?: FilterType;
}

type OrderStatus = "Delivered" | "Processing" | "Pending" | "Cancelled";

const statusColor: Record<OrderStatus, string> = {
  Delivered: "green",
  Processing: "blue",
  Pending: "orange",
  Cancelled: "red",
};

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({
  externalFilter,
}) => {
  const allOrders = [
    {
      _id: "1",
      orderId: "#ORD-10245",
      customer: "Rahim Uddin",
      total: 4200,
      status: "Delivered" as OrderStatus,
      period: "this-week",
    },
    {
      _id: "2",
      orderId: "#ORD-10244",
      customer: "Sumaiya Akter",
      total: 1850,
      status: "Processing" as OrderStatus,
      period: "this-week",
    },
    {
      _id: "3",
      orderId: "#ORD-10243",
      customer: "Kamal Hossain",
      total: 9600,
      status: "Pending" as OrderStatus,
      period: "this-month",
    },
    {
      _id: "4",
      orderId: "#ORD-10242",
      customer: "Nadia Islam",
      total: 3120,
      status: "Delivered" as OrderStatus,
      period: "this-month",
    },
    {
      _id: "5",
      orderId: "#ORD-10241",
      customer: "Tanvir Ahmed",
      total: 760,
      status: "Cancelled" as OrderStatus,
      period: "this-year",
    },
    {
      _id: "6",
      orderId: "#ORD-10240",
      customer: "Mim Tasnim",
      total: 5400,
      status: "Delivered" as OrderStatus,
      period: "this-week",
    },
  ];

  const filteredData = useMemo(() => {
    if (!externalFilter || externalFilter === "this-week") {
      return allOrders.filter((o) => o.period === "this-week");
    }
    if (externalFilter === "this-month") {
      return allOrders.filter(
        (o) => o.period === "this-month" || o.period === "this-week",
      );
    }
    return allOrders;
  }, [externalFilter]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text: string) => (
        <span className="font-semibold text-gray-800">{text}</span>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (val: number) => (
        <span className="font-bold text-gray-900">
          <TakaIcon className="mr-1 text-xs" />
          {val.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: OrderStatus) => (
        <Tag
          color={statusColor[status]}
          bordered={false}
          className="rounded-full px-3"
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
        <Button
          unstyled
          className="text-primary text-sm font-semibold hover:underline"
        >
          View All
        </Button>
      </div>
      <DataTable
        data={filteredData}
        columns={columns}
        isPaginate={false}
        showHeader={true}
      />
    </div>
  );
};

export default RecentOrdersTable;
