import { EmployeesInterface } from "./IEmployee";
import { RolesInterface } from "./IRole";
import { BookInterface } from "./IBook";
import { UserInterface } from "./IUser";
export interface BorrowInterface{
    ID?: number,

    RoleID?: number ;
    Role?: RolesInterface;

    UserID?: number,
    User?: UserInterface,

    BookID?: number,
    Book?: BookInterface,
    DateTime?: Date | null;
}