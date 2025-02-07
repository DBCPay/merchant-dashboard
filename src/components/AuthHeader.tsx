import React from "react";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  styles?: string;
}
const AuthHeader = ({ title, subtitle, styles }: AuthHeaderProps) => {
  return (
    <div className={`text-center mb-5 ${styles ? styles : ""}`}>
      <h3 className="font-medium text-gray-600 text-2xl md:text-3xl">
        {title}
      </h3>
      {subtitle && <p className="text-xs md:text-sm mt-1">{subtitle}</p>}
    </div>
  );
};

export default AuthHeader;
