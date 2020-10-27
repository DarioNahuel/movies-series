import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Season
interface SeasonAttrs {
  number: number;
}

// An interface that describes the properties
// that a Season Model has
interface SeasonModel extends mongoose.Model<SeasonDoc> {
  build(attrs: SeasonAttrs): SeasonDoc;
}

// An interface that describes the properties
// that a Season Document has
interface SeasonDoc extends mongoose.Document {
  number: number;
  episodes: Array<mongoose.Types.ObjectId>
}

const seasonSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    episodes: [{
      type: mongoose.Types.ObjectId,
      ref: "Episode"
    }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

seasonSchema.statics.build = (attrs: SeasonAttrs) => {
  return new Season(attrs);
};

const Season = mongoose.model<SeasonDoc, SeasonModel>('Season', seasonSchema);

export { Season };
