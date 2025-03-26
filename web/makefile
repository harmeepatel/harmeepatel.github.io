# css-gen:
# 	sass -w ./static/css/index.scss ./static/css/index.css

compress:
	uglifyjs --compress 'pure_funcs' --mangle -o ../static/js/main.min.js -- ../static/js/main.js
	uglifyjs --compress 'pure_funcs' --mangle -o ../static/js/photos.min.js -- ../static/js/photos.js

css-input:
	bunx tailwindcss -i ./static/index.css -o ../static/css/main.css --watch --minify
tsc:
	tsc -w

dev: 
	make -j 2 css-input tsc
