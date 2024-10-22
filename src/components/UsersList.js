import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import UserListItem from "./UserListItem";
import Button from "./Button";
import Skeleton from "./Skeleton";
import useThunk from "./hooks/use-thunk";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  // const dispatch = useDispatch();

  // returning object: {data: [], isLoading: false, error: null}
  const { data } = useSelector((state) => state.users);
  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={5} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>{"Error fetching data"}</div>;
  } else {
    content = data.map(({ id, name }) => {
      return <UserListItem key={id} user={{ id, name }} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleUserAdd} loading={isCreatingUser}>
          + Add User
        </Button>
        {creatingUserError && <div>"Error creating user"</div>}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
