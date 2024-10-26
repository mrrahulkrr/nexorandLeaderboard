
// src/components/UserDropdown.jsx
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
  import { Button } from '@/components/ui/button';
  import { User } from 'lucide-react';
  import { useAuth } from '@/context/AuthContext';
  
  export function UserDropdown() {
    const { user, logout } = useAuth();
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium">{user.data.firstName}</p>
            <p className="text-xs text-muted-foreground">{user.data.email}</p>
            <p className="text-xs">Points: {user.data.Points}</p>
          </div>
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }