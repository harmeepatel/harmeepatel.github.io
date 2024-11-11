package main

import (
	"context"
	"fmt"
	image "golang.org/x/image/webp"
	"log"
	"os"
	"path/filepath"

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
	generateFile(pages.Index("HarmeePatel"), "index.html")
	generateFile(pages.Blog("Blog"), "blog.html")
	generateFile(pages.Photos("Photos", getImages()), "photos.html")
}

// get all the images in imgPath
func getImages() []pages.ImgInfo {
	const imgDirPath = "./static/media/images/gallery/"
	var imgArr = []pages.ImgInfo{}

	files, err := os.ReadDir(imgDirPath)
	if err != nil {
		fmt.Printf("%s dir not found\n", imgDirPath)
	}
	for _, file := range files {
		var width, height int
		if file.Name() == ".DS_Store" {
			continue
		}

		if reader, err := os.Open(filepath.Join(imgDirPath, file.Name())); err == nil {
			defer reader.Close()
			im, err := image.DecodeConfig(reader)
			if err != nil {
				log.Fatalf("%s: %v\n", file.Name(), err)
			}
			width = im.Width
			height = im.Height
		} else {
			log.Fatalf("Impossible to open the file: ", err)
		}

		imgArr = append(imgArr, pages.ImgInfo{
			Name:   imgDirPath + file.Name(),
			Width:  width,
			Height: height,
		})
	}
	return imgArr
}

func main() {}
