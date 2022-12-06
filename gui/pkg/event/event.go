package event

import (
	"encoding/json"
	"fmt"
	"log"
)

type Event struct {
	Name    string
	Payload any
}

func New(name string, payload any) Event {
	return Event{Name: name, Payload: payload}
}

func (e Event) String() string {
	payload, err := json.Marshal(e.Payload)

	if err != nil {
		log.Fatal(err)
	}

	return fmt.Sprintf("new DownEvent(`%s`, `%s`)", e.Name, payload)
}
