package entity

import (
	"time"

	"gorm.io/gorm"
)

// type Employee struct {
// 	gorm.Model
// 	Name     string
// 	Password string
// 	Email    string `gorm:"uniqueIndex"`
// 	// 1 emp ทีได้หลาย book
// 	Books []Book `gorm:"foreignKey:EmployeeID"`
// }

type Role struct {
	gorm.Model
	Name       string
	BorrowDay  int
	BookRoomHR int
	BookComHR  int
	Books      []Book `gorm:"foreignKey:RoleID"`
	Users      []User `gorm:"foreignKey:RoleID"`
}
type BookType struct {
	gorm.Model
	Type string
	//1 book type มีได้หลาย book
	Books []Book `gorm:"foreignKey:BooktypeID"`
}

type Shelf struct {
	gorm.Model
	Type  string
	Floor uint
	//1 shelf มีได้หลาย book
	Books []Book `gorm:"foreignKey:ShelfID"`
}

type Province struct {
	gorm.Model
	Name  string
	Users []User `gorm:"foreignKey:ProvinceID"`
}

type MemberClass struct {
	gorm.Model
	Name     string
	Discount int
	Users    []User `gorm:"foreignKey:MemberClassID"`
	Bills    []Bill `gorm:"foreignKey:MemberClassID"`
}
type Book struct {
	gorm.Model
	Name string
	//ทำหน้าที่เป็น FK
	UserID     *uint
	BooktypeID *uint
	ShelfID    *uint
	RoleID     *uint
	//join ให้งายขึ้น
	User     User     `gorm:"references:id"`
	Booktype BookType `gorm:"references:id"`
	Shelf    Shelf    `gorm:"references:id"`
	Role     Role     `gorm:"references:id"`
	Author   string
	Page     int
	Quantity int
	Price    float32
	Date     time.Time
	Borrow []Borrow `gorm:"foreingnKey:Book_ID"`
	Bills    []Bill `gorm:"foreignKey:BookID"`
}

type User struct {
	gorm.Model
	Pin       string `gorm:"uniqueIndex"`
	FirstName string
	LastName  string
	Civ       string `gorm:"uniqueIndex"`
	Phone     string
	Email     string `gorm:"uniqueIndex"`
	Password  string
	Address   string
	//FK
	RoleID        *uint
	ProvinceID    *uint
	MemberClassID *uint
	//JOIN
	Province    Province    `gorm:"references:id"`
	Role        Role        `gorm:"references:id"`
	MemberClass MemberClass `gorm:"references:id"`
	Borrow []Borrow `gorm:"foreingnKey:User_ID"`
	Bills       []Bill      `gorm:"foreignKey:UserID"`
	Bill        []Bill      `gorm:"foreignKey:EmployeeID"`
	//Book        []Book      `gorm:"foreignKey:UserID`
}




//-------------------------------------------------------------------------------------//xxxresearchRoom//---------------------------------------------------------------------------------//

type RoomType struct {
	gorm.Model
	Type string
	// ResearchRoom []ResearchRoom `gorm:"foreignKey:RoomTypeID"`
}

type ResearchRoom struct {
	gorm.Model
	Name string

	RoomTypeID *uint    //FK
	RoomType   RoomType `gorm:"references:id"` //JOIN //ทำการตึง id ของ RoomType

	Place_Class_ID *uint
	Place_Class    Place_Class
	ProblemReports []ProblemReport `gorm:"foreignKey:Problem_ID"`
}

type TimeRoom struct {
	gorm.Model
	Period string
	// RRRR   []ResearchRoomReservationRecord `gorm:"foreignKey:TimeID"`
}

type AddOn struct {
	gorm.Model
	Name string
	// RRRR []ResearchRoomReservationRecord `gorm:"foreignKey:AddOnID"`
}

type ResearchRoomReservationRecord struct {
	gorm.Model
	BookDate time.Time

	UserID *uint //FK
	User   User  //JOIN

	ResearchRoomID *uint        //FK
	ResearchRoom   ResearchRoom `gorm:"references:id"`

	AddOnID *uint //FK
	AddOn   AddOn `gorm:"references:id"`

	TimeRoomID *uint    //FK
	TimeRoom   TimeRoom `gorm:"references:id"`
}

//-------------------------------------------------------------------------------------//xxresearchRoom//---------------------------------------------------------------------------------//

// -------------------------------------------------------------------------------------//xxxBill//---------------------------------------------------------------------------------//
type Bill struct { //เป็นการ get api มาจาก code จะไปอยู่ในส่วนของ front end
	gorm.Model
	//ทำหน้าที่เป็น FK
	BookID *uint
	Book   Book `gorm:"references:id"`

	//ทำหน้าที่เป็น FK
	EmployeeID *uint
	Employee   User

	//ทำหน้าที่เป็น FK
	MemberClassID *uint
	MemberClass   MemberClass `gorm:"references:id"`

	//ทำหน้าที่เป็น FK
	UserID *uint
	User   User `gorm:"references:id"`

	//join ให้งายขึ้น

	Price    float32 //uint ไม่มีเครื่องหมายติดลบ
	Discount float32
	Total    float32
	BillTime time.Time
}


//-------------------------------------------------------------------------------------//xxBill//---------------------------------------------------------------------------------//

// -------------------------------------------------------------------------------------//xxxCOMPUTER_RESERVATION//---------------------------------------------------------------------------------//
type Computer_reservation struct {
	gorm.Model
	Date time.Time

	Computer_id *uint    //FK
	Computer    Computer `gorm:"references:id"` //JOIN

	// COMPUTER_OS_ID *uint       //FK
	// COMPUTER_OS    COMPUTER_OS `gorm:"references:id"` //JOIN

	Time_com_id *uint    //FK
	Time_com    Time_com `gorm:"references:id"` //JOIN

	UserID *uint //FK
	User   User  `gorm:"references:id"` //JOIN
}

type Computer struct {
	gorm.Model
	Comp_name string
	Comp_room string

	Computer_os_id *uint       //FK
	Computer_os    Computer_os `gorm:"references:id"` //JOIN
	Place_Class_ID *uint
	Place_Class    Place_Class
	ProblemReports []ProblemReport `gorm:"foreignKey:Problem_ID"`

	// COMPUTER_RESERVATION []COMPUTER_RESERVATION `gorm:"foreignKey:COMPUTER_ID"`
}

type Computer_os struct {
	gorm.Model
	Name string
	// COMPUTER []COMPUTER `gorm:"foreignKey:COMPUTER_OS_ID"`
}

type Time_com struct {
	gorm.Model
	Time_com_period      string
	Computer_reservation []Computer_reservation `gorm:"foreignKey:Time_com_id"`
}

//-------------------------------------------------------------------------------------//xxCOMPUTER_RESERVATION//-------------------------------------------------------------//

// -------------------------------------------------------------------------------------//xxxProblem//-------------------------------------------------------------//
// ======================================
type Problem struct {
	gorm.Model
	Name string
	// 1 Problem อยู่ได้ในหลาย Relation
	// 1 Problem อยู่ได้ในหลาย Report
	ProblemReports []ProblemReport `gorm:"foreignKey:Problem_ID"`
}

// ======================================
type Place_Class struct {
	gorm.Model
	Name string

	Toilets       []Toilet       `gorm:"foreignKey:Place_Class_ID"`
	ReadingZones  []ReadingZone  `gorm:"foreignKey:Place_Class_ID"`
	ResearchRooms []ResearchRoom `gorm:"foreignKey:Place_Class_ID"`
	Computers     []Computer     `gorm:"foreignKey:Place_Class_ID"`
}


// ======================================
type Toilet struct {
	gorm.Model
	Name string
	// Place_Problem_ID ทำหน้าที่เป็น FK
	Place_Class_ID *uint
	Place_Class    Place_Class     `gorm:"references:id"`
	ProblemReports []ProblemReport `gorm:"foreignKey:Problem_ID"`
}

// ======================================
type ReadingZone struct {
	gorm.Model
	Name string
	// Place_Problem_ID ทำหน้าที่เป็น FK
	Place_Class_ID *uint
	Place_Class    Place_Class     `gorm:"references:id"`
	ProblemReports []ProblemReport `gorm:"foreignKey:Problem_ID"`
}

type ProblemReport struct {
	gorm.Model

	USER_ID *uint
	User    User `gorm:"references:id"`

	Place_Class_ID *uint
	Place_Class    Place_Class `gorm:"references:id"`

	RdZone_id *uint
	RdZone    ReadingZone `gorm:"references:id"`

	Tlt_id *uint
	Tlt    Toilet

	ReschRoom_id *uint
	ReschRoom    ResearchRoom `gorm:"references:id"`

	Com_id *uint
	Com    Computer

	Problem_ID *uint
	Problem    Problem `gorm:"references:id"`

	Comment string

	Date time.Time
}

//-------------------------------------------------------------------------------------//xxProblem//-------------------------------------------------------------//

//-------------------------------------------------------------------------------------//xxxBorrow//-------------------------------------------------------------//
type Borrow struct {
	gorm.Model

	//ทำหน้าที่เป็น FK
	RoleID *uint
	Role    Role `gorm:"references:id"`

	BookID *uint
	Book    Book `gorm:"references:id"`

	UserID *uint
	User    User `gorm:"references:id"`

	User_PIN string
	Book_Name string
	DateTime  time.Time
}
//-------------------------------------------------------------------------------------//xxBorrow//-------------------------------------------------------------//


// -------------------------------------------------------------------------------------//xxxProblem//-------------------------------------------------------------//
