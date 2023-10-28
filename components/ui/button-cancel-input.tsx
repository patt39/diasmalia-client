import { ColorType } from "@/types/profile.type";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface SizeInterface {
  [key: string]: string;
}

const sizeType: SizeInterface = {
  huge: "5",
  large: "4",
  normal: "3.5",
  medium: "2.5",
  small: "0.2",
};

interface Props {
  ref?: (node?: Element | null) => void;
  size?: "large" | "medium" | "normal" | "small" | "huge";
  loading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  shape?: "round" | "default";
  minW?: "fit" | "full";
  onClick?: () => void;
}

const ButtonCancelInput: React.FC<Props> = ({
  ref,
  size,
  loading,
  icon,
  children,
  onClick,
  minW,
  disabled,
}) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 15, color: "blue" }} spin />
  );
  return (
    <>
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={loading || disabled ? true : false}
        className={`
        inline-flex
        items-center
        justify-center
        min-w-${minW ?? "fit"}
        w-full
        px-4
        py-${sizeType[String(size ?? "normal")]} 
        text-sm 
        font-semibold 
        leading-3 
        dark:text-gray-600 
        transition-all 
        duration-200 
        bg-white 
        border 
        border-gray-300 
        rounded-md 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2 
        focus:ring-gray-200 
        hover:bg-gray-200
        `}
      >
        {icon ? <span className="mr-1">{icon}</span> : null}
        {children}
      </button>
    </>
  );
};

export { ButtonCancelInput };
