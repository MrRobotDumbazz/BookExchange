package models

type Book struct {
	ID           int
	Name         string
	About        string
	Creator      string
	Creator_id   int
	Featured     bool
	IsCollection bool
}
