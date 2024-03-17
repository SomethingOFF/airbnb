"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import React, { useCallback, useState } from "react";
import Menuitem from "./Menuitem";
import useRegisterModel from "@/app/hooks/useRegisterModel";
import useLoginModel from "@/app/hooks/useLoginModel";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useRentModel from "@/app/hooks/useRentModel";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user?: User | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();
  const rentModel = useRentModel();
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, [open]);
  const router = useRouter();
  const onRent = useCallback(() => {
    if (!user) {
      console.log("user not logged in");
      return loginModel.onOpen();
    }
    rentModel.onOpen();
  }, [user, loginModel, rentModel]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className=" hidden md:block text-sm  font-semibold  py-3  px-4  rounded-full hover:bg-neutral-100  transition  cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className=" p-4 md:py-1 md:px-2 border-[1px]  border-neutral-200  flex  flex-row  items-center  gap-3  rounded-full  cursor-pointer  hover:shadow-md  transition "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={null} />
          </div>
        </div>
      </div>
      {open && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4  bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <Menuitem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <Menuitem
                  onClick={() => router.push("/favorites")}
                  label="My Favorites"
                />
                <Menuitem
                  onClick={() => router.push("/reservations")}
                  label="My Reservations"
                />
                <Menuitem
                  onClick={() => router.push("/properties")}
                  label="My Properties"
                />
                <Menuitem onClick={rentModel.onOpen} label="AirBnb My home" />
                <Menuitem onClick={() => signOut()} label="logout" />
              </>
            ) : (
              <>
                <Menuitem onClick={loginModel.onOpen} label="login" />
                <Menuitem onClick={registerModel.onOpen} label="signup" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
