import { useEffect, useState } from "react";
import axios from "axios";
import TaskBar from "./TaskBar";

function App() {
    const [tasks, setTasks] = useState();

    useEffect(() => {
        axios.get("http://localhost:3001/getTasks").then((res) => {
            setTasks(res.data);
            console.log(res.data);
        });
    }, []);

    return (
        <div>
            <ul>
                {!tasks
                    ? "Loading..."
                    : tasks.map((e) => {
                          return <li>{e.task}</li>;
                      })}
            </ul>
        </div>
    );
}

export default App;
