const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Shcema } = mongoose;

const ArtistSchema = Shcema({
  name: {
    type: String,
    required: [true, "song needs an artits"],
  },
});

const SongSchema = Shcema({
  name: {
    type: String,
    required: [true, "song needs an name"],
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "name",
    required: [true, "song needs an artist"],
  },
  length: {
    type: Number,
    required: false,
  },
  streams: {
    type: Number,
    required: false,
  },
  genre: {
    type: String,
    enum: ["Rock", "Pop", "Rap", "Indie", "Country"],
    required: true,
  },
});

const playlistSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
});

const Playlist = mongoose.model("Playlist", playlistSchema);
const Song = mongoose.model("Song", SongSchema);
const Artist = mongoose.model("Artist", ArtistSchema);

module.exports = {
  Playlist,
  Song,
  Artist,
};
