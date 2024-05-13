postgresinit:
	docker run --name postgres -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -d postgres

postgres:
	docker exec postgres psql

createdb:
	docker exec -it postgres createdb --username=root --owner=root go_chat

dropdb:
	docker exec -it postgres dropdb go-chat

migrateup:
	/home/user/go/bin/migrate -path db/migrations -database "go_chat" -verbose up

migratedown:
	/home/user/go/bin/migrate -path db/migrations -database "go_chat" -verbose down


.PHONY: postgresinit postgres createdb dropdb migrateup migratedown