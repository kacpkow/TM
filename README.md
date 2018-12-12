# TM
1) python manage.py makemigrations
2) python manage.py migrate
3) python manage.py createsuperuser
4) python manage.py runserver

Ogólnie pomysł jest taki, że aplikacja mobilna pinguje cyklicznie stronę /latest na przykład co 1 minutę,
w odpowiedzi dostaje timestamp ostatniej modyfikacji bazy zdjęć ze zdjęciami. Kiedy
okaże się, że ten przechowywany w aplikacji różni się od otrzymanego to z apki idzie GET request pod 
adres /images, gdzie aplikacja wystawia JSONy, które zawierają ścieżkę względną do zdjęcia
oraz nazwę użytkownika, który dane zdjęcie zuploadował.
