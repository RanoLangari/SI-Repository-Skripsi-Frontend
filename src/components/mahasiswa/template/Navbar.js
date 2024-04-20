import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  HomeModernIcon,
  CodeBracketSquareIcon,
  ChevronDownIcon,
  PowerIcon,
  Bars2Icon,
  UserIcon
} from "@heroicons/react/24/solid";
import { useAnimate } from "framer-motion";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const Navigate = useNavigate();
  const closeMenu = () => setIsMenuOpen(false);
  
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      clicked: () => {
        closeMenu();
      Navigate('/mhs/profile')
      }
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      clicked: () => {
        closeMenu();
        localStorage.removeItem("token");
        Swal.fire({
          title: "Berhasil Log Out",
          icon: "success",
          timer: 800,
          timerProgressBar: true,
        }).then(() => {
          Navigate("/login-mhs");
        });
      }
    },
  ];
 

 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <UserCircleIcon className="h-12 w-12" />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, clicked }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={clicked}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 

function NavList({ status_kelulusan }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const Navigate = useNavigate();
  const closeMenu = () => setIsMenuOpen(false);
  // nav list component
  const navListItems = [
    {
      label: "Beranda",
      href: '/mhs/dashboard',
      icon: HomeModernIcon,
    },
  ];

  if (status_kelulusan === "Lulus") {
    navListItems.splice(1, 0, {
      label: "Unggah Skripsi",
      icon: CodeBracketSquareIcon,
      href:'/mhs/upload-skripsi'
    });
  }
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, href }, key) => (
        <Typography
          key={label}
          as="a"
          href={href}
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
 
export function NavbarMahasiswaTemplate({ status_kelulusan }) {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Sistem Informasi Repository Skripsi
        </Typography>
        <div className="ml-32 hidden lg:block">
          <NavList status_kelulusan={status_kelulusan}  />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}

export default NavbarMahasiswaTemplate;