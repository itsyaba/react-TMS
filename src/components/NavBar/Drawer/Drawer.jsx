import React, { useState, useEffect } from "react";
import {
  IconUsers,
  IconActivity,
  IconChecklist,
  IconLogin,
  IconEye,
  IconEyeOff,
} from "@tabler/icons";
import {
  Avatar,
  Flex,
  Text,
  LoadingOverlay,
  Loader,
  Center,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";

const Drawer = ({ name }) => {
  const [menus, setMenus] = useState([]);
  const username = useSelector((state) => state.username);
  const [userDetail, setUserDetail] = useState({});
  const [fullName, setFullName] = useState("LOADING");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Axios.get(`https://dummyjson.com/users`);
        const result = data.data.users;
        const newResult = result.find((u) => u.firstName === username.name);
        setUserDetail(newResult);
        if (userDetail.firstName === username.name) {
          setFullName(`${userDetail.firstName}  ${userDetail.lastName}`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        if (error.message === "userDetail is undefined") {
          setFullName("super-admin");
        }
      }
    };
    fetchData();
  }, [userDetail, fullName, username.name]);

  useEffect(() => {
    if (username.name === "super-admin" || fullName === "super-admin") {
      setMenus([
        { name: "Tasks", link: `/tasks`, icon: IconChecklist },
        { name: "Users", link: "/users", icon: IconUsers },
        { name: "Activity Log", link: "/activity", icon: IconActivity },
        { name: "Log Out", link: "/", icon: IconLogin },
      ]);
    } else {
      setMenus([
        { name: "Tasks", link: `/tasks`, icon: IconChecklist },
        { name: "Log Out", link: "/", icon: IconLogin },
      ]);
    }
  }, [username.name, fullName]);

  return (
    <>
      <div
        className="bg-indigo-400 fixed bottom-12 left-16 w-16 h-12  cursor-pointer p-2 rounded-r-full transition-all duration-200  z-10 active:w-20"
        onClick={() => setOpen(!open)}
      >
        <IconEye className="w-full h-full" />
      </div>
      {open && (
        <div
          className=" bg-black  opacity-30  fixed top-0 left-0 bottom-0 right-0  w-screen h-screen z-30 "
          onClick={() => setOpen(!open)}
        ></div>
      )}

      <section
        className={`bg-[#0e0e0e]  fixed top-0 left-0 bottom-0 z-50  duration-500   text-gray-100 text-lg ${
          open ? "w-72" : "w-16"
        }`}
      >
        {open && (
          <div
            className="fixed bottom-12 left-12 flex justify-between bg-cyan-800 py-3 px-4 rounded-md cursor-pointer hover:bg-cyan-500 "
            onClick={() => setOpen(!open)}
          >
            <IconEyeOff /> <Text ml={"sm"}>Hide Sidebar</Text>
          </div>
        )}

        <div>
          <div>
            <h2 className="p-2 min-w-full font-bold">
              {open ? "Task Management System" : "TMS"}
            </h2>{" "}
            <hr />
            <div>
              {/* <LoadingOverlay visible={isLoading} overlayBlur={4}> */}
              {isLoading ? (
                <Center className="py-4">
                  <Loader variant="oval" />
                </Center>
              ) : (
                <Flex
                  align="center"
                  direction="row"
                  wrap="wrap"
                  my="xs"
                  gap={{ base: "sm", sm: "lg" }}
                  justify={{ sm: "flex-start" }}
                  className="cursor-pointer"
                >
                  <Avatar
                    src={userDetail?.image}
                    alt={username.name}
                    radius="xl"
                    size="lg"
                    variant="filled"
                    className="bg-slate-600"
                  />{" "}
                  {open && `${fullName}`}
                </Flex>
              )}

              {/* </LoadingOverlay> */}
            </div>
            <hr />
          </div>
          <div className="mt-4 flex flex-col gap-4 ">
            {menus?.map((menu, i) => (
              <Link
                to={menu.link}
                key={i}
                className={`group flex items-center text-lg  gap-3.5 font-medium p-2 m-1 hover:bg-gray-800 rounded-md active:bg-gray-900 ${
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
