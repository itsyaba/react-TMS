import React, { useState } from "react";
// import { ReactSortable, swap } from "react-sortablejs";
import Detail, { detail } from "../Modal/Detail/Detail";
import { detailAdded } from "../Task/DetailSlice";

import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  List,
  MantineProvider,
  Group,
  Text,
  Title,
  Box,
  createStyles,
  Container,
} from "@mantine/core";

function Tasks() {
  const tasks = useSelector((state) => state.task);
  const doings = useSelector((state) => state.doing);
  const dones = useSelector((state) => state.done);

  const { type } = useParams();
  const navigate = useNavigate();

  const [showPopUp, setShowPopUp] = useState(false);

  const dispatch = useDispatch();

  const useStyles = createStyles((theme, __params, getRef) => ({
    lists: {
      boxShadow: "#686c741a 0px 4px 6px",
      backgroundColor: "#2b2c37",
      marginBottom: "20px",
      borderRadius: "6px",
      padding: "23px 16px 15px 16px",
      listStyle: "none",
      width: "30vw",
      cursor: "pointer",
      transition: "all ease 0.2s",

      "&:hover": { opacity: "0.6" },
      "&:active": { scale: "0.9" },
    },
    type: {
      textTransform: "uppercase",
      letterSpacing: "6px",
      fontWeight: "300",
      paddingBottom: "30px",
      fontSize: "25px",
    },
    main: {
      backgroundColor: " #20212c",
      color: "white",
      width: "100%",
      height: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    status: {
      backgroundColor: "rgb(73, 196, 229)",
      borderRadius: "30%",
      padding: "1px 5px",
      width: "15px",
      height: "15px",
    },
    child: {
      padding: "40px 0",
      margin: "0 10px 20px 30px",
    },
  }));

  const detailHandeler = (item, status) => {
    const newValue = status.filter((element) => element.task === item);
    dispatch(
      detailAdded({
        id: newValue[0].id,
        task: newValue[0].task,
        discription: newValue[0].description,
      })
    );

    if (type.toLowerCase() !== "finance-officers") {
      setShowPopUp(true);
    } else {
      navigate("/unautorize");
    }
  };

  const { classes } = useStyles();

  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
      }}
    >
      <Box className={classes.main} size={"xl"}>
        <Container className={classes.child}>
          <Text className={classes.type}>
            Todo <span className={classes.status}> {tasks.length}</span>
          </Text>
          <ul className="todo-lists">
            {/* <ReactSortable list={tasks} setList={setShowPopUp} swap> */}
            {tasks.map((task) => (
              <List
                className={classes.lists}
                key={task.id}
                onClick={() => detailHandeler(task.task, tasks)}
              >
                {task.task}
              </List>
            ))}
            {/* </ReactSortable> */}
          </ul>
        </Container>
        <Container className={classes.child}>
          <Title order={2} className={classes.type}>
            doing <span className={classes.status}>{doings.length}</span>
          </Title>
          <ul>
            {/* <ReactSortable list={doings} setList={setShowModal} swap> */}
            {doings.map((doing) => (
              <List
                className={classes.lists}
                key={doing.id}
                onClick={() => detailHandeler(doing.task, doings)}
              >
                {doing.task}
              </List>
            ))}
            {/* </ReactSortable> */}
          </ul>
        </Container>
        <Container className={classes.child}>
          <Title className={classes.type}>
            done <span className={classes.status}>{dones.length}</span>
          </Title>
          <ul>
            {dones.map((done) => (
              <List
                className={classes.lists}
                key={uuidv4()}
                onClick={() => detailHandeler(done.task, dones)}
              >
                {done.task}
              </List>
            ))}
          </ul>
        </Container>
        {showPopUp && (
          <Detail showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
        )}
      </Box>
    </MantineProvider>
  );
}

export default Tasks;
