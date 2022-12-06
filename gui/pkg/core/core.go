package core

import (
	"fmt"
	"log"
	"os"

	"github.com/fsnotify/fsnotify"
	"github.com/littleboycoding/down/pkg/event"
	"github.com/webview/webview"
)

type Down struct {
	Path    string
	Watcher *fsnotify.Watcher
	Webview webview.WebView
}

func getInit() string {
	b, err := os.ReadFile("./web/init.js")

	if err != nil {
		log.Fatal(err)
	}

	js := string(b)

	return js
}

func (down Down) fsEvent() {
	for {
		select {
		case watchEvent, ok := <-down.Watcher.Events:
			if !ok {
				return
			}
			if watchEvent.Has(fsnotify.Write) {
				down.DispatchEvent(event.New("FSWrite", watchEvent.Name))
			}
		case err, ok := <-down.Watcher.Errors:
			if !ok {
				return
			}
			log.Fatal(err)
		}
	}
}

func New(debug bool) Down {
	watcher, err := fsnotify.NewWatcher()

	if err != nil {
		log.Fatal(err)
	}

	webView := webview.New(debug)

	webView.Init(getInit())

	down := Down{
		Watcher: watcher,
		Webview: webView,
	}

	go down.fsEvent()

	return down
}

func (down Down) DispatchEvent(event event.Event) {
	eval := fmt.Sprintf("dispatchEvent(%s)", event)

	down.Webview.Eval(eval)
}
