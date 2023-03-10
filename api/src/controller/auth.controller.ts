import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import UserService from '../services/user.service';
import { IUser } from '../types/user.type.';
import MailController from './mail.controller';

dotenv.config();

const userService = new UserService();
const mailController = new MailController();

class AuthController {
	private generateAccessToken = (email: string, password: string) => {
		return jwt.sign({ email, password }, String(process.env.JWT_ACCESS_TOKEN), {
			expiresIn: '1h',
		});
	};

	public signUp = async (req: Request, res: Response) => {
		const encryptPassword = await bcrypt.hash(req.body.password, 10);

		const newUser: IUser = {
			username: req.body.username,
			email: req.body.email,
			password: encryptPassword,
			shop: req.body.shop,
		};

		try {
			const user = await userService.createOne(newUser);
			const token = this.generateAccessToken(newUser.email, newUser.password);
			mailController.sendWelcomeMail(req.body.email);
			return res.status(201).json({acessToken: token, user });
		} catch (err: any) {
			return res.status(401).json('Unauthorize');
		}
	};

	public signIn = async (req: Request, res: Response) => {
		const { email, password } = req.body;
		try {
			const userInDB = await userService.findOneByEmail(email);

			if (!userInDB) {
				return res.status(401).send('user not found');
			}

			const compare = await bcrypt.compare(password, userInDB.password);

			if (!compare) {
				return res.status(401).send('invalid credentials');
			}

			const token = this.generateAccessToken(email, password);
			return res.status(200).json({ acessToken: token });
		} catch (err) {
			return res.status(401).json('Unauthorize');
		}
	};
}

export default AuthController;
