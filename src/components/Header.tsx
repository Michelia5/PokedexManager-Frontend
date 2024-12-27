import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from './ui/dropdown-menu';
import logo from '/images/other/sfondo.jpg';

const Header: React.FC = () => {
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
                <Link to="/CollectionPage">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Collezione
                      </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Avatar con Dropdown Menu */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>TF</AvatarFallback> {/* Iniziali se immagine non caricata */}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/logout">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
