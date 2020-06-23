install: 
	cd frontend && npm install --silent && npm run build && cd ..
	cd backend && npm install --silent && npm run build && cd ..
	cd mobile && npm install --silent && cd ..
lint:
	cd frontend && npx eslint src/*/*.js src/*.js && cd ..
	cd backend && npx eslint src/*/*.js src/*.js && cd ..
	cd mobile && npx eslint src/*/*.js src/*.js && cd ..
