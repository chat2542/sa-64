package controller

import (
	"github.com/chat2542/sa-64-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /faculties
func CreateFaculty(c *gin.Context) {
	var faculty entity.Faculty
	if err := c.ShouldBindJSON(&faculty); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&faculty).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusOK, gin.H{"data": faculty})
}

// GET /faculty/:id
func GetFaculty(c *gin.Context) {
	var faculty entity.Faculty
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM faculties WHERE id = ?", id).Find(&faculty).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": faculty})
}

// GET /faculties
func ListFaculties(c *gin.Context) {
	var faculties []entity.Faculty
	if err := entity.DB().Raw("SELECT * FROM faculties").Find(&faculties).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": faculties})
}