import { useAppContext } from "../AppContext";

function UserList() {
  const { userList } = useAppContext();
  return (
    <div>
      {userList.map((user) => {
        return <li>{user.name}</li>;
      })}
    </div>
  );
}

export default UserList;
