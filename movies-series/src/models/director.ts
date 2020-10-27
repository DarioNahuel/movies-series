import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Director
interface DirectorAttrs {
  name: string;
}

// An interface that describes the properties
// that a Director Model has
interface DirectorModel extends mongoose.Model<DirectorDoc> {
  build(attrs: DirectorAttrs): DirectorDoc;
}

// An interface that describes the properties
// that a Director Document has
interface DirectorDoc extends mongoose.Document {
  name: string;
}

const directorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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

directorSchema.statics.build = (attrs: DirectorAttrs) => {
  return new Director(attrs);
};

const Director = mongoose.model<DirectorDoc, DirectorModel>('Director', directorSchema);

export { Director };
