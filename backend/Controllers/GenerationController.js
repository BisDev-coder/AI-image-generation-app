import Generation from '../Models/Generation.js';

export const getUserGenerations = async (req, res) => {
  try {
    const generations = await Generation.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      generations,
    });
  } catch (error) {
    console.error('Get generations error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to get generation history',
    });
  }
};



// DELETE USER GENERATION
export const deleteUserGenerations = async (req, res) => {
  try {
    await Generation.deleteMany({
      userId: req.userId,
    });

    res.status(200).json({
      success: true,
      message: 'Generation history deleted successfully',
    });
  } catch (error) {
    console.error('Delete generations error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to delete generation history',
    });
  }
};