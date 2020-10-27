import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Serie
interface SerieAttrs {
  title: string;
  description: string;
  rate: number;
  category: string;
}

// An interface that describes the properties
// that a Serie Model has
interface SerieModel extends mongoose.Model<SerieDoc> {
  build(attrs: SerieAttrs): SerieDoc;
}

// An interface that describes the properties
// that a Serie Document has
interface SerieDoc extends mongoose.Document {
  title: string;
  description: string;
  rate: number;
  category: string;
  actors: Array<mongoose.Types.ObjectId>;
  director: mongoose.Types.ObjectId;
  seasons: Array<mongoose.Types.ObjectId>;
}

const serieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    actors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor" 
    }],
    director: { 
      type: mongoose.Schema.Types.ObjectId, ref: "Director"
    },
    seasons: [{
      type: mongoose.Schema.Types.ObjectId, ref: "Season"
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

serieSchema.statics.build = (attrs: SerieAttrs) => {
  return new Serie(attrs);
};

const Serie = mongoose.model<SerieDoc, SerieModel>('Serie', serieSchema);

export { Serie };
