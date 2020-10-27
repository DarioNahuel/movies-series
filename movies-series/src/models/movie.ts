import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Movie
interface MovieAttrs {
  title: string;
  description: string;
  rate: number;
  category: string;
}

// An interface that describes the properties
// that a Movie Model has
interface MovieModel extends mongoose.Model<MovieDoc> {
  build(attrs: MovieAttrs): MovieDoc;
}

// An interface that describes the properties
// that a Movie Document has
interface MovieDoc extends mongoose.Document {
  title: string;
  description: string;
  rate: number;
  category: string;
  actors: Array<string>;
  director: mongoose.Types.ObjectId;
}

const movieSchema = new mongoose.Schema(
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

movieSchema.statics.build = (attrs: MovieAttrs) => {
  return new Movie(attrs);
};

const Movie = mongoose.model<MovieDoc, MovieModel>('Movie', movieSchema);

export { Movie };
