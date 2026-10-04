import mongoose from 'mongoose';

const generationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    prompt: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Generation = mongoose.model('Generation', generationSchema);

export default Generation;

// Why these three fields?

// userId
//    ↓
// Who generated it?

// prompt
//    ↓
// What did they ask the AI to generate?

// imageUrl
//    ↓
// Where is the generated image stored?

// Later we'll upload the generated image to Cloudinary and store only its URL in MongoDB.


// This is what allows:

// User A → only User A's history

// User B → only User B's history