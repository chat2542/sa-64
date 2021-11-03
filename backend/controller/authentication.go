package controller

import (
	"net/http"

	"github.com/chat2542/sa-64-example/entity"
	"github.com/chat2542/sa-64-example/service"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type LoginPayload struct {
	UserCode string `json:"userCode"`
	Password string `json:"password"`
}

/* --- Staff Response --- */
type StaffResponse struct {
	ID        uint          `json:"id"`
	Prefix    entity.Prefix `json:"prefix"`
	FirstName string        `json:"firstname"`
	LastName  string        `json:"lastname"`
	StaffCode string        `json:"staffcode"`
}

type LoginStaffResponse struct {
	Token string        `json:"token"`
	Staff StaffResponse `json:"staff"`
}

// POST /staff/login
func LoginStaff(c *gin.Context) {
	var payload LoginPayload
	var staff entity.StaffAccount

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Preload("Prefix").
		Raw("SELECT * FROM staff_accounts WHERE staff_code = ?", payload.UserCode).First(&staff); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "staff not found"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(staff.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user credentials"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(staff.StaffCode)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginStaffResponse{
		Token: signedToken,
		Staff: StaffResponse{
			ID:        staff.ID,
			Prefix:    staff.Prefix,
			FirstName: staff.FirstName,
			LastName:  staff.LastName,
			StaffCode: staff.StaffCode,
		},
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}
