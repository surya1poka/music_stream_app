import React, { useEffect, useState } from "react";
import "./feed.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MusicCard from "./musicCard"; 
import Profile from "../musicProfile/Profile"; 

const Feed = () => {
  const [songs, setSongs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [editSong, setEditSong] = useState(null); 
  const [updatedSong, setUpdatedSong] = useState({
    name: "",
    author: "",
    image: "",
    ad: "", 
  }); 
  const getSongs = async () => {
    try {
      const response = await fetch("http://localhost:5000/music");
      if (!response.ok) throw new Error("Failed to fetch songs");
      const data = await response.json();
      setSongs(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load songs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      const filteredSongs = songs.filter(
        (song) =>
          song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSongs(filteredSongs); 
    } else {
      getSongs(); 
    }
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/music/${id}`, { method: "DELETE" });
      setSongs(songs.filter((song) => song.id !== id)); 
    } catch (err) {
      console.error(err);
      setError("Unable to delete song.");
    }
  };
  const handleEdit = (song) => {
    setEditSong(song); 
    setUpdatedSong({
      name: song.name,
      author: song.author,
      image: song.image,
      ad: song.ad, 
    }); 
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSong({ ...updatedSong, [name]: value });
  };
  const handleSaveEdit = async () => {
    try {
      await fetch(`http://localhost:5000/music/${editSong.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedSong),
        headers: { "Content-Type": "application/json" },
      });
      setSongs(
        songs.map((song) =>
          song.id === editSong.id ? { ...song, ...updatedSong } : song
        )
      );
      setEditSong(null); 
    } catch (err) {
      console.error(err);
      setError("Unable to save changes.");
    }
  };

  return (
    <div className="screen-container container-fluid overflow-auto">
      {/* Search Bar */}
      <div className="row">
        <div className="mt-4 mb-4 col-9 justify-content-center">
          <input
            type="text"
            className="form-control"
            placeholder="Search songs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
           </div>
          <div className="col-2">
          <button className="btn btn-outline-primary mt-4" onClick={handleSearch}>
            Search
          </button>
          </div>
      </div>

      {/* Error and Loading States */}
      {loading && <div>Loading songs...</div>}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && songs.length === 0 && <div>No songs available</div>}

      {/* Song List */}
      <div className="row hello">
        {!loading &&
          !error &&
          songs.map((song) => (
            <div key={song.id} className="col-12 col-sm-6 col-md-4 col-xl-3 mb-4 mr-2">
              <MusicCard song={song} />
              {/* Edit and Delete buttons */}
              <div className="btn-group">
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(song)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(song.id)} 
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Edit Form */}
      {editSong && (
        <div className="modal show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Song</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditSong(null)} 
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <label>Song Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={updatedSong.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Author</label>
                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    value={updatedSong.author}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    value={updatedSong.image}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Audio URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ad"
                    value={updatedSong.ad}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditSong(null)} 
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveEdit} 
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
