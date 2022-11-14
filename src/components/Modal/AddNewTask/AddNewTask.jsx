import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { TodoAdded } from "../../Task/TasksSlice";
import { DoneAdded } from "../../Task/DoneSlice";
import { DoingAdded } from "../../Task/DoingSlice";

import {
  Modal,
  Button,
  Group,
  MantineProvider,
  TextInput,
  Textarea,
  Select,
} from "@mantine/core";

function AddNewTask({ modal, setModal }) {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [status, setStatus] = useState("todo");
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef();

  console.log(title, discription, status);
  const SaveHandeler = (event) => {
    event.preventDefault();
    if (title && discription) {
      if (status.toLowerCase() === "todo") {
        dispatch(
          TodoAdded({
            id: uuidv4(),
            task: title,
            description: discription,
          })
        );
      } else if (status.toLowerCase() === "done") {
        dispatch(
          DoneAdded({
            id: uuidv4(),
            task: title,
            description: discription,
          })
        );
      } else if (status.toLowerCase() === "doing") {
        console.log("states");
        dispatch(
          DoingAdded({
            id: uuidv4(),
            task: title,
            description: discription,
          })
        );
      }
    }

    setTitle("");
    setDiscription("");
    setStatus("");
    setModal(!modal)
  };

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
        // mt= {200}
        transition={"skew-down"}
        transitionDuration={900}
        transitionTimingFunction="ease"
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
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
            mb="xl"
            mt={"sm"}
          ></Textarea>
          <div className="options">
            <Select
              defaultValue={'Todo'}
              value={status}
              onChange={setStatus}
              allowDeselect
              transition={"skew-up"}
              transitionDuration={400}
              transitionTimingFunction="ease"
              label="Add To"
              placeholder="Pick one"
              data={[
                { value: "todo", label: "todo" },
                { value: "doing", label: "doing" },
                { value: "done", label: "done" },
              ]}
            />
          </div>
          <Button
            onClick={SaveHandeler}
            fullWidth
            radius={"xl"}
            mt="xl"
          >
            Save Changes
          </Button>
        </form>
      </Modal>
    </MantineProvider>
  );
}

export default AddNewTask;
