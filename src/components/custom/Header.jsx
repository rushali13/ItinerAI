import { googleLogout } from "@react-oauth/google";
import { Button } from "../ui/button.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SignInDialog from "@/components/custom/SignInDialog.jsx";
import { useState } from "react";

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("USER ", user);
  return (
    <div className=" shadow-sm flex justify-between items-center px-5">
      <div className="flex items-center gap-1">
        <img src="/logo.png" width="70px" />
        <h3 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
          ItinerAI
        </h3>
      </div>

      <div>
        
        {user ? (
          <div className="flex gap-3 items-center">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">
                Generate 
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  className="w-10 h-10 lg:w-14 lg:h-14 rounded-full object-cover cursor-pointer"
                  src={user?.picture || "/default-avatar.png"}
                />
              </PopoverTrigger>
              <PopoverContent className="w-30 mr-3">
                <a
                  href="/"
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </a>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Sign In
          </Button>
        )}
        <SignInDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      </div>
    </div>
  );
}

export default Header;
