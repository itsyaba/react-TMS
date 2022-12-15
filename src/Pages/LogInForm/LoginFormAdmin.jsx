import { TextInput, Button, Group, PasswordInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { LoginAs } from "./loginSlice";

export default function LogInForm() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [filteredResult, setFilteredResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Axios.get(`https://dummyjson.com/users`);
        const result = data.data.users;
        const user = result.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          setFilteredResult(user);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "ad@gmail.com" && password === "ad") {
      console.log("you are the admin");
      dispatch(
        LoginAs({
          name: "admin",
        })
      );
      navigate("/tasks");
    } else if (email === "sa@gmail.com" && password === "sa") {
      console.log("you are the super-admin");
      navigate("/tasks");

      dispatch(
        LoginAs({
          name: "super-admin",
        })
      );
    } else if (email === "op@gmail.com" && password === "op") {
      console.log("you are the operator");
      navigate("/tasks");

      dispatch(
        LoginAs({
          name: "operator",
        })
      );
    } else if (email === "fo@gmail.com" && password === "fo") {
      console.log("you are the Finance Officers");
      navigate("/tasks");

      dispatch(
        LoginAs({
          name: "finance-officers",
        })
      );
    } else if (
      email === filteredResult.email &&
      password === filteredResult.password
    ) {
      console.log(`You are Developer ${filteredResult.firstName}`);
      navigate("/tasks");

      dispatch(
        LoginAs({
          name: `${filteredResult.firstName}`,
        })
      );
    }
  };

  return (
    <Group position="center" mt={100}>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="email"
          placeholder="Email"
          autoFocus
          w={560}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          mt="sm"
          label="password"
          placeholder="password"
          w={560}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Group>
          <Button
            type="submit"
            my="xl"
            radius="md"
            size="md"
            fullWidth
            className="bg-indigo-500"
          >
            Submit
          </Button>
        </Group>
      </form>
    </Group>
  );
}
