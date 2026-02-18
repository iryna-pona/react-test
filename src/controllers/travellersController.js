import { Traveller } from "../models/user.js";

export const getTravellers = async (req, res, next) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    const [travellers, total] = await Promise.all([
      Traveller.find()
        .sort({ articlesAmount: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Traveller.countDocuments(),
    ]);

    res.json({
      status: 200,
      message: "Список мандрівників успішно отримано",
      data: travellers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    next(error);
  }
};