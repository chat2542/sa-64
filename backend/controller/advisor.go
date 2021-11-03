package controller

import (
	"github.com/chat2542/sa-64-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /advisors
func CreateAdvisor(c *gin.Context) {
	var advisor entity.Teacher
		if err := c.ShouldBindJSON(&advisor); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := entity.DB().Create(&advisor).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
		c.JSON(http.StatusOK, gin.H{"data": advisor})
}

// GET /advisors/:id
func GetAdvisor(c *gin.Context) {
	var advisor entity.Teacher
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM advisors WHERE id = ?",id).Find(&advisor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": advisor})
}

// GET /advisors
func ListAdvisors(c *gin.Context) {
	var advisors []entity.Teacher
	if err := entity.DB().Raw("SELECT * FROM advisors").Find(&advisors).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": advisors})
}