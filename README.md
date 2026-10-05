Une implémentation en Python de l'algorithme récursif des Tours de Hanoï, avec une interface web interactive qui permet de visualiser la résolution étape par étape.

Le problème des Tours de Hanoï consiste à déplacer un ensemble de disques d'une tige source vers une tige destination, en utilisant une tige auxiliaire.

Les règles sont : 

  1- Un seul disque peut être déplacé à la fois.

  2- Seul le disque situé au sommet d'une tige peut être déplacé.

  3- Un disque plus grand ne peut pas être placé sur un disque plus petit.

Fonctionnement:

 1- Le programme utilise la récursivité pour résoudre le problème.

 2- Il affiche l'état des trois tiges après chaque déplacement.

 3- Une interface web permet de visualiser les déplacements de manière interactive.

 4- L'utilisateur peut avancer ou reculer entre les étapes ou lancer la résolution automatiquement
 
 5- Le nombre minimal de déplacements est : 2^n -1

Technologies:

 1- Python

 2- Flask

 3- HTML

 4- CSS

 5- JavaScript

 6- Pytest

 7- Récursivité

 8- API REST

Exécution : 

 Interface Web : 

  1- Lancer l'application: python app.py

  2- Ouvrir dans le navigateur

Interface en ligne de comande:
 python -m hanoi.cli --disks 3