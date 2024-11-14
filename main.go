package main

import (
	"context"
	"fmt"
	image "golang.org/x/image/webp"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/a-h/templ"
	"harmeepatel.dev/web/pages"
	"harmeepatel.dev/web/pages/blogs"
)

func generateFile(comp templ.Component, path string) {

	lastSlash := strings.LastIndex(path, "/")

	if lastSlash > 0 {
		dirs := path[:lastSlash]
		err := os.MkdirAll(dirs, 0760)
		if err != nil {
			log.Fatalf("failed to create dir: %s", path[:lastSlash])
		}
	}

	f, err := os.Create(path)
	defer f.Close()

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
	generateFile(pages.Photos("Photos", getImages()), "photos.html")
	generateFile(blogs.TestBlog("Test Blog"), "blogs/test_blog.html")
}

// get all the images in imgPath
func getImages() [][]pages.ImgInfo {
	const imgDirPath = "./static/media/images/gallery/"
	var smImgs = []pages.ImgInfo{}
	var lgImgs = []pages.ImgInfo{}
	var output = [][]pages.ImgInfo{}

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

		if strings.Contains(file.Name(), "@2x") {
			lgImgs = append(lgImgs, pages.ImgInfo{
				Name:   imgDirPath + file.Name(),
				Width:  width,
				Height: height,
			})
		} else {
			smImgs = append(smImgs, pages.ImgInfo{
				Name:   imgDirPath + file.Name(),
				Width:  width,
				Height: height,
			})
		}

	}

	output = append(output, smImgs)
	output = append(output, lgImgs)

	return output
}

func main() {}
