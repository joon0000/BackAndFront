package main

import (
	"github.com/aamjazrk/week5/controller"
	"github.com/aamjazrk/week5/entity"

	"github.com/aamjazrk/week5/middlewares"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		{
			// shelf Routes
			router.GET("/shelves", controller.ListShelf)
			router.GET("/shelve/:id", controller.GetShelf)
			//router.GET("/shelves/:type", controller.ListShelfByBookType)
			router.POST("/shelves", controller.CreateShelf)
			router.PATCH("/shelves", controller.UpdateShelf)
			router.DELETE("/shelves/:id", controller.DeleteShelf)

			// BOOK_TYPE Routes
			router.GET("/book_types", controller.ListBookType)
			router.GET("/book_type/:id", controller.GetBookType)
			router.POST("/book_types", controller.CreateBookType)
			router.PATCH("/book_types", controller.UpdateBookType)
			router.DELETE("/book_types/:id", controller.DeleteBookType)

			// Role Routes
			router.GET("/roles", controller.ListRole)
			router.GET("/role/:id", controller.GetRole)
			router.POST("/roles", controller.CreateRole)
			router.PATCH("/roles", controller.UpdateRole)
			router.DELETE("/roles/:id", controller.DeleteRole)

			router.GET("/users", controller.ListUser)
			router.GET("/user/:id", controller.GetUser)
			router.POST("/users", controller.CreateUser)
			router.PATCH("/users", controller.UpdateUser)
			router.DELETE("/users/:id", controller.DeleteUser)

			// book Routes
			router.GET("/books", controller.ListBook)
			router.GET("/book/:id", controller.GetBook)
			router.POST("/createbooks", controller.CreateBook)
			router.PATCH("/books", controller.UpdateBook)
			router.DELETE("/books/:id", controller.DeleteBook)

			//memberClass routes
			router.GET("/memberclasses", controller.ListMemberClass)
			router.GET("/memberclass/:id", controller.GetMemberClass)
			router.POST("/memberclasses", controller.CreateMemberClass)
			router.PATCH("/memberclasses", controller.UpdateMemberclass)
			router.DELETE("/memberclasses/:id", controller.DeleteMemberClass)

			//province routes
			router.GET("/provinces", controller.ListProvince)
			router.GET("/province/:id", controller.GetProvince)
			router.POST("/provinces", controller.CreateProvince)
			router.PATCH("/provinces", controller.UpdateProvince)
			router.DELETE("/provinces/:id", controller.DeleteMemberClass)

			// Research_Room Routes
			router.GET("/researchrooms", controller.ListResearchRooms)
			router.GET("/researchroom/:id", controller.GetResearchRoom)
			router.POST("/researchrooms", controller.CreateResearchRoom)
			router.PATCH("/researchrooms", controller.UpdateResearchRoom)
			router.DELETE("/researchrooms/:id", controller.DeleteResearchRoom)

			// Room_Type Routes
			router.GET("/roomtypes", controller.ListRoomTypes)
			router.GET("/roomtype/:id", controller.GetRoomType)
			router.POST("/roomtypes", controller.CreateRoomType)
			router.PATCH("/roomtypes", controller.UpdateRoomType)
			router.DELETE("/roomtypes/:id", controller.DeleteRoomType)

			// AddOn Routes
			router.GET("/addons", controller.ListAddOns)
			router.GET("/addon/:id", controller.GetAddOn)
			router.POST("/addons", controller.CreateAddOn)
			router.PATCH("/addons", controller.UpdateAddOn)
			router.DELETE("/addons/:id", controller.DeleteAddOn)

			// Timeroom Routes
			router.GET("/timerooms", controller.ListTimes)
			router.GET("/timeroom/:id", controller.GetTime)
			router.POST("/timerooms", controller.CreateTime)
			router.PATCH("/timerooms", controller.UpdateTime)
			router.DELETE("/timerooms/:id", controller.DeleteTime)

			// Research_Room_Reservation_Record Routes
			router.GET("/researchroomreservationrecords", controller.ListResearchRoomReservationRecords)
			router.GET("/researchroomreservationrecord/:id", controller.GetResearchRoomReservationRecord)
			router.POST("researchroomreservationrecords", controller.CreateResearchRoomReservationRecord)
			router.PATCH("/researchroomreservationrecords", controller.UpdateResearchRoomReservationRecord)
			router.DELETE("/researchroomreservationrecords/:id", controller.DeleteResearchRoomReservationRecord)

			// Computer_os Routes
			router.GET("/computer_oss", controller.ListComputer_oss)
			router.GET("/computer_os/:id", controller.GetComputer_os)
			router.POST("/computer_oss", controller.CreateComputer_os)
			router.PATCH("/computer_oss", controller.UpdateComputer_os)
			router.DELETE("/computer_oss/:id", controller.DeleteComputer_os)

			// Computer_reservation Routes
			router.GET("/computer_reservations", controller.ListComputer_reservations)
			router.GET("/computer_reservation/:id", controller.GetComputer_reservation)
			// router.GET("/playlist/watched/user/:id", controller.GetPlaylistWatchedByUser)
			router.POST("/computer_reservation", controller.CreateComputer_reservation)
			router.PATCH("/computer_reservations", controller.UpdateComputer_reservation)
			router.DELETE("/computer_reservations/:id", controller.DeleteComputer_reservation)

			// Computer Routes
			router.GET("/computers", controller.ListComputers)
			router.GET("/computer/:id", controller.GetComputer)
			router.POST("/computers", controller.CreateComputer)
			router.PATCH("/computers", controller.UpdateComputer)
			router.DELETE("/computers/:id", controller.DeleteComputer)

			// Time_com Routes
			router.GET("/time_coms", controller.ListTime_coms)
			router.GET("/time_com/:id", controller.GetTime_com)
			router.POST("/time_coms", controller.CreateTime_com)
			router.PATCH("/time_coms", controller.UpdateTime_com)
			router.DELETE("/time_coms/:id", controller.DeleteTime_com)

			//-------------------------------------------------------------------------------------//xxxBorrow//---------------------------------------------------------------------------------//
			router.GET("/borrows", controller.ListBorrows)
			router.GET("/borrow/:id", controller.GetBorrows)
			router.POST("/createborrows", controller.CreateBorrow)
			router.PATCH("/borrows", controller.UpdateBorrow)
			router.DELETE("/borrows/:id", controller.DeleteBorrow)
			//-------------------------------------------------------------------------------------//xxBorrow//---------------------------------------------------------------------------------//

			//-------------------------------------------------------------------------------------//xxxBill//---------------------------------------------------------------------------------//
			//bill route
			router.GET("/bills", controller.ListBills)
			router.GET("/bill/:id", controller.GetBill)
			router.POST("/createbills", controller.CreateBill)
			//router.PATCH("/bills", controller.UpdateBill)
			//router.DELETE("/bills/:id", controller.DeleteBill)
			router.GET("/getuserByrole", controller.ListUserByrole)
			//-------------------------------------------------------------------------------------//xxxBill//---------------------------------------------------------------------------------//
		
			//-------------------------------------------------------------------------------------//xxxProblem//---------------------------------------------------------------------------------//
			router.GET("/place_classes", controller.ListPlace_Class)
			router.GET("/place_classes/:id", controller.GetPlace_Class)
			router.POST("/place_classes", controller.CreatePlace_Class)
			router.PATCH("/place_classes", controller.UpdatePlace_Class)
			router.DELETE("/place_classes/:id", controller.DeletePlace_Class)

			router.GET("/problems", controller.ListProblems)
			router.GET("/problems/:id", controller.GetProblem)
			router.POST("/problems", controller.CreateProblem)
			router.PATCH("/problems", controller.UpdateProblem)
			router.DELETE("/problems/:id", controller.DeleteProblem)

			router.GET("/problemreports", controller.ListProblemReport)
			router.GET("/problemreports/:id", controller.GetProblemReport)
			router.POST("/problemreports", controller.CreateProblemReport)
			router.PATCH("/problemreports", controller.UpdateProblemReport)
			router.DELETE("/problemreports/:id", controller.DeleteProblemReport)

			router.GET("/readingzones", controller.ListReadingZone)
			router.GET("/readingzones/:id", controller.GetReadingZone)
			router.POST("/readingzones", controller.CreateReadingZone)
			router.PATCH("/readingzones", controller.UpdateReadingZone)
			router.DELETE("/readingzones/:id", controller.DeleteReadingZone)
			

			router.GET("/toilets", controller.ListToilet)
			router.GET("/toilets/:id", controller.GetToilet)
			router.POST("/toilets", controller.CreateToilet)
			router.PATCH("/toilets", controller.UpdateToilet)
			router.DELETE("/toilets/:id", controller.DeleteToilet)
			//-------------------------------------------------------------------------------------//xxProblem//---------------------------------------------------------------------------------//
			}	
		
	}

	//Signup User Route
	r.POST("/signup", controller.CreateLoginUser)
	//login User Route
	r.POST("/login", controller.Login)

	//Run the server go run main.go
	r.Run("0.0.0.0:8080")
	//r.Run("localhost: " + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") //สำหรับใส่ ip server
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
