package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	database.AutoMigrate(
		// Student Record subsystem
		&Prefix{},
		&Faculty{},
		&Department{},
		&Teacher{},
		&StudentRecord{},
	)
	
	db = database

	// เตรียมข้อมูลสำหรับระบบย่อย
	Init_Staff()
	Init_Teacher()
	Init_Student()
}