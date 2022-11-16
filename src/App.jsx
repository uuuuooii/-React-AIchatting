import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AiChatting from "./chatting/AiChatting";

function App() {
  const [count, setCount] = useState(0);

  return <AiChatting></AiChatting>;
}

export default App;
