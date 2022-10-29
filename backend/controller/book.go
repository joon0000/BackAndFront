package controller

import (
	"net/http"

	"github.com/aamjazrk/week5/entity"
	"github.com/gin-gonic/gin"
	"fmt"
)

func CreateBook(c *gin.Context) {
	var book entity.Book
	var shelf entity.Shelf
	var book_type entity.BookType
	var user entity.User
	var role entity.Role
	//ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร book
	if err := c.ShouldBindJSON(&book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error cannot bind": err.Error()})
		return
	}
	fmt.Println("what", book.BooktypeID)
	fmt.Println("what", book.RoleID)
	//9: ค้นหา shelf ด้วย id
	if tx := entity.DB().Where("id = ?", book.ShelfID).First(&shelf); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "shelf not found"})
		return
	}
	//10: ค้นหา book_type ด้วย id
	if tx := entity.DB().Where("id = ?", book.BooktypeID).First(&book_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "book type not found"})
		return
	}
	//11: ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", book.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}
	//12: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", book.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}
	//13: สร้าง book
	cb := entity.Book{
		Shelf:    shelf,
		Booktype: book_type,
		Role:     role,
		User:     user,
		Author:   book.Author,
		Page:     book.Page,
		Quantity: book.Quantity,
		Price:    book.Price,
		Name:     book.Name,
		Date:     book.Date,
	}
	// 14: บันทึก
	if err := entity.DB().Create(&cb).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error cannot submit": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cb})
}

// GET /watchvideo/:id
func GetBook(c *gin.Context) {
	var book entity.Book
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&book); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "book not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": book})
}

// GET /books
func ListBook(c *gin.Context) {
	var books []entity.Book
	if err := entity.DB().Preload("Shelf").Preload("Role").Preload("Booktype").Preload("User").Raw("SELECT * FROM books").Find(&books).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": books})
}

// DELETE /books/:id
func DeleteBook(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM books WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "book not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /books
func UpdateBook(c *gin.Context) {
	var book entity.Book
	if err := c.ShouldBindJSON(&book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", book.ID).First(&book); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "book not found"})
		return
	}

	if err := entity.DB().Save(&book).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": book})
}
