import { useState } from "react";
import { Tooltip, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faRotateRight,
  faPenToSquare,
  faTrash,
  faSearch,
  faFilter,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../../Components/common/PageHeader";
import CustomButton from "../../Components/ui/Button";
import CustomSwitch from "../../Components/ui/Switch";
import DataTable from "../../Components/Tables/DataTable";
import BrandModal, {
  type Brand,
} from "../../Components/modal/brand/BrandModal";

const seedBrands: Brand[] = [
  {
    id: "1",
    name: "Bonafide",
    slug: "bonafide",
    description: "House brand for traditional wear.",
    status: true,
    createdAt: "01-04-2026",
  },
  {
    id: "2",
    name: "Aarong",
    slug: "aarong",
    description: "Heritage Bangladeshi clothing brand.",
    status: true,
    createdAt: "02-04-2026",
  },
  {
    id: "3",
    name: "Yellow",
    slug: "yellow",
    description: "Casual & contemporary fashion.",
    status: true,
    createdAt: "05-04-2026",
  },
  {
    id: "4",
    name: "Sailor",
    slug: "sailor",
    description: "Smart, urban men's wear.",
    status: true,
    createdAt: "10-04-2026",
  },
  {
    id: "5",
    name: "Le Reve",
    slug: "le-reve",
    description: "Western-inspired women's wear.",
    status: false,
    createdAt: "12-04-2026",
  },
];

const BrandList = () => {
  const [brands, setBrands] = useState<Brand[]>(seedBrands);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Brand | null>(null);

  const handleCreate = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (record: Brand) => {
    setEditData(record);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
  };

  const handleStatusChange = (id: string, checked: boolean) => {
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: checked } : b)),
    );
  };

  const handleSubmit = (values: Omit<Brand, "id" | "createdAt">) => {
    if (editData) {
      setBrands((prev) =>
        prev.map((b) => (b.id === editData.id ? { ...b, ...values } : b)),
      );
    } else {
      const newBrand: Brand = {
        id: Date.now().toString(),
        ...values,
        createdAt: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
      };
      setBrands((prev) => [newBrand, ...prev]);
    }
  };

  const columns = [
    {
      title: "ACTION",
      key: "action",
      width: 110,
      render: (_: unknown, record: Brand) => (
        <div className="flex items-center gap-2">
          <Tooltip title="Edit Brand">
            <CustomButton
              variant="outline"
              size="icon-sm"
              onClick={() => handleEdit(record)}
              icon={
                <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
              }
            />
          </Tooltip>
          <Popconfirm
            title="Delete Brand"
            description="Are you sure you want to delete this brand?"
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete Brand">
              <CustomButton
                variant="danger-outline"
                size="icon-sm"
                icon={<FontAwesomeIcon icon={faTrash} className="text-xs" />}
              />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-between">
          <span>BRAND</span>
          <FontAwesomeIcon icon={faSearch} className="text-gray-300 text-xs" />
        </div>
      ),
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Brand) => (
        <div>
          <p className="font-semibold text-gray-800">{text}</p>
          <p className="text-[11px] text-gray-400">{record.slug}</p>
        </div>
      ),
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <span className="text-gray-500 text-sm">{text}</span>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-between">
          <span>STATUS</span>
          <FontAwesomeIcon icon={faFilter} className="text-gray-300 text-xs" />
        </div>
      ),
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: Brand) => (
        <CustomSwitch
          checked={status}
          onChange={(checked: boolean) => handleStatusChange(record.id, checked)}
          size="default"
        />
      ),
    },
    {
      title: (
        <div className="flex items-center justify-between">
          <span>CREATED AT</span>
          <FontAwesomeIcon icon={faSort} className="text-primary text-xs" />
        </div>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <span className="text-gray-600 font-medium">{date}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[
          { label: "Home", path: "/" },
          { label: "Brand Management" },
          { label: "All Brands" },
        ]}
        title="Brands"
        subTitle="Manage all brands across your catalog."
        extra={
          <div className="flex gap-3">
            <CustomButton
              variant="outline"
              size="sm"
              icon={<FontAwesomeIcon icon={faRotateRight} />}
            >
              Refresh
            </CustomButton>
            <CustomButton
              variant="primary"
              size="sm"
              onClick={handleCreate}
              icon={<FontAwesomeIcon icon={faPlus} />}
            >
              Add Brand
            </CustomButton>
          </div>
        }
      />

      <DataTable
        data={brands}
        columns={columns}
        isPaginate={true}
        showHeader={true}
        rowKey="id"
      />

      <BrandModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </div>
  );
};

export default BrandList;
