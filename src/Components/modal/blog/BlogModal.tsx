import { Modal, Form } from "antd";
import { useEffect, useState } from "react";
import CustomInput from "../../ui/Input";
import CustomSelect from "../../ui/Select";
import CustomSwitch from "../../ui/Switch";
import ImageUploader from "../../ui/ImageUploader";
import CustomButton from "../../ui/Button";
import ModalHeader from "../../common/ModalHeader";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  thumbnail?: string;
  excerpt?: string;
  content?: string;
  status: boolean;
  publishedAt?: string;
}

interface BlogModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Omit<Blog, "id" | "publishedAt">) => void;
  editData?: Blog | null;
}

const blogCategoryOptions = [
  { value: "Fashion Trends", label: "Fashion Trends" },
  { value: "Style Guide", label: "Style Guide" },
  { value: "Fabric Care", label: "Fabric Care" },
  { value: "Brand Story", label: "Brand Story" },
  { value: "Festive", label: "Festive" },
];

const BlogModal = ({
  open,
  onClose,
  onSubmit,
  editData,
}: BlogModalProps) => {
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
          title={editData ? "Update Blog" : "Create Blog"}
          subTitle={
            editData
              ? "Edit the details of the blog post."
              : "Fill out the details to publish a new blog."
          }
        />
      }
      footer={
        <div className="flex justify-end gap-3">
          <CustomButton variant="outline" size="md" onClick={onClose}>
            Cancel
          </CustomButton>
          <CustomButton variant="primary" size="md" onClick={handleOk}>
            {editData ? "Update" : "Publish"}
          </CustomButton>
        </div>
      }
      width={920}
      style={{ top: 24 }}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" className="pt-4">
        <Form.Item
          name="title"
          label={
            <span className="font-semibold text-gray-700">Blog Title</span>
          }
          rules={[{ required: true, message: "Please enter blog title" }]}
        >
          <CustomInput
            placeholder="e.g., How to choose the right saree for Eid"
            size="md"
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="slug"
            label={<span className="font-semibold text-gray-700">Slug</span>}
            rules={[{ required: true, message: "Please enter slug" }]}
          >
            <CustomInput placeholder="e.g., choosing-saree-for-eid" size="md" />
          </Form.Item>

          <Form.Item
            name="author"
            label={<span className="font-semibold text-gray-700">Author</span>}
            rules={[{ required: true, message: "Please enter author name" }]}
          >
            <CustomInput placeholder="e.g., Nadia Islam" size="md" />
          </Form.Item>
        </div>

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
            options={blogCategoryOptions}
          />
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label={
            <span className="font-semibold text-gray-700">Thumbnail</span>
          }
          valuePropName="value"
        >
          <ImageUploader ratio="wide" />
        </Form.Item>

        <Form.Item
          name="excerpt"
          label={<span className="font-semibold text-gray-700">Excerpt</span>}
        >
          <CustomInput.TextArea
            placeholder="Short summary that appears in listings"
            rows={2}
          />
        </Form.Item>

        <Form.Item
          name="content"
          label={<span className="font-semibold text-gray-700">Content</span>}
          rules={[{ required: true, message: "Please write blog content" }]}
        >
          <CustomInput.TextArea
            placeholder="Write the full blog post here..."
            rows={6}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-semibold text-gray-700">Published</span>
          }
        >
          <CustomSwitch
            checked={status}
            onChange={setStatus}
            checkedChildren="Live"
            unCheckedChildren="Draft"
            size="default"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BlogModal;
