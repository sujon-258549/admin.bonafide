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
import DataTable from "../../Components/Tables/DataTable";
import BlogModal, { type Blog } from "../../Components/modal/blog/BlogModal";

const seedBlogs: Blog[] = [
  {
    id: "1",
    title: "How to choose the perfect saree for Eid",
    slug: "perfect-saree-for-eid",
    author: "Nadia Islam",
    category: "Style Guide",
    excerpt:
      "A simple guide to picking colors, fabric and motifs for festive occasions.",
    content: "Full article body...",
    status: true,
    publishedAt: "20-04-2026",
  },
  {
    id: "2",
    title: "Caring for poplin fabric",
    slug: "caring-for-poplin-fabric",
    author: "Rahim Uddin",
    category: "Fabric Care",
    excerpt: "Wash, iron and store poplin shirts so they last for years.",
    content: "Full article body...",
    status: true,
    publishedAt: "22-04-2026",
  },
  {
    id: "3",
    title: "The story behind Bonafide",
    slug: "story-behind-bonafide",
    author: "Editorial Team",
    category: "Brand Story",
    excerpt: "From a small Dhaka tailor shop to a national brand.",
    content: "Full article body...",
    status: false,
    publishedAt: "01-05-2026",
  },
  {
    id: "4",
    title: "Lungi styling for the modern man",
    slug: "lungi-styling-modern-man",
    author: "Tanvir Ahmed",
    category: "Fashion Trends",
    excerpt: "Pairing traditional lungis with casual contemporary fits.",
    content: "Full article body...",
    status: true,
    publishedAt: "08-05-2026",
  },
];

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>(seedBlogs);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Blog | null>(null);

  const handleCreate = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (record: Blog) => {
    setEditData(record);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const handleStatusChange = (id: string, checked: boolean) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: checked } : b)),
    );
  };

  const handleSubmit = (values: Omit<Blog, "id" | "publishedAt">) => {
    if (editData) {
      setBlogs((prev) =>
        prev.map((b) => (b.id === editData.id ? { ...b, ...values } : b)),
      );
    } else {
      const newBlog: Blog = {
        id: Date.now().toString(),
        ...values,
        publishedAt: new Date()
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-"),
      };
      setBlogs((prev) => [newBlog, ...prev]);
    }
  };

  const columns = [
    {
      title: "ACTION",
      key: "action",
      width: 110,
      render: (_: unknown, record: Blog) => (
        <div className="flex items-center gap-2">
          <Tooltip title="Edit Blog">
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
            title="Delete Blog"
            description="Are you sure you want to delete this blog post?"
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete Blog">
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
          <span>TITLE</span>
          <FontAwesomeIcon icon={faSearch} className="text-gray-300 text-xs" />
        </div>
      ),
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Blog) => (
        <div>
          <p className="font-semibold text-gray-800">{text}</p>
          <p className="text-[11px] text-gray-400">{record.slug}</p>
        </div>
      ),
    },
    {
      title: "AUTHOR",
      dataIndex: "author",
      key: "author",
      render: (text: string) => (
        <span className="text-gray-700 font-medium">{text}</span>
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
      title: (
        <div className="flex items-center justify-between">
          <span>STATUS</span>
          <FontAwesomeIcon icon={faFilter} className="text-gray-300 text-xs" />
        </div>
      ),
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: Blog) => (
        <CustomSwitch
          checked={status}
          onChange={(checked: boolean) => handleStatusChange(record.id, checked)}
          checkedChildren="Live"
          unCheckedChildren="Draft"
          size="default"
        />
      ),
    },
    {
      title: (
        <div className="flex items-center justify-between">
          <span>PUBLISHED AT</span>
          <FontAwesomeIcon icon={faSort} className="text-primary text-xs" />
        </div>
      ),
      dataIndex: "publishedAt",
      key: "publishedAt",
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
          { label: "Blog Management" },
          { label: "All Blogs" },
        ]}
        title="Blogs"
        subTitle="Create, edit and publish blog posts."
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
              Add Blog
            </CustomButton>
          </div>
        }
      />

      <DataTable
        data={blogs}
        columns={columns}
        isPaginate={true}
        showHeader={true}
        rowKey="id"
      />

      <BlogModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </div>
  );
};

export default BlogList;
