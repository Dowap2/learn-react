import Form from "./Form/Form";
import UserList from "./List/UserList";
import { AppProvider } from "./AppContext";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Form />
        <UserList />
      </AppProvider>
    </div>
  );
}

export default App;
