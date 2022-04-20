# Pantografiko

Aplikacja wykonana w React.js wraz z TypeScriptem oraz NestJS z wykorzystaniem MongoDB.

## Podstawowe informacje

Aplikacja została stworzona na potrzeby pracy inżynierskiej. Podstawowym założeniem jest możliwość zbierania danych na temat zużycia nakładek ślizgowych odbieraków prądów przez przewoźników kolejowych. Aplikacja oferuje:
- Konta użytkowników tworzone przez administratora jako wewnętrznym system
- Możliwość zapisu nowo wykonanego przeglądu
- Wyświetlanie dokonanych przeglądów
- Filtrowanie przeglądów po nazwach lokomotyw
- Wyświetlanie wykresu na temat zużycia nakładek w czasie
- Edycje oraz usuwanie wybranych przeglądów

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
Ostatnia linijka jest stworzona na potrzeby przyszłych rozwiązań.

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

####
Aplikację czekają jeszcze przyszłe aktualizacje
