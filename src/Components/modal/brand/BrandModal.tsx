import { Modal, Form } from "antd";
import { useEffect, useState } from "react";
import CustomInput from "../../ui/Input";
import CustomSwitch from "../../ui/Switch";
import ImageUploader from "../../ui/ImageUploader";
import CustomButton from "../../ui/Button";
import ModalHeader from "../../common/ModalHeader";

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  status: boolean;
  createdAt?: string;
}

interface BrandModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Omit<Brand, "id" | "createdAt">) => void;
  editData?: Brand | null;
}

const BrandModal = ({
  open,
  onClose,
  onSubmit,
  editData,
}: BrandModalProps) => {
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
          title={editData ? "Update Brand" : "Create Brand"}
          subTitle={
            editData
              ? "Edit the details of the brand."
              : "Fill out the details to create a new brand."
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
      width={820}
      centered
      destroyOnHidden
    >
      <Form form={form} layout="vertical" className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="name"
            label={
              <span className="font-semibold text-gray-700">Brand Name</span>
            }
            rules={[{ required: true, message: "Please enter brand name" }]}
          >
            <CustomInput placeholder="e.g., Bonafide" size="md" />
          </Form.Item>

          <Form.Item
            name="slug"
            label={<span className="font-semibold text-gray-700">Slug</span>}
            rules={[{ required: true, message: "Please enter slug" }]}
          >
            <CustomInput placeholder="e.g., bonafide" size="md" />
          </Form.Item>
        </div>

        <Form.Item
          name="logo"
          label={<span className="font-semibold text-gray-700">Logo</span>}
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
            placeholder="Short description of the brand"
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

export default BrandModal;
