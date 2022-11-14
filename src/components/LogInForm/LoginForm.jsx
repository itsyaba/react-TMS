import { useForm } from "@mantine/form";
import { TextInput, Button, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect , useRef } from "react";

export default function LogInForm() {
  let navigate = useNavigate();
  let { type } = useParams();
  const inputRef = useRef();

useEffect(() => {
  inputRef.current?.focus();
}, []);

  const form = useForm({
    initialValues: { name: "", password: "" },
    validate: {
      name: (value) =>
        value.length != 2 ? "Name must have at least 2 letters" : null,
      password: (value) => (value.length != 2 ? "Invalid password" : null),
    },
  });

  const handleError = (errors) => {
    if (errors.name) {
      showNotification({ message: "Please fill name field", color: "red" });
      console.log(errors.name);
    } else if (errors.password) {
      showNotification({
        message: "Please provide a valid password",
        color: "red",
      });
      console.log(errors.password);
    }
  };

  const handleSubmit = (values) => {
    const name = values.name;
    const password = values.password;

    console.log(values);
    if (name === "ad" && password === "ad") {
      console.log("you are the admin");
      navigate('role/admin')
    } else if (name === "sa" && password === "sa") {
      console.log("you are the super-admin");
      navigate('role/super-admin');
    } else if (name === "op" && password == "op") {
      console.log("you are the operator");
      navigate("role/operator");

    } else if (name === "fo" && password === "fo") {
      console.log("you are the Finance Officers");
      navigate("role/Finance-Officers");
    }
  };

  return (
    <Group position="center" mt={100}>
      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <TextInput
          label="Name"
          placeholder="Name"
          ref={inputRef}
          {...form.getInputProps("name")}
          w={560}
        />
        <TextInput
          mt="sm"
          label="password"
          placeholder="password"
          {...form.getInputProps("password")}
          w={560}
        />
        <Button type="submit" mt="xl" radius="md" size="md" color="indigo">
          Submit
        </Button>
      </form>
    </Group>
  );
}
