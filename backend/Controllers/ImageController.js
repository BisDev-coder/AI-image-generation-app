// Create the Image Controller

// Now we're going to move the image-generation logic out of Server.js and into a proper controller.

// This will eventually handle:

// Request
//   ↓
// Check logged-in user
//   ↓
// Hugging Face generates image
//   ↓
// Upload image to Cloudinary
//   ↓
// Save prompt + image URL + userId to MongoDB
//   ↓
// Return image to frontend


import { InferenceClient } from '@huggingface/inference';
import cloudinary from '../Config/cloudinary.js';
import Generation from '../Models/Generation.js';

const hf = new InferenceClient(process.env.HF_TOKEN);

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required',
      });
    }

    console.log('Generating image for user:', req.userId);
    console.log('Prompt:', prompt);

    const image = await hf.textToImage({
      model: 'black-forest-labs/FLUX.1-schnell',
      inputs: prompt,
    });

    const imageBuffer = Buffer.from(await image.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'visionforge/generations',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(imageBuffer);
    });
//     What just happened?
// HF Blob
//   ↓
// arrayBuffer()
//   ↓
// Buffer
//   ↓
// Cloudinary upload_stream()
//   ↓
// Cloudinary image

// uploadResult will contain information from Cloudinary, including the important:

// uploadResult.secure_url

// which we'll save in MongoDB in the next step.
const generation = await Generation.create({
  userId: req.userId,
  prompt,
  imageUrl: uploadResult.secure_url,
});
res.status(201).json({
  success: true,
  message: 'Image generated successfully',
  generation: {
    id: generation._id,
    prompt: generation.prompt,
    imageUrl: generation.imageUrl,
    createdAt: generation.createdAt,
  },
});

  } catch (error) {
    console.error('Image generation error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Image generation failed',
    });
  }
};



// Our data flow is now complete
// Logged-in user
//       ↓
// req.userId
//       ↓
// Hugging Face
//       ↓
// Image Buffer
//       ↓
// Cloudinary
//       ↓
// secure_url
//       ↓
// MongoDB
//       ↓
// Generation document



// For example, MongoDB will store:

// userId:    68abc...
// prompt:    "A futuristic city at sunset"
// imageUrl:  "https://res.cloudinary.com/..."
// createdAt: ...

// Important: We're storing the image in Cloudinary, not MongoDB. That's the right architecture for this application.