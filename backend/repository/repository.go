package repository

type Repository struct {
	Auth
	Book
	Club
	Quest
	Collections
}

func NewRepository(db *mongo.DB) *Repository {
	return &Repository{
		Auth:        newAuthRepository(db),
		Book:        newBookRepository(db),
		Club:        newClubRepository(db),
		Quest:       newQuestRepository(db),
		Collections: newCollectionsRepository(db),
	}
}
