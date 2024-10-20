package main

import (
	"context"
	"fmt"
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
	generateFile(pages.Photos("Photos", getImages()), "photos.html")
}

// get all the images in imgPath
func getImages() []string {
	const imgPath = "web/static/media/images/gallery/"
	var imgArr = []string{}

	files, err := os.ReadDir(imgPath)
	if err != nil {
		fmt.Printf("%s dir not found\n", imgPath)
	}
	for _, file := range files {
		/* file_split := strings.Split(file.Name(), ".") */
		imgArr = append(imgArr, file.Name())
	}
    return imgArr
}

func main() {}
