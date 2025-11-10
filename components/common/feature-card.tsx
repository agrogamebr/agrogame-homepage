import React from "react";
import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
  backgroundColor?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: string;
  layout?: 'vertical' | 'horizontal';
}

export default function FeatureCard({
  title,
  description,
  icon,
  backgroundColor = "bg-white",
  className = "",
  children,
  onClick,
  iconSize = 'md',
  padding = "p-6",
  layout = 'vertical',
}: FeatureCardProps) {
  const iconSizeMap = {
    sm: { width: 32, height: 32, className: "w-8 h-8" },
    md: { width: 48, height: 48, className: "w-12 h-12" },
    lg: { width: 76, height: 76, className: "w-[76px] h-[76px]" },
    xl: { width: 148, height: 148, className: "w-20 h-20 sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[148px] lg:h-[148px]" },
  };

  const iconConfig = iconSizeMap[iconSize];

  return (
    <div
      className={`
        ${padding} rounded-3xl shadow-sm hover:shadow-md transition-all duration-200
        ${layout === 'horizontal' ? 'flex flex-row items-center gap-4' : 'flex flex-col'}
        ${backgroundColor}
        ${onClick ? "cursor-pointer hover:scale-105" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {icon && (
        <div className={layout === 'horizontal' ? "shrink-0 flex items-center justify-center" : "mb-4 sm:mb-6 shrink-0"}>
          <Image
            src={icon}
            alt={title}
            width={iconConfig.width}
            height={iconConfig.height}
            className={iconConfig.className}
          />
        </div>
      )}
      
      <div className="flex flex-col flex-1">
        <h3 className={`font-semibold text-blue-950 shrink-0 ${layout === 'horizontal' ? 'text-base sm:text-lg mb-2' : 'text-lg sm:text-xl mb-3 sm:mb-4'}`}>
          {title}
        </h3>
        
        <p className={`text-blue-950 leading-relaxed flex-1 ${layout === 'horizontal' ? 'text-xs sm:text-sm mb-2' : 'text-xs sm:text-sm mb-4 sm:mb-6'}`}>
          {description}
        </p>
        
        {children && (
          <div className="mt-auto">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}