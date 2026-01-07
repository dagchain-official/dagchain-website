import mongoose, { Schema, models, model } from "mongoose";

const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    answer: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);


const WebpageSchema = new Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    topic: String,
    description: String,
    type: String,
    cta_label: String,
    cta_url: String,

    meta: {
      metaTitle: String,
      metaDescription: String,
      metaKeywords: [String],
    },

    banner: {
      image: String,
      heading: String,
      subheading: String,
      description: String,
    },

    content_1: String,
    content_2: String,
    content_3: String,
    content_4: String,
    content_5: String,

    indexingStatus: {
      type: String,
      enum: ["pending", "indexed"],
      default: "pending",
    },

    indexingAt: {
      type: Date,
    },
     
    questions: {
      type: [QuestionSchema],
      default: [],
    },
    
    status: {
      type: String,
      enum: ["draft", "published", "paused", "deleted"],
      default: "draft",
    },
  },
  { timestamps: true }
);

WebpageSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate() as any;

  const newStatus =
    update?.indexingStatus || update?.$set?.indexingStatus;

  if (newStatus) {
    this.setUpdate({
      ...update,
      $set: {
        ...(update.$set || {}),
        indexingAt: new Date(),
      },
    });
  }
});

export default models.Webpage || model("Webpage", WebpageSchema);
