package main

import (
	"context"
	"log"
	"os"

	"harmeepatel.dev/web/pages"
)

func init() {
	if err := os.MkdirAll("dist", os.ModePerm); err != nil {
		log.Fatalf("failed to create output directory: %v", err)
	}

	f, err := os.Create("index.html")
	if err != nil {
		log.Fatalf("failed to create output file: %v", err)
	}

	err = pages.Index("harmeepatel").Render(context.Background(), f)
	if err != nil {
		log.Fatalf("failed to write output file: %v", err)
	}
}

func main() {}
