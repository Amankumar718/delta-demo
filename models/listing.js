const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    description:String,
    image:{
        filename:String,
        url:String
        // default:
        //     "https://www.freepik.com/pikaso/adjust?image=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fmorskie-oko-tatry_1204-510.jpg%3Ft%3Dst%3D1742301256~exp%3D1742304856~hmac%3D94f3f55a7999aa2e30dd4ea02b124942d62851ab2a21db531bf587132239d887%26w%3D2000%26cachebuster%3D1742301258698",
        // set: (v) => v ===""?"https://www.freepik.com/pikaso/adjust?image=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fmorskie-oko-tatry_1204-510.jpg%3Ft%3Dst%3D1742301256~exp%3D1742304856~hmac%3D94f3f55a7999aa2e30dd4ea02b124942d62851ab2a21db531bf587132239d887%26w%3D2000%26cachebuster%3D1742301258698": v,

    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User",
    },
    geometry:  {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
});

listingSchema.post("findOneAndDelete", async (Listing) => {
    if(listing) {
        await Review.deleteMany({_id: { $in: listing.reviews}});
    }
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
