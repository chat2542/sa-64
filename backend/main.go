package main

import (
	"github.com/chat2542/sa-64-example/controller"

	"github.com/chat2542/sa-64-example/entity"

	"github.com/chat2542/sa-64-example/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// Student Record subsystem
			protected.POST("/prefixes", controller.CreatePrefix)
			protected.GET("/prefix/:id", controller.GetPrefix)
			protected.GET("/prefixes", controller.ListPrefixes)

			protected.POST("/departments", controller.CreateDepartment)
			protected.GET("/departments/faculty/:id", controller.ListDepartmentByFacultyID)
			protected.GET("/departments", controller.ListDepartments)

			protected.POST("/faculties", controller.CreateFaculty)
			protected.GET("/faculty/:id", controller.GetFaculty)
			protected.GET("/faculties", controller.ListFaculties)

			protected.POST("/student_records", controller.CreateStudentRecord)
			protected.GET("/student_records/:id", controller.GetStudentRecord)
			protected.GET("/student_records", controller.ListStudentRecords)
		}
	}

	// Run the server
	r.POST("/staff/login", controller.LoginStaff)
	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
