build:
	npm run build && npm run export
	rm -rf gui/web/* && cp -r out/* gui/web
	cd gui && go build . && mv down ../
