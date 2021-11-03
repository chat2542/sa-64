package controller

import (
	"github.com/chat2542/sa-64-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /student_records
func CreateStudentRecord(c *gin.Context) {
	var prefix entity.Prefix
	var department entity.Department
	var advisor entity.Teacher
	var studentrecord entity.StudentRecord

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร studentRecord
	if err := c.ShouldBindJSON(&studentrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", studentrecord.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	// 10: ค้นหา department ด้วย id
	if tx := entity.DB().Where("id = ?", studentrecord.DepartmentID).First(&department); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "department not found"})
		return
	}

	// 11: ค้นหา advisor ด้วย id
	if tx := entity.DB().Where("id = ?", studentrecord.AdvisorID).First(&advisor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "advisor not found"})
		return
	}

	// 12: สร้าง StudentRecord
	sr := entity.StudentRecord{
		Prefix:      prefix,                    // โยงความสัมพันธ์กับ Entity Prefix
		FirstName:   studentrecord.FirstName,   // ตั้งค่าฟิลด์ FirstName
		LastName:    studentrecord.LastName,    // ตั้งค่าฟิลด์ LastName
		PersonalId:  studentrecord.PersonalId,  // ตั้งค่าฟิลด์ PersonalId
		StudentCode: studentrecord.StudentCode, // ตั้งค่าฟิลด์ StudentCode
		Department:  department,                // โยงความสัมพันธ์กับ Entity Department
		Advisor:     advisor,                   // โยงความสัมพันธ์กับ Entity Advisor
	}

	// 13: บันทึก
	if err := entity.DB().Create(&sr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": sr})
}

// GET /student_records/:id
func GetStudentRecord(c *gin.Context) {
	var studentrecord entity.StudentRecord
	id := c.Param("id")
	if err := entity.DB().Preload("Prefix").Preload("Department").Preload("Department.Faculty").Preload("Advisor").Raw("SELECT * FROM student_records WHERE id = ?", id).Find(&studentrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": studentrecord})
}

// GET /student_records
func ListStudentRecords(c *gin.Context) {
	var studentrecords []entity.StudentRecord
	if err := entity.DB().Preload("Prefix").Preload("Department").Preload("Department.Faculty").Preload("Advisor").Raw("SELECT * FROM student_records").Find(&studentrecords).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecords})
}
