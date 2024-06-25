import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription

    const subscriberId = req.user._id

    const channel = await User.findById(channelId)

    if (!channel) {
        throw new ApiError(404, "Channel not found")
    }

    const subscription = await Subscription.findOne({
        subscriber: subscriberId,
        channel: channelId
    })

    if (subscription) {
        
        await Subscription.findByIdAndDelete(subscription._id)

        return res
        .status(200)
        .json(new ApiResponse(
            200,
            {},
            "Unsubscribed successfully"
        ))
    }

    await Subscription.create({
        subscriber: subscriberId,
        channel: channelId
    })

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "Subscribed successfully"
    ))
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {subscriberId} = req.params

    // console.log(subscriberId);

    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid channel id")
    }

    const subscribers = await Subscription.find({
        channel: subscriberId
    })

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        subscribers,
        "Subscribers fetched successfully"
    ))
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { channelId } = req.params

    // console.log("channelId: ",channelId);

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid subscriber id")
    }

    const subscribedChannels = await Subscription.find({
        subscriber: channelId
    })

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        subscribedChannels,
        "Subscribed channels fetched successfully"
    ))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}