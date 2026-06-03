# 🐳 Installation avec Docker (Optionnel)

Si vous avez **Docker** installé, vous pouvez lancer l'application sans installer MySQL localement.

## Installation rapide avec Docker

### Prérequis
- **Docker Desktop** : https://www.docker.com/products/docker-desktop

### Lancer l'application

```powershell
cd "D:\projets\PretBancaire\pretbancaire\backend"
docker-compose up
```

Attendez que les services démarrent (environ 30 secondes).

Vous verrez :
```
app_1    | L'app écoute sur le port: 3000 actuellement
app_1    | database connected
```

### Accéder à l'application
- Navigateur : http://localhost:3000

### Arrêter les services
```powershell
docker-compose down
```

### Réinitialiser les données
```powershell
docker-compose down -v  # Supprime aussi les volumes (base de données)
docker-compose up       # Relance avec une BD vide
```

---

## Fichiers Docker fournis

- **Dockerfile** : Définit l'image Node.js pour l'application
- **docker-compose.yml** : Orchestre MySQL + Node.js

Le fichier `docker-compose.yml` :
- Lance automatiquement MySQL avec la base de données
- Lance l'application Node.js
- Configure les variables d'environnement
- Crée les tables à partir de `database.sql`

---

## 📊 Avantages de Docker

✅ **Pas besoin d'installer MySQL** - Tout est containerisé
✅ **Reproductible** - Même environnement partout
✅ **Facile à nettoyer** - Une seule commande pour tout supprimer
✅ **Prêt pour la production** - Docker est utilisé en prod

---

## 🆘 Dépannage Docker

### "docker-compose: command not found"
- Installer **Docker Desktop** (inclut docker-compose)

### Port 3306 ou 3000 déjà utilisé
```powershell
# Modifier docker-compose.yml
# Ligne 19 : "3306:3306" → "3307:3306"
# Ligne 32 : "3000:3000" → "3001:3000"
```

### Réinitialiser complètement
```powershell
docker-compose down -v
docker system prune -a
docker-compose up
```

---

## 🔄 Alternative : Installation sans Docker

Voir le fichier `SETUP_GUIDE.md` pour installer MySQL localement.
