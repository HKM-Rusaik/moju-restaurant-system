import React, { useState } from "react";
import { storage } from "firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const ProfilePicUpload = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setProfileImage(selectedImage);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    setError(null);

    try {
      const imageRef = ref(storage, `images/${profileImage.name + uuidv4()}`);
      await uploadBytes(imageRef, profileImage);

      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
    //   setLoading(false);
    } catch (err) {
      console.error("Error uploading profile pic", err);
      setError("Error uploading profile pic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <label htmlFor="upload" className="relative cursor-pointer">
        <input
          id="upload"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleImageChange}
        />
        <div className="w-32 h-32 rounded-full overflow-hidden relative">
          {!profileImage && (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-sm">Upload Image</span>
            </div>
          )}
          {profileImage && (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </label>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleUpload}
        disabled={!profileImage || loading}
      >
        {loading ? "Uploading..." : "Save"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {imageUrl && (
        <div className="mt-4">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-32 h-32 rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePicUpload;
