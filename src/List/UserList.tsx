import { useAppContext } from "../AppContext";

function UserList() {
  const { userList } = useAppContext();
  return (
    <div>
      {userList.map((user) => {
        return (
          <li>
            <div>{user.name}</div>
            <div>{user.bio}</div>
          </li>
        );
      })}
    </div>
  );
}

export default UserList;
