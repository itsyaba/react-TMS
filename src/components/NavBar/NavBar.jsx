import React from "react";
import AddNewTask from "../Modal/AddNewTask/AddNewTask";
import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

// import {useSelector , useDispatch} from 'react-redux'
// import {ThemeSwitched} from './NavBarSlice'

//MANTINE CORE

import { Button, Group, Title, Text, HoverCard, Stack } from "@mantine/core";

//MANTINE CORE

function NavBar() {
  // const themes  = useSelector(state => state.theme)
  // const dispatch = useDispatch()

  const [modal, setModal] = useState(false);
  // const [disabled, setDisabled] = useState(true);
  let { type } = useParams();
  const navigate = useNavigate();

  const showModel = () => {
    if (
      type.toLowerCase() === "admin" ||
      type.toLowerCase() === "super-admin"
    ) {
      setModal(!modal);
    } else {
      navigate("/unautorize");
    }
  };

  const logOutHandeler = () => {
    navigate("/");
  };

  return (
    <Group
      position="apart"
      sx={{
        backgroundColor: "#2b2c37",
        color: "white",
      }}
    >
      <div>
        <Title order={1} mt={20} ml={40} mb={10}>
          Task Management System
        </Title>
        <Text
          sx={{
            textAlign: "center",
            paddingTop: 10,
            fontStyle: "italic",
            textTransform: "uppercase",
          }}
        >
          {type}
        </Text>
        <Button
          variant="outline"
          onClick={logOutHandeler}
          sx={{ marginBlock: 10, marginInline: 50 }}
        >
          Log Out
        </Button>
      </div>
      <HoverCard
        shadow="xl"
        
        radius={4}
        position="bottom-end"
        transition={"scale-y"}
      >
        <HoverCard.Target>
          <Button
            radius="xl"
            size="md"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            onClick={showModel}
            sx={{
              border: 0,
              // padding: 25,
              marginRight: 25,
              borderRadius: 25,
              fontWeight: 800,
              display: "flex",
              transition: "all ease-in-out 0.2s",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-plus"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Task
          </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown sx={{ backgroundColor: "#fa5252", border: 0 }}>
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

      {modal && <AddNewTask modal={modal} setModal={setModal} />}
    </Group>
  );
}
export default NavBar;
