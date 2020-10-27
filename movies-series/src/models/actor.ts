import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Actor
interface ActorAttrs {
  name: string;
}

// An interface that describes the properties
// that a Actor Model has
interface ActorModel extends mongoose.Model<ActorDoc> {
  build(attrs: ActorAttrs): ActorDoc;
}

// An interface that describes the properties
// that a Actor Document has
interface ActorDoc extends mongoose.Document {
  name: string;
}

const actorSchema = new mongoose.Schema(
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

actorSchema.statics.build = (attrs: ActorAttrs) => {
  return new Actor(attrs);
};

const Actor = mongoose.model<ActorDoc, ActorModel>('Actor', actorSchema);

export { Actor };
