import { UserResponse } from "./userResponse.dto";

export class userResponseLogin {
    generateJWT: string;
    findUser: UserResponse;
    findUserID: string;
}