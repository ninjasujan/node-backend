import UserModel, { IUser } from '../models/user.model';

class User {
    public getUserByEmail = async (email: string) => {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return null;
        }
        return user;
    };

    public createNewUser = async (payload: IUser) => {
        return await new UserModel({ ...payload }).save();
    };
}

export default new User();
