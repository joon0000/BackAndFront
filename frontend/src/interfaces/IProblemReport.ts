import { UserInterface } from "./IUser";
import { ProblemInterface } from "./IProblem";
import { ReadingZoneInterface } from "./IReadingZone";
import { ToiletInterface } from "./IToilet";
import { ResearchRoomsInterface } from "./IResearchRoom";
import { ComputersInterface } from "./IComputer";
import { PlaceClassInterface } from "./IPlaceClass";

export interface ProblemReportInterface {
    ID?: number,
    USER_ID?: number,
    User?:  UserInterface,
    Problem_ID?: number,
    Problem?: ProblemInterface,
    RdZone_id?: number,
    RdZone?:  ReadingZoneInterface,
    Tlt_id?: number,
    Tlt?:  ToiletInterface,
    ReschRoom_id?: number,
    ReschRoom?:  ResearchRoomsInterface,
    Com_id?:    number,
    Com?:  ComputersInterface 
    Place_Class_ID?: number,
    Place_Class?:  PlaceClassInterface
    Comment?:    string,
    Date?:   Date|null,
  }