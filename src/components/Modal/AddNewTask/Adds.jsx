import React, { useState } from "react";
import { IconUsers, IconActivity, IconChecklist } from "@tabler/icons";
import { Avatar, Box, Flex } from "@mantine/core";
import { Link } from "react-router-dom";
const Drawer = () => {
  const menus = [
    { name: "Tasks", link: "/", icon: IconChecklist },
    { name: "Users", link: "/", icon: IconUsers },
    { name: "Activity Log", link: "/", icon: IconActivity },
  ];
  const [open, setOpen] = useState(true);
  return (
    <>
      <section>
        <div
          className={`bg-[#0e0e0e]  fixed top-0 left-0 bottom-0  duration-500 text-gray-100 text-lg ${
            open ? "w-72" : "w-16"
          }`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div>
            <h2 className="p-2">{open ? "Task  Management  System" : "TMS"}</h2>{" "}
            <hr />
              <Flex
                gap="md"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
                my="xs"
              >
                <Avatar
                  src="avatar.png"
                  alt="it's me"
                  radius="xl"
                  size="lg"
                  variant="filled"
                />{" "}
                {open && "Yeabsira"}
              </Flex>
            <hr />
          </div>
          <div className="mt-4 flex flex-col gap-4 ">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={`group flex items-center text-lg  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ${
                  menu?.margin && "mt-5"
                } `}
              >
                <div>{React.createElement(menu?.icon, { size: "35" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`  absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit ${
                    open && "hidden"
                  } `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Drawer;
