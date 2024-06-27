import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    
    const pipeline = []

    console.log(userId);

    // Match stage for filtering by userId

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId!");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User Not available witht this userId!");
    }

    if (userId) {
        pipeline.push({
            $match: {
                owner: mongoose.Types.ObjectId (userId)
            }
        })   
    }

    // Match stage for based on text query

    if (query){
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } }
                ]
            }
        })
    }

    // sort stage

    if (sortBy && sortType) {
        const sortTypeValue = sortType === 'desc' ? -1 : 1;
        pipeline.push({
            $sort: {[sortBy]: sortTypeValue}
        })
    }

    // populate the owner

    pipeline.push({
        $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
            pipeline: [
                {
                    $project: {
                        username: 1,
                        fullName: 1,
                        avatar: 1
                    }
                }
            ]
        }
    })

    // add the calculated owner field
    pipeline.push({
        $addFields: {
            owner: {
                $first: "$owner"
            }
        }
    })

    const aggregate = Video.aggregate(pipeline)

    Video.aggregatePaginate(aggregate, { page, limit })
        .then(function (result) {
            return res.status(200).json(new ApiResponse(
                200,
                { result },
                "Fetched videos successfully"
            ))
        })
        .catch(function (error) {
            throw error
        })

})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}