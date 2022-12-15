import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { DoingRemoved, DoingAdded } from "../../TaskLists/DoingSlice";
import { DoneRemoved, DoneAdded } from "../../TaskLists/DoneSlice";
import { TasksRemoved, TodoAdded } from "../../TaskLists/TasksSlice";
import { ActivityAdded } from "../../../Pages/ActivityLog/ActivitySlice";
import {
  Button,
  Group,
  Text,
  Title,
  MantineProvider,
  Modal,
  useMantineTheme,
  Box,
  Flex,
  Tooltip,
  Avatar,
  Center,
} from "@mantine/core";

function Detail({ showPopUp, setShowPopUp, Uname }) {
  const detail = useSelector((state) => state.detail);
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  let { type, username } = useParams();

  if (!type) {
    type = username;
  } else if (!username) {
    username = type;
  }

  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Axios.get(`https://dummyjson.com/users`);
        const result = data.data.users;
        // const newValue = result.filter((u) => {
        //   return u.firstName.includes(detail.assignedTo);
        // });
        // for (const props of result) {
        //   // console.log(props )
        //   const newValue = result.find((element) => {
        //     return element.firstName.includes(detail.assignedTo);
        //   });
        //   setUserImage(newValue.image);
        //   console.log(newValue.image);
        // }

        // console.log();
      } catch (error) {
        console.error(error.message);
        // console.log(error.message);
        // if (error.message === "userDetail is undefined") {
        //   setFullName("super-admin");
        // }
      }
    };
    fetchData();
  }, [userImage]);

  console.log(userImage);

  const removeHandeler = (title) => {
    if (
      type.toLowerCase() === "admin" ||
      type.toLowerCase() === "super-admin" ||
      type.toLowerCase() === Uname.toLowerCase()
    ) {
      dispatch(DoneRemoved(title));
      dispatch(DoingRemoved(title));
      dispatch(TasksRemoved(title));
      dispatch(
        ActivityAdded({
          operationName: "Removed a task",
          completed: "Succeeded",
          time: `${new Date().toLocaleDateString()}`,
          eventIntiatedBy: `${type}`,
        })
      );
      setShowPopUp(false);
    } else {
      navigate("/unautorize");
    }
  };

  const moveToDoneHandeler = (taskDetail) => {
    dispatch(
      DoneAdded({
        task: taskDetail.title,
        id: taskDetail.id,
        description: taskDetail.description,
        assignedTo: taskDetail.assignedTo,
      })
    );
    dispatch(
      ActivityAdded({
        operationName: "Finished a task",
        completed: "Succeeded",
        time: `${new Date().toLocaleDateString()}`,
        eventIntiatedBy: `${type}`,
      })
    );
    dispatch(DoingRemoved(taskDetail.title));
    dispatch(TasksRemoved(taskDetail.title));
    setShowPopUp(!showPopUp);
  };

  const moveToDoingHandeler = (taskDetail) => {
    dispatch(
      DoingAdded({
        task: taskDetail.title,
        id: taskDetail.id,
        description: taskDetail.description,
        assignedTo: taskDetail.assignedTo,
      })
    );
    dispatch(
      ActivityAdded({
        operationName: "Starts a task",
        completed: "Succeeded",
        time: `${new Date().toLocaleDateString()}`,
        eventIntiatedBy: `${type}`,
      })
    );
    dispatch(DoneRemoved(taskDetail.title));
    dispatch(TasksRemoved(taskDetail.title));
    setShowPopUp(false);
  };

  const moveToTodoHandeler = (taskDetail) => {
    dispatch(
      TodoAdded({
        task: taskDetail.title,
        id: taskDetail.id,
        description: taskDetail.description,
        assignedTo: taskDetail.assignedTo,
      })
    );
    dispatch(
      ActivityAdded({
        operationName: "Resets a task",
        completed: "Succeeded",
        time: `${new Date().toLocaleDateString()}`,
        eventIntiatedBy: `${type}`,
      })
    );
    dispatch(DoneRemoved(taskDetail.title));
    dispatch(DoingRemoved(taskDetail.title));
    setShowPopUp(false);
  };

  return (
    <>
      <MantineProvider
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.85}
        overlayBlur={0.1}
        theme={{
          colorScheme: "dark",
        }}
      >
        <Modal
          closeOnEscape
          opened={showPopUp}
          onClose={() => setShowPopUp(false)}
          title="Task Detail"
          size="xl"
          centered
          transition={"skew-down"}
          transitionDuration={900}
          transitionTimingFunction="ease"
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.gray[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.15}
          overlayBlur={9}
        >
          <Box>
            <Flex
              gap="md"
              justify="center"
              align="center"
              direction="column"
              wrap="nowrap"
            >
              <div>
                <Title order={2}>{detail.title}</Title>
              </div>
              <div>
                <Text>{detail.description}</Text>
              </div>
              <div>
                <Text> Task Assigned To </Text>
                <Center>
                  <Tooltip.Group openDelay={300} closeDelay={100}>
                    <Avatar.Group spacing="xs">
                      {detail.assignedTo.map((name) => (
                        <Tooltip label={name} withArrow key={name}>
                          <Avatar src={userImage} radius="xl" size="lg" />
                        </Tooltip>
                      ))}
                    </Avatar.Group>
                  </Tooltip.Group>
                </Center>
              </div>
            </Flex>
            <Text
              sx={{
                marginTop: "20px",
              }}
            >
              Change Status To
            </Text>
            <Button.Group
              sx={{
                marginTop: "10px",
              }}
            >
              <Button
                variant="light"
                className="bg-cyan-900"
                fullWidth
                onClick={() => moveToTodoHandeler(detail)}
              >
                Todo
              </Button>
              <Button
                variant="light"
                className="bg-cyan-900"
                fullWidth
                onClick={() => moveToDoingHandeler(detail)}
              >
                Doing
              </Button>
              <Button
                variant="light"
                className="bg-cyan-900"
                fullWidth
                onClick={() => moveToDoneHandeler(detail)}
              >
                Done
              </Button>
            </Button.Group>
            <Text></Text>
            <Group mt="xl" size="xl" color="red">
              <Button
                fullWidth
                mt={24}
                radius={"xl"}
                className="bg-red-700 hover:bg-red-900"
                fw={800}
                onClick={() => removeHandeler(detail.title)}
              >
                Remove Task
              </Button>
            </Group>
          </Box>
        </Modal>
      </MantineProvider>
    </>
  );
}

export default Detail;
