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
	envs, err := godotenv.Read(".env")

	if err != nil {
		log.Fatal("Error loading .env file", err)
	}

	database := envs["DATABASE"]
	user := envs["USERNAME"]
	password := envs["PASSWORD"]
	host := envs["HOST"]
	port := envs["PORT"]
	dbName := envs["DBNAME"]
	db, err := sql.Open("postgres", database+"://"+user+":"+password+"@"+host+":"+port+"/"+dbName+"?sslmode=disable")
	if err != nil {
		log.Fatal("Error connecting to database", err)
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
