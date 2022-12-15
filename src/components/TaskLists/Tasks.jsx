import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { detailAdded } from "./DetailSlice";
import { DoingRemoved, DoingAdded } from "./DoingSlice";
import { DoneRemoved, DoneAdded } from "./DoneSlice";
import { TasksRemoved, TodoAdded } from "./TasksSlice";
import { ActivityAdded } from "../../Pages/ActivityLog/ActivitySlice";

import Detail from "../Modal/TaskDetail/Detail";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsRight,
  IconChevronsLeft,
} from "@tabler/icons";

import {
  MantineProvider,
  Text,
  Title,
  Box,
  createStyles,
  Container,
  ThemeIcon,
  Tooltip,
  Flex,
} from "@mantine/core";

function Tasks() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [filteredTask, setFilteredTask] = useState([]);
  const [filteredDoings, setFilteredDoings] = useState([]);
  const [filteredDones, setFilteredDones] = useState([]);
  const tasks = useSelector((state) => state.task);
  const doings = useSelector((state) => state.doing);
  const dones = useSelector((state) => state.done);
  const username = useSelector((state) => state.username);
  const dispatch = useDispatch();



  useEffect(() => {
    if (username.name !== "admin" && username.name !== "super-admin") {
      setFilteredDoings(
        doings.filter((u) => {
          return u.assignedTo?.includes(username.name);
        })
      );
      setFilteredTask(
        tasks?.filter((u) => {
          return u.assignedTo.includes(username.name);
        })
      );
      setFilteredDones(
        dones.filter((u) => {
          return u.assignedTo.includes(username.name);
        })
      );
    } else {
      setFilteredDoings(doings);
      setFilteredDones(dones);
      setFilteredTask(tasks);
    }
  }, [tasks, doings, dones, username.name]);

  const useStyles = createStyles((theme, __params, getRef) => ({
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

  const detailHandeler = (item, allTask) => {
    setShowPopUp(!showPopUp);
    const newValue = allTask.find((element) => element.task === item);
    dispatch(
      detailAdded({
        id: newValue.id,
        task: newValue.task,
        description: newValue.description,
        status: newValue.status,
        assignedTo: newValue.assignedTo,
      })
    );
  };

  const moveToDoneHandeler = (taskLists, task) => {
    const newValue = taskLists.find((element) => element.task === task);
    dispatch(
      DoneAdded({
        task: newValue.task,
        id: newValue.id,
        description: newValue.description,
        status: newValue.status,
        assignedTo: newValue.assignedTo,
      })
    );
    dispatch(
      ActivityAdded({
        operationName: "Finished a task",
        completed: "Succeeded",
        time: `${new Date().toLocaleDateString()}`,
        eventIntiatedBy: `${username.name}`,
      })
    );
    dispatch(DoingRemoved(task));
    dispatch(TasksRemoved(task));
  };

  const moveToDoingHandeler = (taskLists, task) => {
    const newValue = taskLists.find((element) => element.task === task);
    dispatch(
      DoingAdded({
        task: newValue.task,
        id: newValue.id,
        description: newValue.description,
        status: newValue.status,
        assignedTo: newValue.assignedTo,
      })
    );
    dispatch(
      ActivityAdded({
        operationName: "Starts a task",
        completed: "Succeeded",
        time: `${new Date().toLocaleDateString()}`,
        eventIntiatedBy: `${username.name}`,
      })
    );
    dispatch(DoneRemoved(newValue.task));
    dispatch(TasksRemoved(newValue.task));
  };

  const moveToTodoHandeler = (taskLists, task) => {
    const newValue = taskLists.find((element) => element.task === task);
    dispatch(
      TodoAdded({
        task: newValue.task,
        id: newValue.id,
        description: newValue.description,
        assignedTo: newValue.assignedTo,
      })
    );
    dispatch(
      ActivityAdded({
        operationName: "Resets a task",
        completed: "Succeeded",
        time: `${new Date().toLocaleDateString()}`,
        eventIntiatedBy: `${username.name}`,
      })
    );
    dispatch(DoneRemoved(task));
    dispatch(DoingRemoved(task));
  };

  const { classes } = useStyles();

  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
      }}
    >
      <Box
        className="grid gap-4 grid-cols-3 grid-rows-3 w-full h-screen bg-[#20212c]"
        size={"xl"}
      >
        <Container className={classes.child}>
          <Text className="uppercase font-light text-xl pb-6">
            <span className={classes.status}>0</span>Todo
            <span> ({filteredTask.length})</span>
          </Text>
          <ul className="todo-lists">
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
                          onClick={() => moveToDoingHandeler(tasks, task.task)}
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
      {showPopUp && (
        <Detail showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
      )}
    </MantineProvider>
  );
}

export default Tasks;
