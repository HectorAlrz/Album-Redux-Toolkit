import React from "react";
import { GoTrashcan } from "react-icons/go";
import { useRemovePhotoMutation } from "../store";

function PhotoListItem({ photo }) {
  const [removePhoto] = useRemovePhotoMutation();
  const handleRemoveAlbum = () => {
    removePhoto(photo);
  };

  return (
    <div onClick={handleRemoveAlbum} className="relative m-2 cursor-pointer">
      <img className="h-20 w-20" src={photo.url} alt="random-pic" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrashcan className="text-3xl" />
      </div>
    </div>
  );
}

export default PhotoListItem;
