import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./schema/user.schema").User>;
    remove(id: string): Promise<void>;
}
