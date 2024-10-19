package main

import (
	"context"
	"log"
	"os"

	"github.com/a-h/templ"
	"harmeepatel.dev/web/pages"
)

func generateFile(comp templ.Component, file string) {
	f, err := os.Create(file)
	if err != nil {
		log.Fatalf("failed to create output file: %v", err)
	}

	err = comp.Render(context.Background(), f)
	if err != nil {
		log.Fatalf("failed to write output file: %v", err)
	}
}

func init() {
	if err := os.MkdirAll("dist", os.ModePerm); err != nil {
		log.Fatalf("failed to create output directory: %v", err)
	}

	generateFile(pages.Index("HarmeePatel"), "index.html")
	generateFile(pages.Blog("Blog"), "blog.html")
	generateFile(pages.Photos("Photos"), "photos.html")
}

func main() {}
