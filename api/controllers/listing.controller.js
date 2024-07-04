import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";
import Stripe from "stripe";
import { config } from "dotenv";
config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const reduceBooking = async (req, res) => {
  const { listingId } = req.body;
  const listing = await Listing.findById({ _id: listingId });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: listing.name,
              images: [listing.imageUrls[0]]
            },
            unit_amount: listing.regularPrice+ "00",
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/listing/${listing._id}`,
      cancel_url: 'https://yourdomain.com/cancel',
    });
    listing.availableRooms -= 1;
    await listing.save();
    console.log(session.url)
    res.json({url : session.url});
   } catch (err) {
    console.log(err)
  }
};

export const getListingScore = async (req, res) => {
  const { listingId } = req.params;
  console.log(listingId);
  if (!listingId) {
    return res.status(403).json({ message: "Listing Id incorrect" });
  }
  const commentsForCurrentListing = await Comment.find({ listingId });
  const commentCount = commentsForCurrentListing.length;
  if (!commentCount) {
    return res.status(402).json({ message: "No comments", average: 0 });
  }
  let ratingSum = 0;
  for (let i = 0; i < commentCount; i++) {
    ratingSum += commentsForCurrentListing[i].rating;
  }
  const average = ratingSum / commentCount;
  return res.status(200).json({ message: "success", average });
};
