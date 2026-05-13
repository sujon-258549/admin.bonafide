import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBangladeshiTakaSign } from "@fortawesome/free-solid-svg-icons";

interface TakaIconProps {
  className?: string;
}

const TakaIcon = ({ className = "" }: TakaIconProps) => (
  <FontAwesomeIcon
    icon={faBangladeshiTakaSign}
    className={className}
    aria-label="BDT"
  />
);

export default TakaIcon;
