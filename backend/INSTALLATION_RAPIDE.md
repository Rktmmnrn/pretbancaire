## ✅ Résumé de l'Installation

Votre application nécessite **MySQL** pour fonctionner. Voici les étapes rapides :

### 1️⃣ Installer MySQL
- **Télécharger** : https://dev.mysql.com/downloads/mysql/
- **Installer** avec les paramètres par défaut
- **Vérifier** : `mysql -u root` dans PowerShell

### 2️⃣ Créer la base de données
Ouvrez **MySQL Workbench** ou **PowerShell** et exécutez le contenu du fichier `database.sql` :

**Option PowerShell** :
```powershell
cd "D:\projets\PretBancaire\pretbancaire\backend"
mysql -u root < database.sql
```

**Option MySQL Workbench** :
- Copiez le contenu de `database.sql`
- Collez dans une nouvelle requête
- Exécutez (Ctrl + Shift + Enter)

### 3️⃣ Vérifier la base de données
```powershell
mysql -u root -e "USE pret_bancaire; SHOW TABLES;"
```

Vous devriez voir : `Pret_bancaire`

### 4️⃣ Lancer l'application
```powershell
cd "D:\projets\PretBancaire\pretbancaire\backend"
npm run dev
```

Vous devriez voir :
```
L'app écoute sur le port: 3000 actuellement
database connected
```

### 5️⃣ Ouvrir l'application
- Navigateur : http://localhost:3000
- Vous verrez le formulaire et le tableau des prêts

### ⚙️ Configuration (.env)
Le fichier `.env` est déjà créé avec :
```
PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=pret_bancaire
```

**Si MySQL a un mot de passe**, modifiez `.env` :
```
DATABASE_PASSWORD=votre_mot_de_passe
```

---

### 📋 Fichiers créés/modifiés :

✅ `views/index.ejs` - Interface complète
✅ `public/css/style.css` - Styles modernes  
✅ `public/js/app.js` - Logique JavaScript
✅ `config/db.js` - Configuration BD
✅ `controller/pretController.js` - Contrôleurs
✅ `app.js` - Configuration Express
✅ `.env` - Variables d'environnement
✅ `database.sql` - Schéma BD + données exemple
✅ `SETUP_GUIDE.md` - Guide d'installation détaillé
✅ `FRONTEND_README.md` - Documentation frontend

---

### 🆘 Si ça ne marche pas :

1. **"Access denied"** → MySQL non lancé ou mauvaises credentials
2. **"Cannot find module"** → `npm install` dans le dossier backend
3. **"Port already in use"** → Changez PORT dans `.env`
4. **"database.sql not found"** → C'est normal, c'est un fichier de setup

Besoin d'aide pour installer MySQL ? Consultez `SETUP_GUIDE.md` ! 📚
