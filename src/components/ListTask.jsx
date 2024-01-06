import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Box, Button, Flex, Grid, Heading, Icon } from "@chakra-ui/react";
import toast from "react-hot-toast";

const ListTask = ({ tasks, setTasks }) => {
  const statuses = ["todo", "started", "completed"];
  const [dragTask, setdragTask] = useState();
  const handleRemove = (id) => {
    const fTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast("Task removed");
  };
  function allowDrop(ev) {
    console.log("hereee");
    ev.preventDefault();
  }

  function drag(task) {
    console.log("hereee1");
    setdragTask(task);
  }

  function drop(ev) {
    console.log("hereee2", ev.target);
    ev.preventDefault();
    if (dragTask) {
      let taskId = tasks.findIndex((task) => task.id === dragTask.id);
      let taskStat = statuses.find((status) => ev.target.id.includes(status));
      let taskCopy = JSON.parse(JSON.stringify(tasks));
      taskCopy[taskId].status = taskStat;
      setTasks(taskCopy);
    }
  }

  return (
    <Grid templateColumns={{ sm: "1fr", md: "4fr 4fr 4fr" }} gap="5">
      {statuses.map((status, index) => {
        let currentTask = tasks.filter((task) => task.status === status);

        return (
          <Box
            w="64"
            pb="10"
            alignItems="center"
            onDrop={(event) => drop(event)}
            onDragOver={allowDrop}
            id={status}
            bgColor="gray.200"
            borderRadius="17px"
          >
            <Heading
              as="h3"
              fontSize="lg"
              bg={status=="started" ? "blue.600" : status=="completed" ? "green.600" : "red.600"}
              border="1px solid white"
              textTransform={"capitalize"}
              py="4"
              px="2"
              borderRadius="17px 17px 0 0"
              alignItems="center"
              color="white"
            >
              {status} {"("}
              {currentTask.length}
              {")"}
            </Heading>

            <ul>
              {currentTask.map((task, id) => {
                return (
                  <div draggable="true" onDragStart={() => drag(task)}>
                    <li>
                      <Flex
                        id={`${status}${id}`}
                        fontSize="md"
                        bg="whitesmoke"
                        border="1px solid black"
                        borderRadius="7px"
                        py="2"
                        px="2"
                        mx="2"
                        my="2"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        {task.name}
                        <Button
                          type="button"
                          colorSchema="red"
                          _hover={{ bgColor: "red.500" }}
                          bgColor="red.200"
                          py="1"
                          px="1"
                          fontSize="20px"
                          onClick={() => handleRemove(task.id)}
                        >
                          <Icon as={IoCloseCircleSharp} />
                        </Button>
                      </Flex>
                    </li>
                  </div>
                );
              })}
            </ul>
          </Box>
        );
      })}
    </Grid>
  );
};

export default ListTask;
