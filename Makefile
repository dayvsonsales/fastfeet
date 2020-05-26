install: 
	cd frontend && npm install --silent && npm run build
lint:
	cd frontend && npx eslint src/*/*.js src/*.js