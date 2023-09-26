## Uruchomienie backendu

Instalacja yarn'a:
`npm install --global yarn`

[Inne opcje instalacji yarna.](https://classic.yarnpkg.com/lang/en/docs/install/)

Zainstaluj paczki za pomocą wybranego package managera (domyślnie yarn - patrz lockfile):

`yarn`

Zainicjuj bazę danych uruchamiając komendę z folderu backendowego (więcej informacji w sekcji `Baza danych`):

`yarn db:reset`

Uruchom backend za pomocą komendy:

`yarn start:dev`

[VIDEO: Odpalanie API i praca ze swaggerem.](https://youtu.be/0CTSrqNyEd0)

## Dokumentacja API

Dokumentacja API jest dostępna po uruchomieniu serwera backendowego pod adresem `http://localhost:9595/docs`.

Wszystkie requesty zostały dokładnie opisane, zarówno to czego endpoint oczekuję jak i to co zwraca z uwzględnieniem możliwych błędów.

Opisy schemy dla requestów również uwzględniają walidację (minimalna i maksymalna ilość znaków).

## Baza danych

Repozytorium backendowe korzysta z bazy danych `sqlite`. W celu stworzenia bazy danych oraz wygenerowania początkowych danych wejdź do folderu z backendem, upewnij się, że serwer jest wyłączony i uruchom komendę:

```
yarn db:reset
```

Ta komenda usunie bazę jeżeli takowa istnieje, stworzy nową i uruchomi migrację danych.

Uwaga - ta komenda usunie dane zmodyfikowane przez Ciebie w bazie danych!

## Komunikacja z API

W celu autoryzacji po stronie Backend-u powinieneś do każdego zapytania dołączyć Bearer Token do nagłówka Authorization. Przykład:

```
Authorization: Bearer eyJhbGc3OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAZXhhbXBsZS5jb20iLCJzd1IiOjE2NzQxMjcvMzcxMzEsImZpcnN0bmFtZSI6InRlc3QiLCJsYXN0bmFtZSI6InRlc3QiLCJpYXQiOjE2NzQxNDE4ODcsImV4cCI6MTY3NDE0aTQ4N30.SOU2GqpndnREZsrSiEbx7_cwcqXkA1jG5jkvDLX5emw
```

Gdzie token występujący po słowie Bearer to token zwracany przez endpoint logowania.
