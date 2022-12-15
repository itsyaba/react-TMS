import React, { useState, useEffect } from "react";
import Axios from "axios";
import Drawer from "../NavBar/Drawer/Drawer";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { detailAdded } from "../TaskLists/DetailSlice";
import { DoingRemoved, DoingAdded } from "../TaskLists/DoingSlice";
import { DoneRemoved, DoneAdded } from "../TaskLists/DoneSlice";
import { TasksRemoved, TodoAdded } from "../TaskLists/TasksSlice";

import {
  Space,
  Image,
  Title,
  Text,
  Group,
  Flex,
  Header,
  createStyles,
  Stack,
  Center,
  Box,
  Container,
  List,
  Tooltip,
  ThemeIcon,
  LoadingOverlay,
  Notification,
  Overlay,
} from "@mantine/core";

import Detail from "../Modal/TaskDetail/Detail";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsRight,
  IconChevronsLeft,
  IconX,
} from "@tabler/icons";

function UserDetail() {
  const [userDetail, setUserDetail] = useState({});
  const [showPopUp, setShowPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [visible, setVisible] = useState(true);
  const { username } = useParams();
  const tasks = useSelector((state) => state.task);
  const doings = useSelector((state) => state.doing);
  const dones = useSelector((state) => state.done);
  const [filteredTask, setFilteredTask] = useState([]);
  const [filteredDoings, setFilteredDoings] = useState([]);
  const [filteredDones, setFilteredDones] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Axios.get(`https://dummyjson.com/users`);
        const result = data.data.users;
        setUserDetail(result.find((u) => u.firstName === username));
        console.log(userDetail);

        setFilteredDoings(
          doings.filter((u) => {
            return u.assignedTo.includes(userDetail.firstName);
          })
        );
        setFilteredTask(
          tasks.filter((u) => {
            return u.assignedTo.includes(userDetail.firstName);
          })
        );
        setFilteredDones(
          dones.filter((u) => {
            return u.assignedTo.includes(userDetail.firstName);
          })
        );
        setIsLoading(false);

        console.log(userDetail);
      } catch (error) {
        console.error(error.message);
        setShowNotification(true);
      }
    };
    fetchData();
  }, [userDetail]);

  const useStyle = createStyles((theme) => ({
    header: { color: "white" },
    detailContainer: {
      paddingBottom: "60px",
    },
    taskName: {
      height: "100%",
      width: "80%",
      textAlign: "left",
      padding: "23px 15px 16px",
    },
    iconContainer: {
      paddingRight: "10px",
      // width: "35%",
    },
    type: {
      textTransform: "uppercase",
      letterSpacing: "6px",
      fontWeight: "300",
      paddingBottom: "30px",
      fontSize: "25px",
      color: "red ",
    },
    mainChild: {
      // backgroundColor: " #20212c",
      color: "white",
      width: "100%",
      height: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    status: {
      backgroundColor: "rgb(73, 196, 229)",
      color: "rgb(73, 196, 229)",
      borderRadius: "50%",
      marginRight: "10px",
      userSelect: "none",
    },
    child: {
      padding: "40px 0",
      margin: "0 10px 20px 30px",
    },
  }));

  const { classes } = useStyle();

  const detailHandeler = (item, allTask) => {
    const newValue = allTask.filter((element) => element.task === item);
    dispatch(
      detailAdded({
        id: newValue[0].id,
        task: newValue[0].task,
        description: newValue[0].description,
        status: newValue[0].status,
        assignedTo: newValue[0].assignedTo,
      })
    );
    setShowPopUp(!showPopUp);
  };

  const moveToDoneHandeler = (taskLists, task) => {
    const newValue = taskLists.filter((element) => element.task === task);
    dispatch(
      DoneAdded({
        task: newValue[0].task,
        id: newValue[0].id,
        description: newValue[0].description,
        status: newValue[0].status,
        assignedTo: newValue[0].assignedTo,
      })
    );
    dispatch(DoingRemoved(task));
    dispatch(TasksRemoved(task));
  };

  const moveToDoingHandeler = (taskLists, task) => {
    const newValue = taskLists.filter((element) => element.task === task);
    // console.log(newValue[0].state)
    dispatch(
      DoingAdded({
        task: newValue[0].task,
        id: newValue[0].id,
        description: newValue[0].description,
        status: newValue[0].status,
        assignedTo: newValue[0].assignedTo,
      })
    );

    dispatch(DoneRemoved(newValue[0].task));
    dispatch(TasksRemoved(newValue[0].task));
  };

  const moveToTodoHandeler = (taskLists, task) => {
    const newValue = taskLists.filter((element) => element.task === task);
    dispatch(
      TodoAdded({
        task: newValue[0].task,
        id: newValue[0].id,
        description: newValue[0].description,
        assignedTo: newValue[0].assignedTo,
      })
    );

    dispatch(DoneRemoved(task));
    dispatch(DoingRemoved(task));
  };

  return (
    <div className=" bg-[#20212c]">
      <Drawer />
      {showNotification && (
        <Notification
          icon={<IconX size={18} onClick={setShowNotification(false)} />}
          color="red"
        >
          Loading Failed! Try Reloaging Page
        </Notification>
      )}

      <header style={{ position: "relative" }}>
        <LoadingOverlay visible={isLoading} overlayBlur={9} />
        <Center className={classes.header}>
          <Group>
            <Image
              width={250}
              height={250}
              radius={"50%"}
              src={userDetail.image}
              withPlaceholder
              className='bg-list-dim-blue rounded-full'
            />
            <div className={classes.detailContainer}>
              <Flex>
                <Group className={classes.groupOne}>
                  <Stack
                    align="flex-start"
                    justify="flex-start"
                    mt={"90px"}
                    ml={"90px"}
                  >
                    <Title>
                      {userDetail.firstName} {userDetail.lastName}
                    </Title>
                    <Text> @{userDetail.username}</Text>
                    <Text>Birth Date {userDetail.birthDate}</Text>
                  </Stack>
                </Group>
                <Stack
                  align="flex-start"
                  justify="flex-start"
                  mt={"90px"}
                  ml={"90px"}
                >
                  <Text>email - {userDetail.email}</Text>
                  <Text>Phone - {userDetail.phone}</Text>
                  <Text>
                    Gender - {userDetail.gender}({userDetail.age} years old)
                  </Text>
                </Stack>
              </Flex>
            </div>
          </Group>
        </Center>
      </header>
      <hr />
      <main className="ml-12">
        <Title m={"xl"} tt={"uppercase"} order={1} ta={"center"}>
          {` Task Assigned To ${userDetail.firstName}`}
        </Title>
        <Space h={"10px"} />
        <Box className="grid gap-4 grid-cols-3 grid-rows-3 w-full " size={"xl"}>
          <Container className={classes.child}>
            <Text className="uppercase font-light text-xl  pb-6">
              <span className={classes.status}>0</span>Todo
              <span> ({filteredTask.length})</span>
            </Text>
            <ul className="todo-lists">
              {filteredTask.length === 0 ? (
                <div className="mb-4 flex justify-between items-center bg-list-blue  rounded-md w-3/3 shadow-md shadow-box-color cursor-pointer transition-opacity hover:opacity-70 ">
                  <Text className={classes.taskName} ta="center">
                    Empty List{" "}
                  </Text>
                </div>
              ) : (
                ""
              )}
              {filteredTask.map((task) => (
                <div
                  className="mb-4 flex justify-between items-center bg-list-blue  rounded-md w-3/3 shadow-md shadow-box-color cursor-pointer transition-opacity hover:opacity-70 "
                  key={task.id}
                >
                  <Text
                    onClick={() => detailHandeler(task.task, tasks)}
                    className="h-full w-5/6 text-left pt-6 pl-4 pb-5 "
                  >
                    {task.task}
                  </Text>
                  <Flex className="pr-4">
                    <div>
                      <Flex direction="row" justify="center">
                        <Tooltip
                          label="Move To Doings"
                          color="blue"
                          position="bottom"
                          withArrow
                          transition="scale-x"
                          fw={500}
                        >
                          <ThemeIcon
                            variant="light"
                            radius="xl"
                            size="xl"
                            color="cyan"
                            mr={15}
                            onClick={() =>
                              moveToDoingHandeler(tasks, task.task)
                            }
                          >
                            {<IconChevronRight />}
                          </ThemeIcon>
                        </Tooltip>
                      </Flex>
                    </div>
                    <div>
                      <Tooltip
                        label="Move To 
                    Done"
                        color="blue"
                        position="bottom"
                        withArrow
                        transition="scale-x"
                        fw={500}
                      >
                        <ThemeIcon
                          variant="light"
                          radius="xl"
                          size="xl"
                          color="cyan"
                          onClick={() => moveToDoneHandeler(tasks, task.task)}
                        >
                          {<IconChevronsRight />}
                        </ThemeIcon>
                      </Tooltip>
                    </div>
                  </Flex>
                </div>
              ))}
            </ul>
          </Container>
          <Container className={classes.child}>
            <Title className="uppercase font-light text-xl pb-6">
              <span
                className={classes.status}
                style={{
                  backgroundColor: "#67E2AE",
                  color: "#67E2AE",
                }}
              >
                0
              </span>
              doing
              <span>({filteredDoings.length})</span>
            </Title>
            <ul>
              {filteredDoings.length === 0 ? (
                <div className="mb-4 flex justify-between items-center bg-list-blue  rounded-md w-3/3 shadow-md shadow-box-color cursor-pointer transition-opacity hover:opacity-70 ">
                  <Text className={classes.taskName} ta="center">
                    Empty List{" "}
                  </Text>
                </div>
              ) : (
                ""
              )}
              {filteredDoings.map((doing) => (
                <div
                  className="mb-4 flex justify-between items-center bg-list-blue  rounded-md w-3/3 shadow-md shadow-box-color cursor-pointer transition-opacity hover:opacity-70 "
                  key={doing.id}
                >
                  <Text
                    onClick={() => detailHandeler(doing.task, doings)}
                    className="h-full w-5/6 text-left pt-6 pl-4 pb-5 "
                  >
                    {doing.task}
                  </Text>
                  <Flex className="pr-4">
                    <div onClick={() => moveToTodoHandeler(doings, doing.task)}>
                      <Tooltip
                        label="Move To Todo"
                        color="blue"
                        position="bottom"
                        withArrow
                        transition="scale-x"
                        fw={500}
                      >
                        <ThemeIcon
                          variant="light"
                          radius="xl"
                          size="xl"
                          color="cyan"
                          mr={15}
                        >
                          {<IconChevronLeft />}
                        </ThemeIcon>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip
                        label="Move To Done"
                        color="blue"
                        position="bottom"
                        withArrow
                        transition="scale-x"
                        fw={500}
                      >
                        <ThemeIcon
                          variant="light"
                          radius="xl"
                          size="xl"
                          color="cyan"
                          onClick={() => moveToDoneHandeler(doings, doing.task)}
                        >
                          {<IconChevronsRight />}
                        </ThemeIcon>
                      </Tooltip>
                    </div>
                  </Flex>
                </div>
              ))}
            </ul>
          </Container>
          <Container className={classes.child}>
            <Title className="uppercase font-light text-xl   pb-6">
              <span
                className={classes.status}
                style={{
                  backgroundColor: "#EA5555",
                  color: "#EA5555",
                }}
              >
                0
              </span>
              done
              <span>({filteredDones.length})</span>
            </Title>
            <ul>
              {filteredDones.length === 0 ? (
                <div className="mb-4 flex justify-between items-center bg-list-blue  rounded-md w-3/3 shadow-md shadow-box-color cursor-pointer transition-opacity hover:opacity-70 ">
                  <Text className={classes.taskName} ta="center">
                    Empty List{" "}
                  </Text>
                </div>
              ) : (
                ""
              )}
              {filteredDones.map((done) => (
                <div
                  className="mb-4 flex justify-between items-center bg-list-blue  rounded-md w-3/3 shadow-md shadow-box-color cursor-pointer transition-opacity hover:opacity-70 "
                  key={done.id}
                >
                  <Text
                    className="h-full w-5/6 text-left pt-6 pl-4 pb-5 "
                    onClick={() => detailHandeler(done.task, dones)}
                  >
                    {done.task}
                  </Text>
                  <Flex className="pr-4">
                    <div>
                      <Tooltip
                        label="Move To Doings"
                        color="blue"
                        position="bottom"
                        withArrow
                        transition="scale-x"
                        fw={500}
                      >
                        <ThemeIcon
                          variant="light"
                          radius="xl"
                          size="xl"
                          color="cyan"
                          mr={15}
                          onClick={() =>
                            moveToDoingHandeler(filteredDones, done.task)
                          }
                        >
                          {<IconChevronLeft />}
                        </ThemeIcon>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip
                        label="Move To Todo"
                        color="blue"
                        position="bottom"
                        withArrow
                        transition="scale-x"
                        fw={500}
                      >
                        <ThemeIcon
                          variant="light"
                          radius="xl"
                          size="xl"
                          color="cyan"
                          onClick={() => moveToTodoHandeler(dones, done.task)}
                        >
                          {<IconChevronsLeft />}
                        </ThemeIcon>
                      </Tooltip>
                    </div>
                  </Flex>
                </div>
              ))}
            </ul>
          </Container>
        </Box>
      </main>
      {showPopUp && (
        <Detail
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          Uname={userDetail.firstName}
        />
      )}
    </div>
  );
}

export default UserDetail;
