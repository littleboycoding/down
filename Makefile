build: clean
	npm run build && npm run export
	cp -r out/* gui/web/
	cd gui && go build . && mv down ../

clean:
	rm -rf gui/web/*
	rm -f down
