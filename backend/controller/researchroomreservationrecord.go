package controller

import (
	"net/http"

	"github.com/aamjazrk/week5/entity"
	"github.com/gin-gonic/gin"
)

// POST /researchroomreservationrecords
func CreateResearchRoomReservationRecord(c *gin.Context) {

	var researchroomreservationrecord entity.ResearchRoomReservationRecord
	var researchroom entity.ResearchRoom
	var user entity.User
	var addon entity.AddOn
	var timeroom entity.TimeRoom

	//ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร researchRoomReservationRecord
	//รับค่ามาจาก body ก่อน
	//Bind ข้อมูลจาก frontend เข้ากับ structure ของ backend
	if err := c.ShouldBindJSON(&researchroomreservationrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา ResearchRoom ด้วย id
	//if กำหนดค่าตัวแปร tx ก่อนจะทำการเช็คเงื่อนไขที่ tx.RowsAffected												// returns found records count, equals `len(users)`
	if tx := entity.DB().Where("id = ?", researchroomreservationrecord.ResearchRoomID).First(&researchroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "research room not found"})
		return
	}

	// 10: ค้นหา User ด้วย id
	if tx := entity.DB().Where("id = ?", researchroomreservationrecord.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// 11: ค้นหา AddOn ด้วย id
	if tx := entity.DB().Where("id = ?", researchroomreservationrecord.AddOnID).First(&addon); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "add-on not found"})
		return
	}

	// 12: ค้นหา Time ด้วย id
	if tx := entity.DB().Where("id = ?", researchroomreservationrecord.TimeRoomID).First(&timeroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "time not found"})
		return
	}

	//ตวรจว่า ชื่อห้อง เวลา ตรงกันหรือไม่ตามใน DB ไหม
	if tx := entity.DB().Where("research_room_id= ? AND time_room_id = ?", researchroomreservationrecord.ResearchRoomID, researchroomreservationrecord.TimeRoomID).First(&researchroomreservationrecord); tx.RowsAffected != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "research room id and time room id are not match"})
		return
	}

	// 13: สร้าง researchRoomReservationRecord
	RRRR := entity.ResearchRoomReservationRecord{
		ResearchRoom: researchroom,                           // โยงความสัมพันธ์กับ Entity ResearchRoom
		User:         user,                                   // โยงความสัมพันธ์กับ Entity User
		AddOn:        addon,                                  // โยงความสัมพันธ์กับ Entity AddOn
		TimeRoom:     timeroom,                               // โยงความสัมพันธ์กับ Entity TimeRoom
		BookDate:     researchroomreservationrecord.BookDate, // ตั้งค่าฟิลด์ researchroomreservationrecord.BookDat
	}

	// 14: บันทึกตารางหลัก(ResearchRoomReservationRecord)
	if err := entity.DB().Create(&RRRR).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": RRRR})
}

// GET /researchroomreservationrecord/:id
func GetResearchRoomReservationRecord(c *gin.Context) {
	var researchroomreservationrecord entity.ResearchRoomReservationRecord
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&researchroomreservationrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "researchroomreservationrecord not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": researchroomreservationrecord})
}

// GET /researchroomreservationrecords
func ListResearchRoomReservationRecords(c *gin.Context) {
	var researchroomreservationrecords []entity.ResearchRoomReservationRecord
	if err := entity.DB().Preload("ResearchRoom").Preload("ResearchRoom.RoomType").Preload("User").Preload("AddOn").Preload("TimeRoom").Raw("SELECT * FROM research_room_reservation_records").Find(&researchroomreservationrecords).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": researchroomreservationrecords})
}

// DELETE /researchroomreservationrecords/:id
func DeleteResearchRoomReservationRecord(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM research_room_reservation_records WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "researchroomreservationrecord not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /researchroomreservationrecords
func UpdateResearchRoomReservationRecord(c *gin.Context) {
	var researchroomreservationrecord entity.ResearchRoomReservationRecord
	if err := c.ShouldBindJSON(&researchroomreservationrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", researchroomreservationrecord.ID).First(&researchroomreservationrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "researchroomreservationrecord not found"})
		return
	}
	if err := entity.DB().Save(&researchroomreservationrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": researchroomreservationrecord})
}
