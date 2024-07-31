package main

import (
	"log"
	"os"
	"harmeepatel.dev/app"
)

const ARG_PORT_VAR = 1

func main() {
	PORT := os.Args[ARG_PORT_VAR]

	log.Println("Listening on: " + PORT)
	log.Println("pid         :", os.Getpid())


	mainServer := app.NewApp(PORT)
	mainServer.InitStaticServer()
	mainServer.InitRoutes()
	mainServer.Run()
}
