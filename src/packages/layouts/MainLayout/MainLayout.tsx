import React from "react";
import Header from "../../components/Header/Header";

type MainLayoutProps = {
  children: React.ReactNode;
  className?: string; // Class name cho layout main
  styleMain?: string; // Màu nền của layout main
};

export default function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={`bg-[#fff] w-full`}>
      <Header />
      <div className={`w-[calc(100%_-_200px*2)] m-auto pt-[55px] ${className}`}>
        {children}
      </div>
    </div>
  );
}
