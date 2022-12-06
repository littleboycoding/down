package main

import (
	"github.com/littleboycoding/down/pkg/binding"
	"github.com/littleboycoding/down/pkg/core"
	"github.com/webview/webview"
)

const TITLE = "Down"
const HEIGHT = 600
const WIDTH = 800

func main() {
	down := core.New(true)
	binding := binding.New(&down)

	down.Webview.SetTitle(TITLE)
	down.Webview.SetSize(WIDTH, HEIGHT, webview.HintMin)

	down.Webview.Bind("selectFile", binding.SelectFile)
	down.Webview.Bind("readFile", binding.ReadFile)
	down.Webview.Bind("unwatch", binding.Unwatch)
	down.Webview.Bind("watch", binding.Watch)

	down.Webview.Navigate("http://localhost:3000")

	defer down.Watcher.Close()
	defer down.Webview.Destroy()

	down.Webview.Run()
}
