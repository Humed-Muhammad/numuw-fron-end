"use client";
import React from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  LayoutDashboard,
  ShoppingBagIcon,
  Users,
  Plus,
  Tag,
  Percent,
  Settings,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const Sidebar = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  return (
    <Card className="h-full rounded-none px-4 py-5">
      <div className="flex flex-col ml-3">
        <Avatar className="mb-3">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Label className="font-medium text-gray-600">Store</Label>
        <Label className="font-medium text-lg">MumzLand</Label>
      </div>
      <div className="flex flex-col mt-10 space-y-3">
        <Button
          onClick={() => push("/root/dashboard")}
          variant={`${
            pathname.includes("/root/dashboard") ? "secondary" : "ghost"
          }`}
          className={`text-gray-600 justify-start`}
        >
          <LayoutDashboard size={20} className="mr-3" />
          Dashboard
        </Button>
        <Button
          onClick={() => push("/root/products/list")}
          variant={`${
            pathname.includes("/root/products") ? "secondary" : "ghost"
          }`}
          className="text-gray-600 justify-start "
        >
          <Tag size={20} className="mr-3" />
          Products
        </Button>
        <Button
          variant={`${
            pathname.includes("/root/orders") ? "secondary" : "ghost"
          }`}
          className="text-gray-600 justify-start "
          onClick={() => push("/root/orders/list")}
        >
          <ShoppingBagIcon size={20} className="mr-3" />
          Orders
        </Button>
        <Button variant="ghost" className="text-gray-600 justify-start ">
          <Users size={20} className="mr-3" />
          Customers
        </Button>
        <Button variant="ghost" className="text-gray-600 justify-start ">
          <Plus size={20} className="mr-3" />
          Product Categories
        </Button>
        <Button variant="ghost" className="text-gray-600 justify-start ">
          <Percent size={20} className="mr-3" />
          Discount
        </Button>
        <Button variant="ghost" className="text-gray-600 justify-start ">
          <Settings size={20} className="mr-3" />
          Settings
        </Button>
      </div>
    </Card>
  );
};
