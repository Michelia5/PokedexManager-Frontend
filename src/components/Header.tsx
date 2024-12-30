import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle} from "./ui/navigation-menu";
import { Avatar, AvatarImage} from "./ui/avatar";
import {DropdownMenu,DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent} from "./ui/dropdown-menu";
import logo from "/images/other/sfondo.jpg";
import { useUserContext } from "../context/UserContext";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Torna alla home dopo il logout
  };

  return (
    <header className="bg-white shadow-md ">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12" />
          </Link>
        </div>

        {/* Navigation Menu */}
        <div
          className={`hidden md:block ${
            user ? "" : "ml-36"
          }`}
        >
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/pokemon">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Pokémon
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/collection">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Collezione
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Avatar con Dropdown Menu */}
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/profile">Profilo</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Accedi
                </Button>
              </Link>
              <Link to="/register">
                <Button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                  Registrati
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
