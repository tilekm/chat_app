package db

import (
	"database/sql"

	_ "github.com/lib/pq"
	"github.com/joho/godotenv"
)

type Database struct {
	db *sql.DB
}

func NewDatabase() (*Database, error) {
	envs, err := godotenv.Read(".env")

    if err != nil {
        log.Fatal("Error loading .env file")
    }

    databse := envs["database"]
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
