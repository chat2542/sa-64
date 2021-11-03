package controller

import (
	"github.com/chat2542/sa-64-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /departments
func CreateDepartment(c *gin.Context) {
	var department entity.Department
	if err := c.ShouldBindJSON(&department); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&department).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusOK, gin.H{"data": department})
}

// GET /departments/:id
func GetDepartment(c *gin.Context) {
	var department entity.Department
	id := c.Param("id")
	if err := entity.DB().Preload("Faculty").Raw("SELECT * FROM departments WHERE id = ?", id).Find(&department).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": department})
}

// GET /departments/faculty/:id
func ListDepartmentByFacultyID(c *gin.Context) {
	id := c.Param("id")
	var department []entity.Department
	if err := entity.DB().Preload("Faculty").Raw("SELECT * FROM departments WHERE faculty_id = ?", id).Find(&department).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": department})
}

// GET /departments
func ListDepartments(c *gin.Context) {
	var departments []entity.Department
	if err := entity.DB().Preload("Faculty").Raw("SELECT * FROM departments").Find(&departments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": departments})
}
