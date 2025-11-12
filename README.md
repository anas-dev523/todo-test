# Test Technique - TODO

## Prérequis
- Node 18+

## Lancer l'API
```bash
cd api
npm install
npm run dev       # mode développement (avec nodemon)
npm start       # mode production

Lancer le mini front : 
Ouvre web/index.html
Clique sur “Go Live”

un exemple de requête pour chaque route :

GET :
C:\Users\chebbi anas\todo-test\api>curl http://localhost:3000/todos
[{"id":1,"title":"Acheter du thé","done":true},{"id":2,"title":"Acheter du thé","done":false}]
POST :
C:\Users\chebbi anas\todo-test\api>curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d "{\"title\":\"Acheter du thé\"}"
{"id":1,"title":"Acheter du thé","done":false}

PATCH : 
C:\Users\chebbi anas\todo-test\api>curl -X PATCH http://localhost:3000/todos/1/toggle
{"id":1,"title":"Acheter du thé","done":true}
