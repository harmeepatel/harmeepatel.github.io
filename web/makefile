# css-gen:
# 	sass -w ./static/css/index.scss ./static/css/index.css

compress-js:
	uglifyjs --compress 'pure_funcs' --mangle -o ../static/js/main.min.js -- ../static/js/main.js
	uglifyjs --compress 'pure_funcs' --mangle -o ../static/js/photos.min.js -- ../static/js/photos.js

tw-watch:
	bunx tailwindcss -i ./static/index.css -o ../static/css/main.css --watch --minify
tsc:
	tsc -w

dev:
	make -j 2 tw-watch tsc
