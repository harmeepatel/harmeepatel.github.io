// Code generated by templ - DO NOT EDIT.

// templ: version: v0.2.771
package pages

//lint:file-ignore SA4006 This context is only used if a nested component is present.

import "github.com/a-h/templ"
import templruntime "github.com/a-h/templ/runtime"

import (
	"harmeepatel.dev/web/layouts"
	"log"
	"strconv"
	"strings"
)

const imgPath = "./static/media/images/gallery/"

func genPhotoId(s string) string {
	before, found := strings.CutSuffix(s, ".webp")
	if !found {
		log.Fatal("prefix not found")
	}
	return before
}

// "harmeepatel.dev/web/components"
func Photos(title string, photos []string) templ.Component {
	return templruntime.GeneratedTemplate(func(templ_7745c5c3_Input templruntime.GeneratedComponentInput) (templ_7745c5c3_Err error) {
		templ_7745c5c3_W, ctx := templ_7745c5c3_Input.Writer, templ_7745c5c3_Input.Context
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templruntime.GetBuffer(templ_7745c5c3_W)
		if !templ_7745c5c3_IsBuffer {
			defer func() {
				templ_7745c5c3_BufErr := templruntime.ReleaseBuffer(templ_7745c5c3_Buffer)
				if templ_7745c5c3_Err == nil {
					templ_7745c5c3_Err = templ_7745c5c3_BufErr
				}
			}()
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var1 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var1 == nil {
			templ_7745c5c3_Var1 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		templ_7745c5c3_Var2 := templruntime.GeneratedTemplate(func(templ_7745c5c3_Input templruntime.GeneratedComponentInput) (templ_7745c5c3_Err error) {
			templ_7745c5c3_W, ctx := templ_7745c5c3_Input.Writer, templ_7745c5c3_Input.Context
			templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templruntime.GetBuffer(templ_7745c5c3_W)
			if !templ_7745c5c3_IsBuffer {
				defer func() {
					templ_7745c5c3_BufErr := templruntime.ReleaseBuffer(templ_7745c5c3_Buffer)
					if templ_7745c5c3_Err == nil {
						templ_7745c5c3_Err = templ_7745c5c3_BufErr
					}
				}()
			}
			ctx = templ.InitializeContext(ctx)
			_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("<dialog id=\"image_modal\" class=\"h-screen bg-transparent backdrop:bg-black/90 dark:backdrop:bg-black/20 backdrop:backdrop-blur-lg\"><form method=\"dialog\"><button class=\"w-8 h-8 ring-2 ring-white hover:bg-gray-600 duration-100 rounded-full text-white fixed right-4 top-4 md:right-8 md:top-8 unselectable\">✕</button></form><div class=\"h-full flex\"><button id=\"dialog-arrow-left\" class=\"h-fit self-center\" onclick=\"leftImage()\"><svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"3\" stroke=\"white\" class=\"size-5 md:size-7\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18\"></path></svg></button> <img id=\"modal_image\" class=\"mx-8 border-8 border-white\" src=\"\"> <button id=\"dialog-arrow-right\" class=\"h-fit self-center\" onclick=\"rightImage()\"><svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"3\" stroke=\"white\" class=\"size-5 md:size-7\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3\"></path></svg></button></div></dialog><main id=\"photos\" class=\"h-vh mx-6 md:mx-14 3xl:mx-0 mt-[-0.3rem] md:mt-[0.8rem] lg:mt-[0.5rem]\"><div id=\"image-grid\" class=\"flex flex-wrap\">")
			if templ_7745c5c3_Err != nil {
				return templ_7745c5c3_Err
			}
			for i := range [4]int{} {
				_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("<div class=\"column px-[4px] sm:flex-[100%] sm:max-w-full md:flex-[50%] md:max-w[50%] lg:flex-[33.33%] lg:max-w-[33.33%] 2xl:flex-[25%] 2xl:max-w-[25%]\">")
				if templ_7745c5c3_Err != nil {
					return templ_7745c5c3_Err
				}
				for j := i; j < len(photos); j += 4 {
					_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("<img id=\"")
					if templ_7745c5c3_Err != nil {
						return templ_7745c5c3_Err
					}
					var templ_7745c5c3_Var3 string
					templ_7745c5c3_Var3, templ_7745c5c3_Err = templ.JoinStringErrs(strconv.Itoa(j) + "-" + genPhotoId(photos[j]))
					if templ_7745c5c3_Err != nil {
						return templ.Error{Err: templ_7745c5c3_Err, FileName: `web/pages/photos.templ`, Line: 47, Col: 54}
					}
					_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString(templ.EscapeString(templ_7745c5c3_Var3))
					if templ_7745c5c3_Err != nil {
						return templ_7745c5c3_Err
					}
					_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("\" src=\"")
					if templ_7745c5c3_Err != nil {
						return templ_7745c5c3_Err
					}
					var templ_7745c5c3_Var4 string
					templ_7745c5c3_Var4, templ_7745c5c3_Err = templ.JoinStringErrs(imgPath + photos[j])
					if templ_7745c5c3_Err != nil {
						return templ.Error{Err: templ_7745c5c3_Err, FileName: `web/pages/photos.templ`, Line: 48, Col: 33}
					}
					_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString(templ.EscapeString(templ_7745c5c3_Var4))
					if templ_7745c5c3_Err != nil {
						return templ_7745c5c3_Err
					}
					_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("\" class=\"mt-[8px] align-middle w-full rounded-[8px] md:hover:duration-300 md:hover:translate-y-2 md:hover:shadow-[0_16px_70px_4px_rgba(0,0,0,0.56)] md:hover:scale-110\" onclick=\"openImageModal(this)\">")
					if templ_7745c5c3_Err != nil {
						return templ_7745c5c3_Err
					}
				}
				_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("</div>")
				if templ_7745c5c3_Err != nil {
					return templ_7745c5c3_Err
				}
			}
			_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("</div></main>")
			if templ_7745c5c3_Err != nil {
				return templ_7745c5c3_Err
			}
			return templ_7745c5c3_Err
		})
		templ_7745c5c3_Err = layouts.PhotoBase(title).Render(templ.WithChildren(ctx, templ_7745c5c3_Var2), templ_7745c5c3_Buffer)
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		return templ_7745c5c3_Err
	})
}

var _ = templruntime.GeneratedTemplate
