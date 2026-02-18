import { User } from "../models/user.js";
import { Traveller } from "../models/traveller.js";

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).lean();

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "Користувач не знайдений",
      });
    }

    const articles = await Traveller.find({ ownerId: id }).lean();

    res.json({
      status: 200,
      message: "Дані користувача отримано",
      data: {
        user,
        articles,
      },
    });
  } catch (error) {
    next(error);
  }
};
