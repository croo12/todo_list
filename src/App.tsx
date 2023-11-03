import { createGlobalStyle } from "styled-components";
import "./App.css";
import TodoListPage from "./pages/TodoListPage/TodoListPage";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`

function App() {

  return (
    <div className="container">
      <GlobalStyle />
      <TodoListPage />
    </div>
  );
}

export default App;
