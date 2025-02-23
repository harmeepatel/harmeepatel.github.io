package web

import (
	"bytes"
	"io"
	"os/exec"
	"strings"
)

func GetUploadDate(blogPath string) string {
	gitLogDates := exec.Command("git", "log", "--format=%as", blogPath)
	dateCreated := exec.Command("tail", "-1")

	r, w := io.Pipe()
	gitLogDates.Stdout = w
	dateCreated.Stdin = r

	var buf bytes.Buffer
	dateCreated.Stdout = &buf

	gitLogDates.Start()
	dateCreated.Start()
	gitLogDates.Wait()
	w.Close()
	dateCreated.Wait()

	dates := strings.Split(strings.Trim(string(buf.Bytes()), "\n"), "\n")
	return dates[len(dates)-1]
}
