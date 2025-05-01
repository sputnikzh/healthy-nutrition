install:
	npm ci

dev:
	npx webpack serve

build:
	NODE_ENV=production npx webpack