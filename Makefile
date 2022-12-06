build: clean
	npm run build && npm run export
	cd gui && go build . && mv down ../

clean:
	rm -rf gui/web/*
	rm -f down
