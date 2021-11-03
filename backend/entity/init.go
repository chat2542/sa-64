package entity

import (
	"golang.org/x/crypto/bcrypt"
)

var State = map[string]bool{
	"Staff":   false,
	"Teacher": false,
	"Student": false,
}

// Prefix data
var mister = Prefix{
	Value: "นาย",
}
var mistress = Prefix{
	Value: "นาง",
}
var miss = Prefix{
	Value: "นางสาว",
}

// Generate Password
func SetupPassword(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

// Staff data
var admin01 = StaffAccount{
	PrefixID:  &mister.ID,
	FirstName: "กอเอ้ย",
	LastName:  "กอไก่",
	StaffCode: "admin01",
	Password:  SetupPassword("admin"),
}
var admin02 = StaffAccount{
	PrefixID:  &miss.ID,
	FirstName: "ขอไข่",
	LastName:  "ในเล้า",
	StaffCode: "admin02",
	Password:  SetupPassword("admin"),
}

func Init_Staff() {
	// Prefix
	db.Model(&Prefix{}).Create(&mister)
	db.Model(&Prefix{}).Create(&mistress)
	db.Model(&Prefix{}).Create(&miss)

	// StaffAccount
	db.Model(&StaffAccount{}).Create(&admin01)
	db.Model(&StaffAccount{}).Create(&admin02)

	State["Staff"] = true
}

// Faculty data
var faculty_engineer = Faculty{
	Name: "วิศวกรรม",
}

// Department data
var department_cpe = Department{
	Name:      "วิศวกรรมคอมพิวเตอร์",
	FacultyID: &faculty_engineer.ID,
}

// TeacherRecord data
var teacher_AA = Teacher{
	TeacherName:  "AA",
	TeacherEmail: "AA@g.sut.ac.th",
	ProfessorID:  "11111111",
	Password:     SetupPassword("123456"),
	DepartmentID: &department_cpe.ID,
}
var teacher_BB = Teacher{
	TeacherName:  "BB",
	ProfessorID:  "22222222",
	TeacherEmail: "BB@g.sut.ac.th",
	Password:     SetupPassword("123456"),
	DepartmentID: &department_cpe.ID,
}

func Init_Teacher() {
	// Faculty data
	db.Model(&Faculty{}).Create(&faculty_engineer)

	// Department data
	db.Model(&Department{}).Create(&department_cpe)

	// TeacherRecord
	db.Model(&Teacher{}).Create(&teacher_AA)
	db.Model(&Teacher{}).Create(&teacher_BB)

	State["Teacher"] = true
}

// StudentRecord data
var student_B6200001 = StudentRecord{
	PrefixID:     &mister.ID,
	FirstName:    "เด็กดี",
	LastName:     "มาเรียน",
	PersonalId:   "123xx688xxxxx",
	StudentCode:  "B6200001",
	Password:     SetupPassword("B6200001"),
	DepartmentID: &department_cpe.ID,
	AdvisorID:    &teacher_AA.ID,
	CreatorID:    &admin01.ID,
}
var student_B6200002 = StudentRecord{
	PrefixID:     &miss.ID,
	FirstName:    "เด็กขยัน",
	LastName:     "ใจดี",
	PersonalId:   "0000000000000",
	StudentCode:  "B6200002",
	Password:     SetupPassword("B6200002"),
	DepartmentID: &department_cpe.ID,
	AdvisorID:    &teacher_BB.ID,
	CreatorID:    &admin02.ID,
}

func Init_Student() {
	// StaffAccount
	if !State["Staff"] {
		Init_Staff()
	}

	// TeacherRecord
	if !State["Teacher"] {
		Init_Teacher()
	}

	// StudentRecord
	db.Model(&StudentRecord{}).Create(&student_B6200001)
	db.Model(&StudentRecord{}).Create(&student_B6200002)

	State["Student"] = true
}
