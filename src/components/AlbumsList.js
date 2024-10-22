import React from "react";
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import AlbumsListItem from "./AlbumsListItem";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isLoading) {
    content = <Skeleton times={3} />;
  } else if (error) {
    content = <div>Error Loading albums.</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }

  return (
    <div className="m2 flex flex-row items-center justify-between">
      <h3 className="text-lg font-bold">Albums for {user.name}</h3>
      <Button onClick={handleAddAlbum} loading={results.isLoading}>
        + Add Album
      </Button>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
