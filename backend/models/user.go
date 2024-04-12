package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID         uuid.UUID `gorm:"primaryKey;type:varchar(36);"`
	Email      string    `gorm:"unique;not null"`
	Password   string
	Username   string
	ProfilePic string
}

type Follow struct {
	FollowedID uuid.UUID `gorm:"primaryKey;type:varchar(36);"`
	FollowerID uuid.UUID `gorm:"primaryKey;type:varchar(36);"`
	Following  User      `gorm:"foreignKey:FollowedID;references:ID"`
	Follower   User      `gorm:"foreignKey:FollowerID;references:ID"`
}

func (user *User) BeforeCreate(db *gorm.DB) error {
	id, err := uuid.NewV7()
	if err != nil {
		return err
	}
	user.ID = id
	return nil
}
