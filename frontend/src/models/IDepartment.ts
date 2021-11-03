import {FacultyInterface} from "./IFaculty"
export interface DepartmentInterface {
    ID : number,
    Name: string,
    
    FacultyID: number,
    Faculty : FacultyInterface ,
}