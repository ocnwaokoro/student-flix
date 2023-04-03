import React from "react";
interface MobileMenuItemProps {
  label: string;
  link: string;
}
const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ label, link }) => {
  return (
    <div className="px-3 text-center text-white hover:underline">{label}</div>
  );
};

export default MobileMenuItem;
