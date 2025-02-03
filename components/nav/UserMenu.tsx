"use client";

import React, { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser: SafeUser | null | any;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2
        border-[1px]
        border-slate-400
        flex
        flex-row
        items-center
        gap-1
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        text-slate-700"
        >
          <Avatar src={currentUser?.image} />
          <AiFillCaretDown />
        </div>

        {isOpen && (
          <div
            className="absolute
            rounded-md
            shadow-md
            w-[170px]
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            flex
            flex-col
            cursor-pointer"
          >
            {currentUser ? (
              <div className="">
                <button>
                  <MenuItem onClick={() => {
                      router.push("/orders")
                      toggleOpen();
                    }}
                    >Your Orders</MenuItem>
                </button>
                <button>
                  <MenuItem onClick={() => {
                      router.push("/admin")
                      toggleOpen();
                    }}
                    >Admin Dashboard</MenuItem>
                </button>
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Logout
                </MenuItem>
              </div>
            ) : (
              <div className="flex flex-col">
                <button>
                  <MenuItem
                    onClick={() => {
                      router.push("/login")
                      toggleOpen();
                    }}
                  >
                    Login
                  </MenuItem>
                </button>
                <button>
                  <MenuItem onClick={() => {
                    router.push("/register")
                      toggleOpen();
                    }}
                    >
                      Register</MenuItem>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
