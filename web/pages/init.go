package pages

import "log"

type BlogInfo struct {
	Func interface{}
	Tags []string
}

func init() {
	log.Println("init pages")
}
