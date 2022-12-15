import React from "react";
import AddNewTask from "../Modal/AddNewTask/AddNewTask";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Drawer from "./Drawer/Drawer";
import {IconPencilPlus}from '@tabler/icons'
import {useSelector}from 'react-redux'

import {
  Button,
  Group,
  Title,
  Text,
  HoverCard,
  Stack, 
  Flex
} from "@mantine/core";

function NavBar() {
  const [modal, setModal] = useState(false);
  const [showAddTaskButton, setShowAddTaskButton] = useState(true);
  const username = useSelector((state) => state.username);

  // let { username.name } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    if (username.name !== "super-admin" && username.name !== "admin") {
      setShowAddTaskButton(false);
    }
  }, [username.name]);

  const showModel = () => {
    if (
      username.name.toLowerCase() === "admin" ||
      username.name.toLowerCase() === "super-admin"
    ) {
      setModal(!modal);
    } else {
      navigate("/unautorize");
    }
  };

  return (
    <>
      <Drawer />
      <Group
        position={showAddTaskButton ? "apart" : "center"}
        sx={{
          backgroundColor: "#2b2c37",
          color: "white",
        }}
      >
        <div>
          
          <Group mt={20} ml={40} mb={10} py ='xl'>
            <Title order={1} align="center">
              Task Management System
            </Title>
          </Group>
        </div>
        <Flex
          gap="lg"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
          m="lg"
        >
          {showAddTaskButton && (
            <HoverCard
              shadow="xl"
              radius={4}
              position="bottom-end"
              transition="scale-y"
            >
              <HoverCard.Target>
                <Button
                  radius="xl"
                  size="md"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                  onClick={showModel}
                  sx={{
                    display: "flex",
                    transition: "all ease-in-out 0.2s",
                  }}
                  className="border-0 rounded font-bold bg-gradient-to-l from-indigo-900 to-cyan-900 hover:bg-violet-600"
                >
                  <IconPencilPlus />
                  <span className="ml-2"> Add New Task</span>
                </Button>
              </HoverCard.Target>
              <HoverCard.Dropdown
                sx={{ backgroundColor: "#fa5252", border: 0 }}
              >
                <Group position="center">
                  <Stack spacing={5}>
                    <Title order={4} align="center">
                      Reminder!!!
                    </Title>
                    <Text>Only Admin and Super Admin Can Add A New Task</Text>
                  </Stack>
                </Group>
              </HoverCard.Dropdown>
            </HoverCard>
          )}
        </Flex>
        {modal && <AddNewTask modal={modal} setModal={setModal} />}
      </Group>
    </>
  );
}
export default NavBar;
