import React from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  subTitle?: string;
  breadcrumb?: BreadcrumbItem[];
  extra?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subTitle,
  breadcrumb,
  extra,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
      <div className="min-w-0">
        {breadcrumb && (
          <nav className="flex items-center flex-wrap gap-2 text-[12px] font-medium text-gray-500 mb-1">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {index < breadcrumb.length - 1 && (
                  <ChevronRight size={10} className="text-gray-300" />
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
          {title}
        </h2>
        {subTitle && (
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subTitle}</p>
        )}
      </div>
      {extra && (
        <div className="flex items-center flex-wrap gap-2 sm:gap-3 sm:pt-1">
          {extra}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
