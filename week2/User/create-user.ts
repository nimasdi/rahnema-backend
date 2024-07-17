import { User } from "./dto/user.dto"

export const createUser = (dto: User , users:User[]) => {
    users.push(dto)
}