import { useState, useEffect } from "react";
import { Upload, message } from "antd";
import type { UploadProps, RcFile } from "antd/es/upload";
import { ImagePlus, Trash2, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value?: string;
  onChange?: (dataUrl: string | undefined) => void;
  /** Max file size in MB. Default 5. */
  maxSizeMB?: number;
  /** Wrapper className */
  className?: string;
  /** Aspect ratio: "square" (default) or "wide" (16/9) */
  ratio?: "square" | "wide";
}

const fileToDataUrl = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const ImageUploader = ({
  value,
  onChange,
  maxSizeMB = 5,
  className = "",
  ratio = "square",
}: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | undefined>(value);
  const [loading, setLoading] = useState(false);

  // Stay in sync with form-controlled value.
  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleBeforeUpload: UploadProps["beforeUpload"] = async (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files are allowed");
      return Upload.LIST_IGNORE;
    }
    const isWithinLimit = file.size / 1024 / 1024 < maxSizeMB;
    if (!isWithinLimit) {
      message.error(`Image must be smaller than ${maxSizeMB} MB`);
      return Upload.LIST_IGNORE;
    }

    setLoading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      setPreview(dataUrl);
      onChange?.(dataUrl);
    } catch {
      message.error("Failed to read image");
    } finally {
      setLoading(false);
    }
    // Prevent antd from performing its own request.
    return false;
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(undefined);
    onChange?.(undefined);
  };

  const aspectClass = ratio === "wide" ? "aspect-video" : "aspect-square";

  return (
    <Upload
      accept="image/*"
      multiple={false}
      showUploadList={false}
      beforeUpload={handleBeforeUpload}
      className={`block ${className}`}
    >
      <div
        className={`${aspectClass} w-full max-w-[220px] rounded-xl border-2 border-dashed border-gray-200 hover:border-primary/60 hover:bg-primary/5 transition-colors cursor-pointer flex items-center justify-center relative overflow-hidden group bg-gray-50`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="upload preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <span className="text-white text-xs font-semibold px-3 py-1.5 rounded-md bg-white/10 backdrop-blur">
                Replace
              </span>
              <button
                type="button"
                onClick={handleRemove}
                className="text-white text-xs font-semibold px-3 py-1.5 rounded-md bg-rose-500/90 hover:bg-rose-600 flex items-center gap-1"
              >
                <Trash2 size={12} />
                Remove
              </button>
            </div>
          </>
        ) : loading ? (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-xs font-semibold">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400 px-4 text-center">
            <ImagePlus className="w-7 h-7" />
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Click to upload
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                PNG, JPG, WEBP up to {maxSizeMB}MB
              </p>
            </div>
          </div>
        )}
      </div>
    </Upload>
  );
};

export default ImageUploader;
