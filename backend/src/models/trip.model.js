import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  time: {
    type: String
  }
});

const dayPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true
  },

  activities: [activitySchema]
});

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    destination: {
      type: String,
      required: true
    },

    days: {
      type: Number,
      required: true
    },

    budgetType: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true
    },

    interests: {
      type: [String],
      default: []
    },

    itinerary: [dayPlanSchema],

    estimatedBudget: {
      flights: Number,
      accommodation: Number,
      food: Number,
      activities: Number,
      total: Number
    },
    chatHistory: [
        {
            role: {
            type: String,
            enum: ["user", "assistant"]
            },
            message: String,
            createdAt: {
            type: Date,
            default: Date.now
            }
        }
    ],
    hotels: [
        {
            name: {
            type: String
            },
            type: {
            type: String
            }
        }
    ]
  },
  { timestamps: true }
);


const Trip = mongoose.model("Trip", tripSchema);

export default Trip;