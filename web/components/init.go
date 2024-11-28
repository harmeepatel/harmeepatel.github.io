package components;

import (
    "log"
    "strings"
    "golang.org/x/text/cases"
    "golang.org/x/text/language"
)

func init() {
    log.Println("init components")
}

var caser = cases.Title(language.English)
func FixTitle(title string) string {
    articles := []string{ "a", "and", "as", "at", "but", "by", "down", "for", "from", "if", "in", "into", "like", "near", "nor", "of", "off ", "on", "once", "onto", "or", "over", "past", "so", "than", "that", "to", "upon", "when", "with", "yet", } 
    var s strings.Builder
    word: 
        for _, word := range strings.Split(title, "_") {
            for _, a := range articles {
                if word == a {
                    s.WriteString(word)
                    s.WriteString(" ")
                    continue word
                }
            }
            s.WriteString(caser.String(word))
            s.WriteString(" ")
        }
	return s.String()
}

func TitleCase(str string) string {
    return caser.String(str)
}
