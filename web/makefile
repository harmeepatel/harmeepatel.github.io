# css-gen:
# 	sass -w ./static/css/index.scss ./static/css/index.css

compress-js:
	uglifyjs --compress 'pure_funcs' --mangle -o ../static/js/main.min.js -- ../static/js/main.js
	uglifyjs --compress 'pure_funcs' --mangle -o ../static/js/photos.min.js -- ../static/js/photos.js

css-input:
	bunx tailwindcss -i ./static/index.css -o ../static/css/main.css --watch --minify
css-tag-colors:
	bunx tailwindcss -i ./static/tag_colors.css -o ../static/css/tag_colors.css --watch --minify
tsc:
	tsc -w

dev: compress-js
	make -j 3 css-input css-tag-colors tsc
