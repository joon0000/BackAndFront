import { ResearchRoomsInterface } from "./IResearchRoom";
import { UserInterface } from "./IUser";
import { AddOnsInterface } from "./IAddOn";
import { TimeRoomsInterface } from "./ITimeRoom";
//belong ResearchRooms
import { RoomTypesInterface } from "./IRoomType";

export interface ResearchRoomReservationRecordInterface {

  // ?ตวรจสอบว่าเป็น null ไหม หรือ ตวรจสอบว่า เป็น type ที่ตรงไหมก่อนที่จะ assignment
  ID?: number, 
  BookDate: Date | null,
  ResearchRoomID?: number,
  ResearchRoom?: ResearchRoomsInterface,
   
  UserID?: number,
  User?: UserInterface,

  AddOnID?: number,
  AddOn?: AddOnsInterface,

  TimeRoomID?: number,
  TimeRoom?: TimeRoomsInterface,

  RoomTypeID?: number,
  RoomType?: RoomTypesInterface,
}