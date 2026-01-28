Aplikacja stworzona w React.

Główne Funkcje
1. Ekran Główny
Główne Saldo: Wyświetlanie aktualnych dostępnych środków w dużym, czytelnym formacie.

Total Wealth Widget: Agregacja majątku – podział na Gotówkę (Cash) oraz Oszczędności (Savings/Cele).

Szybkie Akcje: Przyciski nawigacyjne: Wpłać, Przelew, Wymiana, Więcej.

Interaktywne Cele: Możliwość wpłacania środków na cele (np. "Wakacje") poprzez kliknięcie w wiersz – kwota jest automatycznie pobierana z konta głównego.

2. Karty
Animacje 3D: Realistyczny efekt obracania karty po kliknięciu (CSS 3D Transform).

Karta Metal: Główna karta ze stałymi danymi.

Karta Wirtualna: Karta jednorazowa, która generuje losowe numery przy każdym wejściu na ekran (symulacja bezpieczeństwa).

3. Hub Analityczny (Analytics)
Wykresy: Wizualizacja przychodów i wydatków za pomocą biblioteki recharts.

Realne Dane: Wykresy i podsumowania są połączone z WalletContext i reagują na Twoje transakcje.

4. Operacje Finansowe
Przelewy: Formularz przelewu krajowego (Odbiorca, Konto, Kwota), który aktualizuje saldo i historię.

Doładowania (Top-Up): Symulacja wpłaty przez BLIK (kod 6-cyfrowy) lub Kartę Płatniczą.

Kantor (Exchange): Symulator wymiany walut (PLN -> EUR) z przelicznikiem w czasie rzeczywistym.

Technologie:
Projekt został zbudowany przy użyciu nowoczesnego stacku technologicznego:

React (Vite)

React Router DOM: Obsługa nawigacji (SPA - Single Page Application) i dolnego paska menu.

Context API (WalletContext): Zarządzanie stanem globalnym aplikacji (saldo, transakcje, cele).

Lucide React

Recharts

CSS3: Flexbox, Grid, CSS Variables, 3D Transforms, Glassmorphism.

Instalacja i Uruchomienie
Aby uruchomić projekt lokalnie na swoim komputerze:

Sklonuj repozytorium (lub pobierz pliki): Upewnij się, że masz zainstalowane Node.js.

Zainstaluj zależności: Otwórz terminal w folderze projektu i wpisz:

Bash

npm install
Wymagane instalacje dodatkowe (jeśli nie ma w package.json):

Bash

npm install react-router-dom lucide-react recharts
Uruchom aplikację:

Bash

npm run dev
Otwórz w przeglądarce: Kliknij w link wyświetlony w terminalu (zazwyczaj http://localhost:5173).

📂 Struktura Plików
src/App.jsx - Główny plik z logiką widoków (Home, Cards, Transfer itp.) oraz routingiem.

src/WalletContext.jsx - "Mózg" aplikacji. 

src/App.css - Wszystkie style.

📱 Responsywność
Aplikacja została zaprojektowana w podejściu Mobile-First, ale posiada max-width: 550px dla kontenera głównego, dzięki czemu świetnie prezentuje się również na ekranach komputerów, zachowując proporcje aplikacji mobilnej.
