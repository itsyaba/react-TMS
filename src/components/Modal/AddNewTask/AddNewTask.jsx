import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
import { TodoAdded } from "../../TaskLists/TasksSlice";
import { ActivityAdded } from "../../../Pages/ActivityLog/ActivitySlice";
import {
  Modal,
  Button,
  MantineProvider,
  TextInput,
  Textarea,
  Loader,
  Center,
  MultiSelect,
  useMantineTheme,
} from "@mantine/core";

function AddNewTask({ modal, setModal }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {type} = useParams()
  const [status, setStatus] = useState("todo");
  const [isLoading, setIsLoading] = useState(true);
  const [devname, setDevname] = useState([]);
  const [assignedTo, setAssignedto] = useState([]);
  const [data, SetData] = useState({
    TaskId: "",
    taskName: "",
    taskDetail: "",
    taskStatus: "",
    taskAssignedTo: [],
  });
  const dispatch = useDispatch();

  const SaveHandeler = (event) => {
    event.preventDefault();
    if (title && description) {
      SetData({
        taskId: uuidv4(),
        taskName: title,
        taskDetail: description,
        taskStatus: status,
        assignedTo: assignedTo,
      });

      dispatch(
        TodoAdded({
          id: uuidv4(),
          task: title,
          description: description,
          status: type,
          assignedTo: assignedTo,
        })
      );

      dispatch(
        ActivityAdded({
          operationName: "Added a task",
          completed: "Succeeded",
          time: `${new Date().toLocaleDateString()}`,
          eventIntiatedBy: `${type}`,
        }) 
      );
    } else {
      alert("try again");
    }

    setTitle("");
    setDescription("");
    setStatus("");
    setAssignedto([]);
    setModal(!modal);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await Axios.get(`https://dummyjson.com/users`);
        const result = resp.data.users;
        for (const props of result) {
          setDevname((devname) => [...devname, props.firstName]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error.message);
        console.log("error");
      }
    };
    fetchData();
  }, []);

  const theme = useMantineTheme();

  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
      }}
    >
      <Modal
        closeOnEscape
        opened={modal}
        onClose={() => setModal(false)}
        title="Add A New Task"
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
        <form>
          <label htmlFor="title" className="title-label">
            Title
          </label>
          <TextInput
            data-autofocus
            type="text"
            mt={"sm"}
            mb="xl"
            placeholder="e.g Take coffee break"
            value={title}
            name="name"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="descripion" className="descripion-label">
            Description
          </label>
          <Textarea
            name="descripion"
            placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            mb="xl"
            mt={"sm"}
          />
          {isLoading ? (
            <Center>
              <Loader variant="dots" />
            </Center>
          ) : (
            <div className="options">
              <MultiSelect
                searchable
                nothingFound="Nothing found"
                label="Assign Task To"
                placeholder="Choose A Developer"
                transition="slide-down"
                transitionDuration={360}
                transitionTimingFunction="ease"
                limit={10}
                data={devname}
                value={assignedTo}
                onChange={setAssignedto}
              />
            </div>
          )}

          <Button
            onClick={SaveHandeler}
            fullWidth
            radius={"xl"}
            mt="xl"
            className="bg-indigo-500"
          >
            Save Changes
          </Button>
        </form>
      </Modal>
    </MantineProvider>
  );
}

export default AddNewTask;
