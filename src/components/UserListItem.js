import { GoTrashcan } from "react-icons/go";
import AlbumsList from "./AlbumsList";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { removeUser } from "../store";
import useThunk from "./hooks/use-thunk";

function UserListItem({ user }) {
  const [doRemoveUser, isDeletingUser, error] = useThunk(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button className="mr-3" loading={isDeletingUser} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {error && <div>" Ops! Error deleting user"</div>}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UserListItem;
