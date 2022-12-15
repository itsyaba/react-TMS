import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Anchor } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";

function LoginFormDeveloper() {
  let navigate = useNavigate();
  let { type } = useParams();

  const handleSubmit = (values) => {
    const name = values.name;
    const password = values.password;

    console.log(values);
    if (name === "ad" && password === "ad") {
      console.log("you are the admin");
      navigate("role/admin");
    } else if (name === "sa" && password === "sa") {
      console.log("you are the super-admin");
      navigate("role/super-admin");
    } else if (name === "op" && password == "op") {
      console.log("you are the operator");
      navigate("role/operator");
    } else if (name === "fo" && password === "fo") {
      console.log("you are the Finance Officers");
      navigate("role/Finance-Officers");
    }
  };

  const form = useForm({
    initialValues: { name: "", email: "" },
    validate: {
      name: (value) =>
        value.length != 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (value.length != 2 ? "Invalid email" : null),
    },
  });
  return (
    <Group position="center" mt={100}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          autoFocus
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
          w={560}
        />
        <TextInput
          mt="sm"
          label="email"
          placeholder="email"
          {...form.getInputProps("email")}
          w={560}
        />
        <Group>
          <Button
            type="submit"
            my="xl"
            radius="md"
            size="md"
            color="indigo"
            fullWidth
          >
            Submit
          </Button>
          <Anchor onClick={() => navigate("/ ")}>
            Login As Admin
          </Anchor>
        </Group>
      </form>
    </Group>
  );
}

export default LoginFormDeveloper;
