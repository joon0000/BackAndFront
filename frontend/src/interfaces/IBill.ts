import { BookInterface } from "./IBook";
import { MemberClassesInterface } from "./IMemberClass";
import { UserInterface } from "./IUser";

export interface BillInterface { // ?ตวรจสอบว่าเป็น null ไหม หรือ ตวรจสอบว่า เป็น type ที่ตรงไหมก่อนที่จะ assignment
    ID?: number;

    BookID?: number; //
    Book?: BookInterface; //

    EmployeeID?: number;//
    Employee?: UserInterface; //

    UserID?: number;//
    User?: UserInterface; //

    Discount?: number;//

    Total?: number; //
    
    BillTime?: Date | null;  //

    MemberClassID?: number;
    MemberClass?: MemberClassesInterface; 
    
    Price?: number; 
    

}