# Projet Soa - Microservices

Ce projet a été réalisé dans le cadre de la mise en pratique des cours de __SOA__.

Voici les étapes de la mise en place du projet localement.

## 1. Cloner le repository

On peut cloner l'application avec la commande:

```bash
git clone https://github.com/Robnelito/soa_microservice.git​​
```

## 2. Créer vos base de données

Ce projet contient 3 services qui on chacun leur propre BDD. Ici on a utiliser __PostgreSQL__, si vous souhaiter vous pouvez changer de driver dans le schema.prisma de chaque services.

- User: avec une base de données ```user```
- Client: avec une base de données ```client```
- Payment: avec une base de données ```payment```

## 3. Initialisation de l'application et de la base de données

Pour initialiser l'application il y a une script que l'on peut utiliser:

- Sur windows, on peut executer le fichier ```Initialize Application add Database.bat```.

- Sur Linux, on peut executer le fichier ```Initialize Application add Database.sh```.

## 4. Mise en service

La mise en service aussi est simple car il y a un script disponible.

- Sur windows, on peut executer le fichier ```Run All Service.bat```.

- Sur Linux, on peut executer le fichier ```Run All Service.sh```.

__NB__: l'etape 3 et 4 peuvent être fait manuellement selon vos préférence.

Apres avoir executer tout ce commande, allez sur Vous pouvez en savoir plus sur votre __[localhost:5173](http://localhost:5173)__.

### Félicitation l'application est mise en ligne🎊
