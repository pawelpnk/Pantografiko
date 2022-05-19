# Pantografiko

Aplikacja wykonana w React.js, TypeScript oraz NestJS z wykorzystaniem bazy danych MongoDB.

## Podstawowe informacje

Aplikacja została stworzona na potrzeby pracy inżynierskiej. Podstawowym założeniem jest możliwość zbierania danych na temat zużycia nakładek ślizgowych odbieraków prądów przez przewoźników kolejowych. Aplikacja oferuje:
- Konta użytkowników tworzone przez administratora jako wewnętrzny system
- Możliwość zapisu nowo wykonanego przeglądu
- Wyświetlanie dokonanych przeglądów
- Filtrowanie przeglądów po nazwach lokomotyw oraz numerów odbieraków
- Wyświetlanie wykresu na temat zużycia nakładek w czasie
- Edycje oraz usuwanie wybranych przeglądów
- Podział na role

## Instalacja
Lokalna instalacja możliwa jest poprzez pobranie aplikacji, stworzenie pliku .env z konfiguracją bazy danych a następnie wpisanie komendy:

`npm start`

Przykładowa konfiguracja pliku `.env`

`
DATABASE_USER=Twoja nazwa użytkownika z dostępem do bazy danych
DATABASE_PASSWORD=Twoje hasło dostępowe do bazy danych
DATABASE_HOST=Host Twojej bazy danych
DATABASE_NAME=Pantografiko
EXPIRESIN=Czas wygasania tokenu
`

Serwer należy uruchomić zarówno w folderze z backendem jak i frontendem.

## Użyte technologie
- React.js
- TypeScript
- NestJS
- MongoDB
- Mongoose
- Char.js
- React-responsive
- CSS
- HTML

