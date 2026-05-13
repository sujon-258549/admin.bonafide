import { Modal, Form, InputNumber } from "antd";
import { useEffect, useState } from "react";
import CustomInput from "../../ui/Input";
import CustomSelect from "../../ui/Select";
import CustomSwitch from "../../ui/Switch";
import ImageUploader from "../../ui/ImageUploader";
import CustomButton from "../../ui/Button";
import ModalHeader from "../../common/ModalHeader";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  description?: string;
  thumbnail?: string;
  status: boolean;
  createdAt?: string;
}

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Omit<Product, "id" | "createdAt">) => void;
  editData?: Product | null;
}

const categoryOptions = [
  { value: "Saree", label: "Saree" },
  { value: "Lungi", label: "Lungi" },
  { value: "Three-Piece", label: "Three-Piece" },
  { value: "Panjabi", label: "Panjabi" },
  { value: "Fabric", label: "Fabric" },
];

const brandOptions = [
  { value: "Bonafide", label: "Bonafide" },
  { value: "Aarong", label: "Aarong" },
  { value: "Yellow", label: "Yellow" },
  { value: "Sailor", label: "Sailor" },
  { value: "Le Reve", label: "Le Reve" },
];

const ProductModal = ({
  open,
  onClose,
  onSubmit,
  editData,
}: ProductModalProps) => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
      setStatus(editData.status);
    } else {
      form.resetFields();
      setStatus(true);
    }
  }, [editData, form, open]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit({ ...values, status });
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <ModalHeader
          title={editData ? "Update Product" : "Create Product"}
          subTitle={
            editData
              ? "Edit the details of the product."
              : "Fill out the details to create a new product."
          }
        />
      }
      footer={
        <div className="flex justify-end gap-3">
          <CustomButton variant="outline" size="md" onClick={onClose}>
            Cancel
          </CustomButton>
          <CustomButton variant="primary" size="md" onClick={handleOk}>
            {editData ? "Update" : "Create"}
          </CustomButton>
        </div>
      }
      width={920}
      style={{ top: 24 }}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" className="pt-4">
        <Form.Item
          name="name"
          label={
            <span className="font-semibold text-gray-700">Product Name</span>
          }
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <CustomInput placeholder="e.g., Premium Silk Saree" size="md" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="slug"
            label={<span className="font-semibold text-gray-700">Slug</span>}
            rules={[{ required: true, message: "Please enter slug" }]}
          >
            <CustomInput placeholder="e.g., premium-silk-saree" size="md" />
          </Form.Item>

          <Form.Item
            name="brand"
            label={<span className="font-semibold text-gray-700">Brand</span>}
            rules={[{ required: true, message: "Please select brand" }]}
          >
            <CustomSelect
              placeholder="Select brand"
              size="md"
              options={brandOptions}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            name="category"
            label={
              <span className="font-semibold text-gray-700">Category</span>
            }
            rules={[{ required: true, message: "Please select category" }]}
          >
            <CustomSelect
              placeholder="Select category"
              size="md"
              options={categoryOptions}
            />
          </Form.Item>

          <Form.Item
            name="price"
            label={
              <span className="font-semibold text-gray-700">Price (BDT)</span>
            }
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber
              placeholder="e.g., 2500"
              min={0}
              className="!w-full !rounded-lg"
              size="middle"
            />
          </Form.Item>

          <Form.Item
            name="stock"
            label={<span className="font-semibold text-gray-700">Stock</span>}
            rules={[{ required: true, message: "Please enter stock" }]}
          >
            <InputNumber
              placeholder="e.g., 50"
              min={0}
              className="!w-full !rounded-lg"
              size="middle"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="thumbnail"
          label={
            <span className="font-semibold text-gray-700">Thumbnail</span>
          }
          valuePropName="value"
        >
          <ImageUploader ratio="square" />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <span className="font-semibold text-gray-700">Description</span>
          }
        >
          <CustomInput.TextArea
            placeholder="Enter product description"
            rows={3}
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold text-gray-700">Status</span>}
        >
          <CustomSwitch
            checked={status}
            onChange={setStatus}
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            size="default"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
