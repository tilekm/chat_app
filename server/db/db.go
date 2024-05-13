package db

import (
	"database/sql"
	"log"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type Database struct {
	db *sql.DB
}

func NewDatabase() (*Database, error) {
	envs, err := godotenv.Read("../.env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	database := envs["database"]
	db, err := sql.Open("postgres", database)
	if err != nil {
		return nil, err
	}

	return &Database{db: db}, nil
}

func (d *Database) Close() {
	d.db.Close()
}

func (d *Database) GetDB() *sql.DB {
	return d.db
}
