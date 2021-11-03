import {FacultyInterface} from "./IFaculty"
import {DepartmentInterface} from "./IDepartment"
import {AdvisorInterface} from "./IAdvisor"
import {LoginInterface} from "./ILogin"

export interface StudentRecordInterface {

    ID: number,
    Prefix :string,
    FirstName: string,
    LastName: string,
    PersonalId: number,
    Code: string,
    
    LoginID: number,
    Login: LoginInterface,
    
    DepartmentID: number,
    Department: DepartmentInterface,

    AdvisorID: number,
    Advisor: AdvisorInterface,
}