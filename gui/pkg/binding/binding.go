package binding

import (
	"fmt"
	"os"

	"github.com/littleboycoding/down/pkg/core"
	"github.com/sqweek/dialog"
)

type Binding struct {
	Down *core.Down
}

type File struct {
	Path    string `json:"path"`
	Content string `json:"content"`
}

func New(down *core.Down) Binding {
	return Binding{Down: down}
}

func (binding *Binding) SelectFile() (File, error) {
	var err error
	var file File

	path, err := dialog.File().Filter("Markdown", "md").Load()

	if err != nil {
		fmt.Printf("Error occured while selecting file %e", err)
		return file, err
	}

	return binding.ReadFile(path)
}

func (binding *Binding) Unwatch() error {
	for _, path := range binding.Down.Watcher.WatchList() {
		if err := binding.Down.Watcher.Remove(path); err != nil {
			return err
		}
	}

	return nil
}

func (binding *Binding) Watch(path string) error {
	if err := binding.Down.Watcher.Add(path); err != nil {
		return err
	}

	return nil
}

func (binding *Binding) ReadFile(path string) (File, error) {
	var err error
	var file File

	b, err := os.ReadFile(path)

	if err != nil {
		fmt.Printf("Error occured while reading file %e", err)
		return file, err
	}

	file.Path = path
	file.Content = string(b)

	binding.Down.Path = path

	return file, nil
}
