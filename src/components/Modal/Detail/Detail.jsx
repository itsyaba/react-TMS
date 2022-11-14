import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DoingRemoved } from "../../../components/Task/DoingSlice";
import { DoneRemoved } from "../../../components/Task/DoneSlice";
import { TasksRemoved } from "../../../components/Task/TasksSlice";
import { useParams, useNavigate } from "react-router-dom";

import {
  Button,
  Group,
  Text,
  Title,
  MantineProvider,
  Modal,
  useMantineTheme,
  Box,
} from "@mantine/core";

function Detail({ showPopUp, setShowPopUp }) {
  const detail = useSelector((state) => state.detail);
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  let { type } = useParams();
  let navigate = useNavigate();


  const removeHandeler = (title) => {
    if (
      type.toLowerCase() === "admin" ||
      type.toLowerCase() === "super-admin"
    ) {
      dispatch(DoneRemoved(title));
      dispatch(DoingRemoved(title));
      dispatch(TasksRemoved(title));
      setShowPopUp(false);
    } else {
      navigate("/unautorize");
    }
  };


  return (
    <>
      <MantineProvider
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.15}
        overlayBlur={1}
        theme={{
          colorScheme: "dark",
        }}
      >
        <Modal
          opened={showPopUp}
          onClose={() => setShowPopUp(false)}
          centered
          size={"xl"}
        >
          <Box>
            <Group>
              <Title order={2}>{detail.title}</Title>
              <Text>{detail.discription}</Text>
            </Group>
            <Group mt="xl" size="xl" color="red">

              <Button
                fullWidth
                mt={24}
                radius={"xl"}
                className="removeBtn"
                color="red"
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
