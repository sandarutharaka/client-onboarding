import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import logo from "../assets/logo.png";

const Header = () => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <header className="w-full  bg-gray-200 z-40 mb-5 border-b-2 border-gray-200">
      {/* Main Navigation */}
      <div className="w-full px-5 md:px-5 max-w-screen-xl mx-auto py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center pr-[120px] md:pr-[20px]">
          <span className="text-sm lg:text-lg font-extrabold italic text-primary ml-[-4px] mt-[-4px] lg:ml-[-8px] lg:mt-[-5px]">
            Besta.App
          </span>
        </div>
        <nav className="hidden font-semibold text-black md:flex gap-6 items-center">
          <a href="#">Home</a>
          <a href="#">Blog</a>
          <a href="#">Pages</a>
          <a href="#">Projects</a>
          <a href="#">Services</a>
        </nav>
        <div className=" gap-5 hidden md:flex">
          <Button className="text-[#171717] bg-transparent w-[100px] md:w-[90px] lg:w-[100px] h-[40px] md:h-[35px] lg:h-[40px] rounded-4xl font-semibold">
            Get A Quote
          </Button>
          <Button
            variant="outline"
            className="text-black w-[100px] md:w-[90px] lg:w-[100px] h-[40px] md:h-[35px] lg:h-[40px] rounded-4xl font-semibold border-1 bg-transparent "
          >
            Sign in
          </Button>
        </div>

        {/* Mobile Sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="md:hidden w-[30px] h-[30px] rounded-2xl  text-black  bg-transparent flex items-center justify-center "
              aria-label="Open Menu"
            >
              <Menu className="h-[20px] w-[20px] " />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="px-4">
            <SheetHeader className="flex flex-col items-start px-0">
              <SheetTitle className="text-2xl  font-bold text-primary text-start flex items-center  ">
                <span className="ml-[-15px] mt-[-5px]">Besta.App</span>
              </SheetTitle>
            </SheetHeader>
            <div className="flex items-center gap-3">
              <Input placeholder="Search..." />
            </div>
            <nav className="mt-6 flex flex-col gap-4">
              <a href="#">Home</a>
              <a href="#">Blog</a>
              <a href="#">Pages</a>
              <a href="#">Tracking</a>
              <a href="#">Services</a>
            </nav>
            <div className=""></div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
