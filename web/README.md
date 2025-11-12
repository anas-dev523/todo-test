# Test Technique - TODO

## Prérequis
- Node 18+

## Lancer l'API
```bash
cd api
npm install
npm run dev

## exemple de requête pour chaque route : 

requete GET : 
C:\Users\chebbi anas\todo-test\web>curl http://localhost:3000/todos
[{"id":1,"title":"Acheter du café","done":true},{"id":2,"title":"1","done":true}]
C:\Users\chebbi anas\todo-test\web>

requete POST : 
C:\Users\chebbi anas\todo-test\web>curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d "{\"title\":\"Acheter du café\"}"
{"id":3,"title":"Acheter du café","done":false}

requete PATCH : 
C:\Users\chebbi anas\todo-test\web>curl -X PATCH http://localhost:3000/todos/1/toggle
{"id":1,"title":"Acheter du café","done":false}

