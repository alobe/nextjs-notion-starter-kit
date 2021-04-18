import React, { HTMLAttributes } from 'react';
import s from './index.module.css'

export type Button3DProps = HTMLAttributes<HTMLButtonElement> & {
  color?: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
}

export function Button3D({
  className,
  color = "#3366FF",
  bgColor = "#1939B7",
  borderColor = "gray",
  textColor = "#ffffff",
  ...props
}: Button3DProps) {
  return (
    <div
      className={s['btn-3d-wrapper']}
      style={
        {
          "--button-color": color,
          "--button-background": bgColor,
          "--button-border": borderColor,
          "--button-text-color": textColor
        } as any
      }
    >
      <button className={`${s['btn-3d']} ${className}`} {...props} />
    </div>
  );
}
