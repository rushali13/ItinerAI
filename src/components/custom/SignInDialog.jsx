import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "@/components/ui/button.jsx";

function SignInDialog({ openDialog, setOpenDialog }) {
  const login = useGoogleLogin({
    onSuccess: (res) => {
      getUserProfile(res);
    },
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    console.log(tokenInfo);
    axios
      .get("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div >
      <Dialog  open={openDialog}>
        <DialogContent>
          <DialogTitle hidden />
          <DialogHeader>
            <div className="flex items-center gap-1">
              <img src="/logo.png" width="70px" />
              <h3 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                ItinerAI
              </h3>
            </div>
  
            <DialogDescription>
              Sign in to the App with Google authentication securely
            </DialogDescription>
          </DialogHeader>
          <Button onClick={login}>Sign in using
              <FcGoogle className="mt-auto mb-auto w-10 h-7" /></Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import PropTypes from "prop-types";

SignInDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
};

export default SignInDialog;
