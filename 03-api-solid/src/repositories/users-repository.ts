import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
    findByemail(email:string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
}

