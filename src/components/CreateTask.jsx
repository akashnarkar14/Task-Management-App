import React, { useState } from "react";
import { Button, Input, Flex } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo", // can be inprogress or closed
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3) {
      return toast.error("Task must have more than 3 character");
    }
    if (task.name.length > 100) {
      return toast.error("Task must not have more than 100 character");
    }

    setTasks((prev) => {
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    toast.success("Task Created");
    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap="5" mt="52px">
        <Input
          placeholder="Enter your Task"
          bg="white"
          value={task.name}
          onChange={(e) =>
            setTask({ ...task, id: uuidv4(), name: e.target.value })
          }
        />
        <Button type="submit" colorScheme="blue">
          Create
        </Button>
      </Flex>
    </form>
  );
};

export default CreateTask;
