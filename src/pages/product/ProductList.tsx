import { useState } from "react";
import { Tooltip, Popconfirm, Tag } from "antd";
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
import TakaIcon from "../../Components/ui/TakaIcon";
import DataTable from "../../Components/Tables/DataTable";
import ProductModal, {
  type Product,
} from "../../Components/modal/product/ProductModal";

const seedProducts: Product[] = [
  {
    id: "1",
    name: "Premium Silk Saree",
    slug: "premium-silk-saree",
    category: "Saree",
    brand: "Bonafide",
    price: 4500,
    stock: 42,
    description: "Pure silk with traditional motif.",
    status: true,
    createdAt: "01-05-2026",
  },
  {
    id: "2",
    name: "Cotton Lungi Classic",
    slug: "cotton-lungi-classic",
    category: "Lungi",
    brand: "Bonafide",
    price: 650,
    stock: 130,
    description: "Soft, breathable cotton lungi.",
    status: true,
    createdAt: "02-05-2026",
  },
  {
    id: "3",
    name: "Poplin Shirt Fabric",
    slug: "poplin-shirt-fabric",
    category: "Fabric",
    brand: "Bonafide",
    price: 950,
    stock: 78,
    description: "Premium poplin cloth per yard.",
    status: true,
    createdAt: "03-05-2026",
  },
  {
    id: "4",
    name: "Designer Three-Piece",
    slug: "designer-three-piece",
    category: "Three-Piece",
    brand: "Sailor",
    price: 3200,
    stock: 24,
    description: "Embroidered party three-piece.",
    status: true,
    createdAt: "05-05-2026",
  },
  {
    id: "5",
    name: "Embroidered Panjabi",
    slug: "embroidered-panjabi",
    category: "Panjabi",
    brand: "Aarong",
    price: 2100,
    stock: 0,
    description: "Hand-embroidered cotton panjabi.",
    status: false,
    createdAt: "06-05-2026",
  },
];

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Product | null>(null);

  const handleCreate = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (record: Product) => {
    setEditData(record);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleStatusChange = (id: string, checked: boolean) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: checked } : p)),
    );
  };

  const handleSubmit = (values: Omit<Product, "id" | "createdAt">) => {
    if (editData) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editData.id ? { ...p, ...values } : p)),
      );
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...values,
        createdAt: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
  };

  const columns = [
    {
      title: "ACTION",
      key: "action",
      width: 110,
      render: (_: unknown, record: Product) => (
        <div className="flex items-center gap-2">
          <Tooltip title="Edit Product">
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
            title="Delete Product"
            description="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete Product">
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
          <span>PRODUCT</span>
          <FontAwesomeIcon icon={faSearch} className="text-gray-300 text-xs" />
        </div>
      ),
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Product) => (
        <div>
          <p className="font-semibold text-gray-800">{text}</p>
          <p className="text-[11px] text-gray-400">{record.slug}</p>
        </div>
      ),
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
      render: (text: string) => (
        <Tag bordered={false} className="rounded-full px-3 bg-gray-100">
          {text}
        </Tag>
      ),
    },
    {
      title: "BRAND",
      dataIndex: "brand",
      key: "brand",
      render: (text: string) => (
        <span className="text-gray-600 font-medium">{text}</span>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <span className="font-bold text-gray-900">
          <TakaIcon className="mr-1 text-xs" />
          {price.toLocaleString()}
        </span>
      ),
    },
    {
      title: "STOCK",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) => (
        <span
          className={`font-semibold ${stock === 0 ? "text-rose-500" : stock < 10 ? "text-amber-500" : "text-gray-700"}`}
        >
          {stock === 0 ? "Out" : stock}
        </span>
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
      render: (status: boolean, record: Product) => (
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
          { label: "Product Management" },
          { label: "All Products" },
        ]}
        title="Products"
        subTitle="Manage all products in your catalog."
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
              Add Product
            </CustomButton>
          </div>
        }
      />

      <DataTable
        data={products}
        columns={columns}
        isPaginate={true}
        showHeader={true}
        rowKey="id"
      />

      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </div>
  );
};

export default ProductList;
