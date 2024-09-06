package service

type Service struct {
	Auth
	Book
	Club
	Quest
	Collections
}

func NewServices(repositories *repository.Repository) *Service {
	return &Service{
		Auth:        newAuthService(repositories.Auth),
		Book:        newBookService(repositories.Book),
		Club:        newClubService(repositories.Club),
		Quest:       newQuestService(repositories.Quest),
		Collections: newCollectionsService(repositories.Collections),
	}
}
