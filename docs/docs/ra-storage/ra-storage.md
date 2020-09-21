# RaptorsApp: ra-storage
[back to homepage](../index.md)
## documentation placeholder

# ra-storage
ra-storage to usługa do przechowywania plików.

## Zastosowanie
Zarządzanie takimi plikami jak:
* mapy
* metadane map (pliki yml itp.)
* miniaturki map
* obrazki robotów i komponentów

ewentualnie:
* logi robotów
* backupy, dumpy, snapshoty
* dockerowe obrazy

## ścieżka do pliku
`<adres hosta>:<port minio>/<nazwa serwera mongodb MAŁYMI LITERAMI!>/<nazwa bazy danych>/<nazwa modelu zgodna z id midelu backendu>/<nazwa pliku zgodnia z zawartoscią obiektu mongo}.{rozszerzenie pliku>`
`http://tebe.westeurope.cloudapp.azure.com:9000/raptorsleherguargindb/maps/demoGeniale/demoGeniale.png`


## Zabezpieczenia

### Aktualnie
* Każdy może przeglądać katalogi policy public?
* Tylko wyznaczeni użytkownicy moga uploadować
* Każdy może zobaczyć plik poprzez wpisanie odpowiedniej, prostej ściezki do pliku

### W przyszłości
* Wszystko tunelowane przez RA Backend
* Brak dostepu do portu usługi (dostep tylko pośredni przez RA back)
* Żeby uzyskac obrazek nalezy o to poprosić i autentykować się w RA Backend

## Algorytmy 

### Proces uploadu
1. Wyślij plik wraz z metadanymi do RA Backend
2. RA Backend zapisuje metadane w bazie mongo
3. RA Backend wysyła zapytanie do minio z prośbą o przechowanie pliku
4. RA Backend informuje uzytkownika że udało się uploadować plik

### Proces downloadu

#### Aktualnie
* Podanie dokładnej ściezki do pliku

#### W przyszłości
* Poproszenie RA Backend o wyswietlenie pliku
* Port minio zablokowany do odczytu spoza VM

## wady i zalety

### storage minio

+ dostep http do plików
+ dostep do plików bezpośrednio z dysku (lecz nie uzywamy)
+ możliwość odczytu plików przez zewnętrzne VM (jezeli na to pozwolimy)
+ mniej kodu do napsiania związanego z zapisywaniem plików na dysku (wysyłamy wewnętrzne zapytania http zamiast zapisywac bufor pliku na dysku)
- dodatkowy mikroserwis
- skomplikowana możliwość udostepniania pliku z personalnym linkiem (limit 7 dni)
- można sie "domyślić" innnych nazw plików i nieautoryzowanie je otworzyć

### storage lokalnie na dysku

+ szybsze
+ zablokowany dostęp spoza VM
+ brak potrzeby wysyłania zapytań http przez serwer do siebie samego aby uzyskać dostep do plików
+ brak dodatkowego mikroserwisu
- walka z zapisem na dysku
- problem z backupami
- mniejsza kontrola nad storage
- bezpośredni dostęp do koment zapisu i odczytu różnych plików z dysku

## inne uwagi
* deweloperzy RA Backend musza dbać o zgodnośc kolekcji maps z mongo z zawartością dysku minio, kazdy CxUD na mongo musi aktualizować obiekty w minio
* potrzebujemy zewnętrznegoi skryptu diagnostycznego sprawdzającego roznice miedzy kolekcja mongo maps a storage minio?
* GUI do zarządzania
1. Cyberduck
2. S3 Browser
3. MC

## Taski

### Done
* repozytorium
* testowy hosting tebe
* testowa kolekcja
* wstepne ustawienia portów firewalla
* research kolekcja mongo maps

## ToDo
* zarządzanie policy
* wdrożenie produkcyjne
* blokada maksymalnej ilośic miejsca zajętej przez minio
* dockeryzacja
* cykliczne, zewnętrzne backupy
* zarządzanie użytkownikami
* "anonimizacja" linków
* try: share file forever
* funkcja przetwarzająca pgm w png
* przygotować model obiektu maps w backendzie i frontendzie
* tunelowanie plików przez RA Backend
* blokada bezpośrendiego dostepu do plików minio (blokada portu 9000, udostepnainie tylko lokalnie)
* Zmienić hasła (oraz uporządkować użytkowników i grupy)
