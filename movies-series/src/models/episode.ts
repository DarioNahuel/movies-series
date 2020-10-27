import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Episode
interface EpisodeAttrs {
  number: number;
}

// An interface that describes the properties
// that a Episode Model has
interface EpisodeModel extends mongoose.Model<EpisodeDoc> {
  build(attrs: EpisodeAttrs): EpisodeDoc;
}

// An interface that describes the properties
// that a Episode Document has
interface EpisodeDoc extends mongoose.Document {
  number: number;
}

const episodeSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
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

episodeSchema.statics.build = (attrs: EpisodeAttrs) => {
  return new Episode(attrs);
};

const Episode = mongoose.model<EpisodeDoc, EpisodeModel>('Episode', episodeSchema);

export { Episode };
