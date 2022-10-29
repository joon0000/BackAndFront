package controller
import (
	"net/http"
	"github.com/aamjazrk/week5/entity"
	"github.com/gin-gonic/gin"
)

func CreateBorrow(c *gin.Context) {
	var Borrow entity.Borrow
	var Book entity.Book
	//var memberclass entity.MemberClass
	var User entity.User
	var Role entity.Role

	//ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Borrow
	if err := c.ShouldBindJSON(&Borrow); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", Borrow.UserID).First(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not  found"})
		return
	}
	
	
	// ค้นหา Book ด้วย id
	if tx := entity.DB().Where("id = ?", Borrow.BookID).First(&Book); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not  found"})
		return
	}
	// ค้นหา Role ด้วย id
	if tx := entity.DB().Where("id = ?", Borrow.RoleID).First(&Role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not  found"})
		
		return
	}
	if tx := entity.DB().Where("id = ? AND role_id = ?",  Borrow.BookID,Borrow.RoleID).First(&Book); tx.RowsAffected == 0{
		c.JSON(http.StatusBadRequest, gin.H{"error": "user role and book role are not match!"})
		return
	}
	// สร้าง borrow
	cb := entity.Borrow{
		RoleID: 	Book.RoleID,      
		User:  		User,          
		User_PIN:  	User.Pin,
		Book:		Book, 
		Book_Name:	Book.Name,       
		DateTime: 	Borrow.DateTime, 
	}
	
	// 14: บันทึก
	if err := entity.DB().Create(&cb).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cb})
}

// GET /borrows /:id
func GetBorrows(c *gin.Context) {
	var Borrow entity.Borrow
	id := c.Param("id")
	if err := entity.DB().Preload("Book").Preload("User").Preload("Role").Raw("SELECT * FROM borrows WHERE id = ?", id).Find(&Borrow).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Borrow})

}

// GET /borrows

func ListBorrows(c *gin.Context) {
	var Borrows []entity.Borrow
	if err := entity.DB().Preload("Book").Preload("User").Preload("Role").Raw("SELECT * FROM borrows").Find(&Borrows).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Borrows})
}

// DELETE /borrows /:id
func DeleteBorrow(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM borrow WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}



// PATCH /Borrows
func UpdateBorrow(c *gin.Context) {
	var borrow entity.Borrow
	if err := c.ShouldBindJSON(&borrow); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", borrow.ID).First(&borrow); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "borrow not found"})
		return
	}

	if err := entity.DB().Save(&borrow).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": borrow})
}

