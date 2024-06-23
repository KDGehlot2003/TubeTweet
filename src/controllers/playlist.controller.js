import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    //TODO: create playlist

    const userId = req.user._id

    if (!name || !description) {
        throw new ApiError(400, "All Field are required!")
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: userId
    })

    if (!playlist) {
        throw new ApiError(400, "Something went wrong Please try again later")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "Playlist created successfully"
    ))

})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists

    const playlists = await Playlist.find({
        owner: userId
    })  //.populate("videos")

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        playlists,
        "User playlists retrieved successfully"
    ))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID")
    }

    const playlist = await Playlist.findById(playlistId)

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        playlist,
        "Playlist retrieved successfully"
    ))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID")
    }

    const playlist = await Playlist.findByIdAndDelete(playlistId)

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        playlist,
        "Playlist deleted successfully"
    ))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID")
    }

    if (!name || !description) {
        throw new ApiError(400, "All fields are required")
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            name,
            description
        },
        {new: true}
    )

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        playlist,
        "Playlist updated successfully"
    ))

})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}