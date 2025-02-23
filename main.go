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
	pages "harmeepatel.dev/web/pages"
	blogs "harmeepatel.dev/web/pages/blogs"
)

func generateFile(template templ.Component, path string) {
	f, err := os.Create(path)
	defer f.Close()
	if err != nil {
		log.Fatalf("failed to create output file: %v", err)
	}

	err = template.Render(context.Background(), f)
	if err != nil {
		log.Fatalf("failed to write output file: %v", err)
	}
}

var blogList = map[string]pages.BlogInfo{
	"automating_templ_generate_in_neovim": {
		Func: blogs.AutomatingTemplGenerateInNeovim,
		Tags: []string{"neovim", "text-editor", "automation"},
	},
}

func init() {
	generateFile(pages.Index("HarmeePatel"), "index.html")
	generateFile(pages.Blog("Blog", blogList), "blog.html")
	generateFile(pages.Photos("Photos", getImages()), "photos.html")

	for bName, bInfo := range blogList {
		switch bName {
		default:
			generateFile(bInfo.Func.(func(string, []string) templ.Component)(bName, bInfo.Tags), "blog/"+bName+".html")
		}
	}
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
			log.Fatal("Impossible to open the file: ", err)
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
