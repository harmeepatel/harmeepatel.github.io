package handler

import (
	"net/http"

	"github.com/a-h/templ"
	"harmeepatel.dev/web/pages"
)

func Index() http.Handler {
	index := pages.Index("title")
	return templ.Handler(index)
}
