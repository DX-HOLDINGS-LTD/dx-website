import React from "react";

export interface DxLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: "icon" | "app";
  className?: string;
}

/**
 * DX Official Brand Logo Component
 * Grounded in the official DX visual identity (Green digital wallet with white DX monogram cutout)
 */
export function DxLogo({
  variant = "app",
  className = "size-10 object-contain",
  alt = "DX Logo",
  ...props
}: DxLogoProps) {
  const src = variant === "icon" ? "/dx-logo-icon.svg" : "/dx-logo.png";

  return (
    <img src={src} alt={alt} className={className} loading="eager" decoding="async" {...props} />
  );
}
