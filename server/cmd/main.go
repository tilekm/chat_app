package main

import (
	"flag"
	"log"
	"server/db"
	"server/internal/user"
	"server/internal/ws"
	"server/router"
)

var (
	httpAddr = flag.String("listen", "localhost:8000", "Listen address")
)

func main() {
	flag.Parse()
	dbConn, err := db.NewDatabase()
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	userRep := user.NewRepository(dbConn.GetDB())
	userService := user.NewService(userRep)
	userHandler := user.NewHandler(userService)

	hub := ws.NewHub()
	wsHandler := ws.NewHandler(hub)

	go hub.Run()

	router.InitRouter(userHandler, wsHandler)
	router.Start(*httpAddr)
}
