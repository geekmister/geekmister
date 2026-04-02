.PHONY: start stop restart status logs

start:
	./scripts/blog-server.sh start

stop:
	./scripts/blog-server.sh stop

restart:
	./scripts/blog-server.sh restart

status:
	./scripts/blog-server.sh status

logs:
	./scripts/blog-server.sh logs
