import { createBrowserRouter } from "react-router";
import MainLayout from "../mainLayout/MainLayout";
import Dashboard from "../Components/dashboard/Dashboard";
import EmployeeList from "../pages/employee/EmployeeList";
import NotFound from "../pages/error/NotFound";
import ErrorPage from "../pages/error/ErrorPage";
import RoleList from "../pages/users/RoleList";
import RolesPermissions from "../pages/users/RolesPermissions";
import DepartmentList from "../pages/users/DepartmentList";

import CategoryList from "../pages/category/CategoryList";
import SubscriptionList from "../pages/subscription/SubscriptionList";
import JobList from "../pages/job/JobList";
import ProductList from "../pages/product/ProductList";
import BrandList from "../pages/brand/BrandList";
import BlogList from "../pages/blog/BlogList";
import Login from "../pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "employee/all",
        element: <EmployeeList />,
      },
      {
        path: "categories/list",
        element: <CategoryList />,
      },
      {
        path: "products/list",
        element: <ProductList />,
      },
      {
        path: "products/add",
        element: <ProductList />,
      },
      {
        path: "brands/list",
        element: <BrandList />,
      },
      {
        path: "brands/add",
        element: <BrandList />,
      },
      {
        path: "blogs/list",
        element: <BlogList />,
      },
      {
        path: "blogs/add",
        element: <BlogList />,
      },
      {
        path: "users/roles",
        element: <RoleList />,
      },
      {
        path: "users/designations",
        element: <RolesPermissions />,
      },
      {
        path: "users/departments",
        element: <DepartmentList />,
      },
      {
        path: "subscription",
        element: <SubscriptionList />,
      },
      {
        path: "job/list",
        element: <JobList />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
