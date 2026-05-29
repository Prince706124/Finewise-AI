import Category from "../Models/Category.js";

// CREATE CATEGORY
export const addCategory = async (req, res) => {
  try {
    const { title, type, limit, icon } = req.body;

    const category = await Category.create({
      title,

      type,

      limit,

      icon,

      user: req.user._id,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      user: req.user._id,
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // OWNER CHECK
    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await category.deleteOne();

    res.status(200).json({
      message: "Category deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const { title, type, limit, icon } = req.body;

    const category = await Category.findById(req.params.id);

    // CATEGORY NOT FOUND
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // OWNER CHECK
    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // UPDATE FIELDS
    category.title = title;

    category.type = type;

    category.limit = limit;

    category.icon = icon;

    // SAVE
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
