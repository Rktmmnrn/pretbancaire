# 🔧 Guide d'Installation - Gestion des Prêts Bancaires

## Étape 1 : Installer MySQL

### Windows
1. **Télécharger MySQL** : https://dev.mysql.com/downloads/mysql/
2. **Installer** : Exécutez l'installateur et suivez les étapes
3. **Configuration** :
   - Choisir "MySQL Server" avec les paramètres par défaut
   - Port : 3306
   - Utilisateur root sans mot de passe (par défaut) ou avec votre mot de passe

### Vérifier l'installation
```powershell
# Sur Windows avec MySQL dans le PATH
mysql -u root -p
# Ou si pas de mot de passe :
mysql -u root
```

Si cela ne fonctionne pas, ajoutez MySQL au PATH :
- Trouvez le dossier bin de MySQL (généralement `C:\Program Files\MySQL\MySQL Server 8.0\bin`)
- Ajoutez-le aux variables d'environnement Windows

---

## Étape 2 : Configurer la base de données

### Option 1 : Utiliser MySQL Workbench (Interface graphique)
1. **Télécharger** : https://dev.mysql.com/downloads/workbench/
2. **Ouvrir MySQL Workbench**
3. **Créer une nouvelle connexion** avec localhost, port 3306, user: root
4. **Ouvrir un nouvel onglet Query**
5. **Copier le contenu du fichier** `database.sql`
6. **Exécuter** (Ctrl + Shift + Enter)

### Option 2 : Utiliser la ligne de commande
```powershell
cd "D:\projets\PretBancaire\pretbancaire\backend"

# Avec MySQL en ligne de commande
mysql -u root < database.sql

# Ou si vous avez un mot de passe :
mysql -u root -p < database.sql
```

### Option 3 : Ligne par ligne (PowerShell)
```powershell
mysql -u root -e "CREATE DATABASE IF NOT EXISTS pret_bancaire;"
mysql -u root -e "USE pret_bancaire; CREATE TABLE IF NOT EXISTS Pret_bancaire (id_pret INT PRIMARY KEY AUTO_INCREMENT, num_compte VARCHAR(20) NOT NULL, nom_client VARCHAR(100) NOT NULL, nom_banque VARCHAR(100) NOT NULL, montant DECIMAL(12, 2) NOT NULL, date_pret DATE NOT NULL, taux_pret DECIMAL(5, 4) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
```

---

## Étape 3 : Vérifier la configuration

Après avoir créé la base de données, vérifiez que tout fonctionne :

```powershell
mysql -u root -e "USE pret_bancaire; SELECT * FROM Pret_bancaire LIMIT 1;"
```

Si vous voyez une table vide ou avec les données d'exemple, c'est bon ! ✅

---

## Étape 4 : Vérifier le fichier .env

Le fichier `.env` doit être présent dans le dossier backend avec :

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=pret_bancaire
```

**Note** : Si vous avez un mot de passe MySQL, mettez-le dans `DATABASE_PASSWORD`

---

## Étape 5 : Lancer l'application

```powershell
cd "D:\projets\PretBancaire\pretbancaire\backend"
npm install  # Si pas encore fait
npm run dev
```

Vous devriez voir :
```
L'app écoute sur le port: 3000 actuellement
database connected
```

---

## Étape 6 : Accéder à l'application

Ouvrez votre navigateur et allez à :
```
http://localhost:3000
```

---

## 🆘 Dépannage

### Erreur : "Access denied for user 'root'@'localhost'"
- **Solution 1** : Vérifiez que MySQL est lancé (Services Windows)
- **Solution 2** : Vérifiez le nom d'utilisateur et le mot de passe dans `.env`
- **Solution 3** : Réinitialisez le mot de passe MySQL

### Erreur : "Cannot find module 'mysql'"
```powershell
cd backend
npm install
```

### Erreur : "Cannot find module 'ejs'"
```powershell
cd backend
npm install ejs
```

### Erreur : "ENOENT: no such file or directory, open '.env'"
- Créez le fichier `.env` dans le dossier backend (voir Étape 4)

### Erreur : "Port 3000 already in use"
- Changez le PORT dans `.env` à un autre port (ex: 3001)
- Ou arrêtez le processus qui utilise le port 3000

### Port MySQL non trouvé
- Vérifiez que MySQL écoute sur le port 3306 :
```powershell
netstat -an | findstr 3306
```

---

## 🎯 Test rapide

Après le lancement, testez les endpoints :

```powershell
# Récupérer tous les prêts
curl http://localhost:3000/api/pret

# Ou directement dans le navigateur
http://localhost:3000
```

Si la page s'affiche avec le tableau, c'est bon ! 🎉

---

## 📚 Variables d'environnement (.env)

| Variable | Description | Défaut |
|----------|-------------|--------|
| PORT | Port du serveur | 3000 |
| DATABASE_HOST | Adresse du serveur MySQL | localhost |
| DATABASE_USER | Utilisateur MySQL | root |
| DATABASE_PASSWORD | Mot de passe MySQL | (vide) |
| DATABASE_NAME | Nom de la base de données | pret_bancaire |

---

## ℹ️ Notes importantes

- **MySQL doit être en cours d'exécution** pour que l'application fonctionne
- Le fichier `.env` ne doit pas être committé dans Git (ajoutez-le à `.gitignore`)
- Les données d'exemple (5 prêts) sont optionnelles mais utiles pour tester

Besoin d'aide ? Consultez les logs dans la console !
