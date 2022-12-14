package controller

import (
	"net/http"

	"github.com/aamjazrk/week5/entity"
	"github.com/gin-gonic/gin"
)

// POST /time_coms
// c.ShouldBingJSON  คือ Bind ข้อมูลที่ได้จาก frontend เข้ากับ structure ของ backend
func CreateTime_com(c *gin.Context) {
	var time_com entity.Time_com
	if err := c.ShouldBindJSON(&time_com); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&time_com).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": time_com})
}

// GET /time_com/:id
// gin.Context เป็นส่วนสำคัญที่สุดของ gin มีรายละเอียดของ request, validates, จัดรูปแบบเป็น JSON
//Context.JSON ทำให้ struct เป็นรูปแบบ JSON และ response และตั้งค่า Content-Type เป็น application/json

func GetTime_com(c *gin.Context) {
	var time_com entity.Time_com
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM time_coms WHERE id = ?", id).Find(&time_com).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//เปลี่ยนข้อมูลที่มีใĀ้เป็นข้อมูลแบบ json

	c.JSON(http.StatusOK, gin.H{"data": time_com})
}

// GET /times

func ListTime_coms(c *gin.Context) {
	var time_coms []entity.Time_com
	if err := entity.DB().Raw("SELECT * FROM time_coms").Find(&time_coms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": time_coms})
}

// DELETE /time_coms/:id
func DeleteTime_com(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM time_coms WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "time_com not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /time_coms

func UpdateTime_com(c *gin.Context) {
	var time_com entity.Time_com
	if err := c.ShouldBindJSON(&time_com); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", time_com.ID).First(&time_com); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "time not found"})
		return
	}

	if err := entity.DB().Save(&time_com).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": time_com})
}
