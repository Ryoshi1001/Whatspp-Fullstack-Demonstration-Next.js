import getPrismaInstance from '../utils/PrismaClient.js';

//checkuser controller for login on login page
export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.json({ msg: 'Email is required', status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.json({ msg: 'User not found', status: false });
    } else {
      return res.json({ msg: 'User found', status: true, data: user });
    }
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};
