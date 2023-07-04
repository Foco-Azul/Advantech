"use client";

import * as React from "react";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";
import Login from "../Login/Login";
import Brand from "./Brand.svg"
import "./NavMenu.css"

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components = [
  {
    title: "Guía de uso",
    href: "/docs/primitives/alert-dialog",
  },
  {
    title: "Documentación",
    href: "/docs/primitives/hover-card",
  },
  {
    title: "Casos de éxito",
    href: "/docs/primitives/progress",
  },
  {
    title: "Comparación con otras herramientas",
    href: "/docs/primitives/scroll-area",
  },
  {
    title: "Uso por industria",
    href: "/docs/primitives/tabs",
  },
];

const others = [
  {
    title: "Contacto",
    href: "/docs/primitives/alert-dialog",
  },
  {
    title: "Agenda un demo",
    href: "/docs/primitives/hover-card",
  },
  {
    title: "Monitor uptime",
    href: "/docs/primitives/progress",
  },
  {
    title: "Sobre nosotros",
    href: "/docs/primitives/scroll-area",
  },
  {
    title: "Únete al equipo",
    href: "/docs/primitives/tabs",
  },
];

function NavMenu() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <NavigationMenu>
      <div className="nav-image">
        <Image src={Brand} alt="Company Logo" width={100} height={30}/>
      </div>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Inicio
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white shadow-lg">
            <ul className="grid gap-3 p-1 min-w-[200px] md:max-w-[400px] lg:max-w-[500px] lg:grid-cols-1">
              {/* Product items */}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white shadow-lg">
            <ul className="grid w-[200px] gap-3 p-1 md:w-[200px]  lg:w-[300px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                ></ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Institucional</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white shadow-lg">
            <ul className="grid w-[100px] gap-3 p-1 md:w-[100px]  lg:w-[200px] ">
              {others.map((other) => (
                <ListItem
                  key={other.title}
                  title={other.title}
                  href={other.href}
                ></ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Login />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavMenu;
