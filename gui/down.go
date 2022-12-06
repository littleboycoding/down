package main

import (
	"embed"
	"io/fs"
	"log"

	"net/http"

	"github.com/littleboycoding/down/pkg/binding"
	"github.com/littleboycoding/down/pkg/core"
	"github.com/webview/webview"
)

//go:embed all:web js
var embeded embed.FS

const TITLE = "Down"
const HEIGHT = 600
const WIDTH = 800

func serve() {
	web, err := fs.Sub(embeded, "web")

	if err != nil {
		log.Fatal(err)
	}

	http.Handle("/", http.FileServer(http.FS(web)))
	http.ListenAndServe(":3000", nil)
}

func getInit() string {
	init, err := embeded.ReadFile("js/init.js")

	if err != nil {
		log.Fatal(err)
	}

	return string(init)
}

func main() {
	go serve()

	down := core.New(true)
	binding := binding.New(&down)

	down.Webview.SetTitle(TITLE)
	down.Webview.SetSize(WIDTH, HEIGHT, webview.HintMin)

	down.Webview.Bind("selectFile", binding.SelectFile)
	down.Webview.Bind("readFile", binding.ReadFile)
	down.Webview.Bind("unwatch", binding.Unwatch)
	down.Webview.Bind("watch", binding.Watch)

	down.Webview.Init(getInit())

	down.Webview.Navigate("http://localhost:3000")

	defer down.Watcher.Close()
	defer down.Webview.Destroy()

	down.Webview.Run()
}
