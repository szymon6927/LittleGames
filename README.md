# LittleGames
Repo w którym będę trzymał wszystkie moje mniejsze gierki napisane w technologiach webowych.
Całość oparłem o framework Express.js, silnik szablonów handlebars(HBS), do połączenia i zarządzania bazą danych (MongoDB)
użyłem mongoose. Dodatkowo wykorzystałem Materialize-css dla przyjemniejszego stylowania oraz jQuery

## Snake
Prosta gierka wszystkim dobrze znana, poza tym że umożliwia poruszanie się wężem dodałem jeszcze funkcje zapisu
wyniku końcowego gry do bazy danych (MongoDB). Po zakończeniu gry tabela wyników(pięć najlepszych rekordów) automatycznie
się aktualizuje (ajax)

## Kółko i krzyżyk
Gra z dość prostą implementacją AI, możliwe do wyboru dwa poziomy trudności rozgrywki.


## Uruchomienie
Klonujemy repo
```
git clone https://github.com/szymon6927/LittleGames.git
```
Przechodzimy do katalogu aplikacji
```bash
cd LittleGames
```
Przed uruchomieniem serwera musimy zaciąganć wszystkie potrzebne moduły, robimy to poleceniem
```javascript
npm install
```
Dopiero teraz możemy wystartować serwer
```javascript
npm start
```
Aby uruchomić bazę danych należy wykonać polecenie, oraz utworzyć kolekcję o nazwie snake
```
mongod --dbpath sciezka/do/bazy
```
Aplikacja jest będzie dostępna pod adresem
```
http://localhost:3000/
```

