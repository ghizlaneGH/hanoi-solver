Une implémentation en Python de l'algorithme récursif des Tours de Hanoï.

Le problème des Tours de Hanoï consiste à déplacer un ensemble de disques d'une tige source vers une tige destination, en utilisant une tige auxiliaire.

Les règles sont : 
  1- Un seul disque peut être déplacé à la fois.
  2- Seul le disque situé au sommet d'une tige peut être déplacé.
  3- Un disque plus grand ne peut pas être placé sur un disque plus petit.

Fonctionnement:
 1- Le programme utilise la récursivité pour résoudre le problème.
 2- Il affiche l'état des trois tiges après chaque déplacement.
 3- Le nombre minimal de déplacements est : 2^n -1

Technologies:
 1- Python
 2- Récursivité
 3- Listes

Exécution : 
```bash
python hanoi_solver.py --disks 3
