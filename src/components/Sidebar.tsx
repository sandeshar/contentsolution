'use client'
import { useState } from "react";
import { IoMdExit } from "react-icons/io";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-black h-screen w-64 text-white">
            <div className="flex justify-end ">
                <IoMdExit size={30} className={`cursor-pointer right-4 ${isOpen ? "" : "rotate-180"} m-2`} onClick={() => { setIsOpen(!isOpen) }} />
            </div>
        </div>
    );
};

export default SideBar;