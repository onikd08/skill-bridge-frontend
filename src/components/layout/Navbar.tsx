"use client";

import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/actions/auth/auth.action";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  imageUrl: string;
}

interface Navbar1Props {
  user: IUser | null;
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  user,
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Skill-Bridge",
  },
  menu,
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const router = useRouter();

  const roleUpper = String(user?.role ?? "").toUpperCase();

  const effectiveMenu: MenuItem[] =
    menu && menu.length
      ? menu
      : [
          { title: "Home", url: "/" },
          { title: "Find Tutors", url: "/tutors" },
          { title: "About", url: "/about" },
          // {
          //   title: "Privacy Policy",
          //   url: "/privacy",
          // },
          // {
          //   title: "T&C",
          //   url: "/terms",
          // },
          {
            title: "Contact Us",
            url: "/contact",
          },
        ];

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <header
      className={cn(
        "py-3 sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md shadow-sm transition-all duration-300",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
                width={20}
                height={20}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {effectiveMenu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <ThemeModeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-full ring-2 ring-primary/20 transition-all hover:ring-primary/40 focus:ring-primary/60 focus:outline-none">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage src={user?.imageUrl} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name[0].toUpperCase()}
                      {user.name[1].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm leading-none font-medium">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={
                        roleUpper === "ADMIN"
                          ? "/admin"
                          : roleUpper === "TUTOR"
                            ? "/tutor/dashboard"
                            : "/dashboard"
                      }
                      className="w-full cursor-pointer"
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {roleUpper === "TUTOR" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/tutor" className="w-full cursor-pointer">
                          My Info
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/tutor/profile"
                          className="w-full cursor-pointer"
                        >
                          Profile
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {roleUpper === "STUDENT" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/profile"
                          className="w-full cursor-pointer"
                        >
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/bookings"
                          className="w-full cursor-pointer"
                        >
                          Bookings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {roleUpper === "ADMIN" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin/users"
                          className="w-full cursor-pointer"
                        >
                          Manage Users
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin/bookings"
                          className="w-full cursor-pointer"
                        >
                          All Bookings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin/categories"
                          className="w-full cursor-pointer"
                        >
                          Manage Categories
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="w-full cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-500"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
                height={20}
                width={20}
              />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <Image
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                        height={20}
                        width={20}
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {effectiveMenu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {!user ? (
                      <>
                        <Button asChild variant="outline" size="sm">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href={auth.signup.url}>
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center gap-5">
                        <Button asChild variant="outline" size="sm">
                          <Link
                            href={
                              roleUpper === "ADMIN"
                                ? "/admin"
                                : roleUpper === "TUTOR"
                                  ? "/tutor"
                                  : "/dashboard"
                            }
                          >
                            My Dashboard
                          </Link>
                        </Button>
                        <Button onClick={() => handleLogout()} size="sm">
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className="group inline-flex h-9 w-max items-center justify-center rounded-full bg-transparent px-4 py-2 text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary data-active:bg-primary/10 data-active:text-primary"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

export { Navbar };
