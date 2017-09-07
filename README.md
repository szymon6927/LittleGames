# all_in_one
Pomysł na stworzenie jednej większej aplikacji w której będę trzymał moje wszystkie mniejsze projekty

## BitMarket
Na początek chce zacząc od aplikajcji do obsługi polskiej giełdy kryptowalut bitmarket.pl tzn:
- własna implemantacja zachowań, warunków i algorytmów na podstawie których aplikacja na bazie API wystawionego przez bitmarket
będzie informować użytkownika o tym kiedy warto zainteresować się kupnem bądź sprzedażą danej kryptowaluty 
(LTC idze na pierwszy odstrzał, jako że altcoiny są moim celem)

## BitBay
W planach jest zrobienie tego samego co powyżej tylko że dla innej dużej polskiej giełdy mianowicie bitbay.net

### Inne pomysły
W przyszłości planuje systematycznie dorzucać do serwisu wszelkie mniejsze projekty które przyjdą mi do głowy i które zacznę realizować.
Po prostu chce mnieć wszystko zamknięte w jednym serwisie (nie wykluczone, że serwis ten będzie dzielił się na mniejsze mikroserwisy)

#### Plany
Traktuje ten projekt jako mój rozwój w technologiach webowych
Narazie jest czysta apliakcja uczę się NODE.JS jak i samego framework'a, i całej logiki backendowej w JS
W przyszłości na pewno będe chciał zaimplementować testy oraz rozdzielić apliakcje na wersje produkcyjną i developerską

#### Stack technologiczny
Jako że w pracy zajmuje się pisaniem apek internetowych w PHP/SMARTY ze strony backendu i po stronie frontu standardowo JS/HTML
a bazy trzymamy w MYSQL, chcę spróbować swoich sił w technologiach typowo full-stackowych tzn:
- zacząłem od Express.js -> popularny i dość często polecany framework NODE.JS (z silnikiem template'ow handlebars)
- po stronie frontu na razie zostaje czysty JS ewentualnie jQuery ale w planach mam również spróbować wdrożyć React'a
- baza bo i tak prędzej czy później się pojawi - stawiam na MongoDB


## Uruchomienie
Klonujemy repo
```
git clone https://github.com/szymon6927/all_in_one.git
```
Przechodzimy do katalogu aplikacji
```bash
cd all_in_one
```
Przed uruchomieniem serwera musimy zaciąganć wszystkie potrzebne moduły, robimy to poleceniem
```javascript
npm install
```
Dopiero teraz możemy wystartować serwer
```javascript
npm start
```

