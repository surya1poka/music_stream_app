import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Library = ({ toggleLibrary }) => {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const getLibrary = async () => {
    try {
      const response = await fetch("http://localhost:5000/music");
      if (!response.ok) throw new Error("Failed to fetch library");
      const data = await response.json();
      setLibrary(data.filter((song) => song.lib)); 
    } catch (err) {
      console.error(err);
      setError("Unable to load library. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getLibrary();
  }, [toggleLibrary]); 

  const handleRemoveLibrary = async (song) => {
    const updatedSong = { ...song, lib: false };

    try {
      const response = await fetch(`http://localhost:5000/music/${song.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSong),
      });

      if (!response.ok) throw new Error("Failed to remove from library");

      toggleLibrary(updatedSong);
      getLibrary(); 
    } catch (err) {
      console.error("Error removing from library:", err);
      setError("Unable to remove from library. Please try again later.");
    }
  };

  return (
    <div className="screen-container text-center">
      <h2 className="text-light m-2">Library</h2>
      {loading ? (
        <p className="text-light">Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : library.length === 0 ? (
        <p className="text-danger">No songs in library</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Song Name</th>
              <th>Artist</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {library.map((song) => (
              <tr key={song.id}>
                <td>{song.name}</td>
                <td>{song.author}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveLibrary(song)}
                  >
                    Remove from Library
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Library;
