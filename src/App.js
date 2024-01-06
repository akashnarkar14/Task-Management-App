import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTask from "./components/ListTask";
import { Flex } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
  const [tasks, setTasks] = useState([]);

  console.log("tasks", tasks);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <Flex
        as="main"
        direction="column"
        py="6"
        px="6"
        bgColor="gray.800"
        h={{
          sm: "auto",
          md: "auto",
          lg: "1024px",
          xl: "1024px",
        }}
        alignItems="center"
      >
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <br></br>
        <ListTask tasks={tasks} setTasks={setTasks} />
      </Flex>
    </DndProvider>
  );
}

export default App;
