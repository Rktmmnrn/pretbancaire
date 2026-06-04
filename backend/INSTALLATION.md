# 📖 Guide d'Installation - Gestion des Prêts Bancaires

Guide complet pour installer et configurer l'application sur votre machine.

## Table des matières

1. [Installation rapide](#installation-rapide)
2. [Installation détaillée (Windows)](#installation-détaillée-windows)
3. [Installation détaillée (Linux/Mac)](#installation-détaillée-linuxmac)
4. [Docker](#docker)
5. [Dépannage](#dépannage)

---

## 🚀 Installation rapide

**Temps estimé : 5 minutes**

### Étape 1 : Vérifier les prérequis

```bash
node --version    # v14+ requis
npm --version     # v6+ requis
mysql --version   # 5.7+ requis
```

### Étape 2 : Installer les dépendances

```bash
cd backend
npm install
```

### Étape 3 : Créer la base de données

```bash
mysql -u root < database.sql
```

### Étape 4 : Lancer l'application

```bash
npm run dev
```

### Étape 5 : Accéder à l'app

Ouvrez http://localhost:3000 dans votre navigateur.

---

## 🪟 Installation détaillée (Windows)

### Prérequis

#### 1. Installer Node.js
1. **Télécharger** : https://nodejs.org/
2. **Choisir** : Version LTS (Recommended)
3. **Installer** : Exécutez l'installateur et suivez les étapes
4. **Vérifier** :
   ```powershell
   node --version
   npm --version
   ```

#### 2. Installer MySQL
1. **Télécharger** : https://dev.mysql.com/downloads/mysql/
2. **Installer** :
   - Exécutez l'installateur MySQL
   - Choisir "MySQL Server"
   - Configuration réseau : Port 3306 (défaut)
   - Configuration MySQL Server : Démarrer automatiquement
3. **Vérifier** :
   ```powershell
   mysql -u root -p
   # Ou sans mot de passe :
   mysql -u root
   ```

   Si cela ne fonctionne pas, ajoutez MySQL au PATH :
   - Rechercher "Variables d'environnement" → Modifier les variables système
   - Ajouter : `C:\Program Files\MySQL\MySQL Server 8.0\bin`

### Configuration de l'application

#### Étape 1 : Cloner ou copier le projet

```powershell
cd C:\Users\VotreNom\Documents
# Copiez le dossier "backend" ici
```

#### Étape 2 : Installer les dépendances

```powershell
cd .\backend\
npm install
```

Cela peut prendre 1-2 minutes. Attendez la fin.

#### Étape 3 : Créer la base de données

**Option A : Avec PowerShell (plus simple)**

```powershell
mysql -u root < database.sql
```

**Option B : Avec MySQL Workbench (Interface graphique)**

1. Télécharger : https://dev.mysql.com/downloads/workbench/
2. Ouvrir MySQL Workbench
3. Créer une nouvelle connexion (localhost, port 3306, user: root)
4. Ouvrir un nouvel onglet Query
5. Copier le contenu du fichier `database.sql`
6. Coller dans l'onglet
7. Exécuter : Ctrl + Shift + Enter

**Option C : Ligne par ligne**

```powershell
mysql -u root -e "CREATE DATABASE IF NOT EXISTS pret_bancaire;"
mysql -u root -e "USE pret_bancaire; CREATE TABLE IF NOT EXISTS pret_bancaire (id_pret INT PRIMARY KEY AUTO_INCREMENT, num_compte VARCHAR(20) NOT NULL, nom_client VARCHAR(100) NOT NULL, nom_banque VARCHAR(100) NOT NULL, montant DECIMAL(12,2) NOT NULL, date_pret DATE NOT NULL, taux_pret DECIMAL(5,4) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);"
```

#### Étape 4 : Vérifier la base de données

```powershell
mysql -u root -e "USE pret_bancaire; SHOW TABLES;"
```

Vous devriez voir : `pret_bancaire`

#### Étape 5 : Configurer les variables d'environnement

Un fichier `.env` doit exister dans le dossier `backend` avec :

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=pret_bancaire
```

**Si MySQL a un mot de passe**, modifiez `DATABASE_PASSWORD` :

```env
DATABASE_PASSWORD=votreMotDePasse
```

#### Étape 6 : Lancer l'application

```powershell
npm run dev
```

Vous devriez voir :
```
[nodemon] starting `node server.js`
L'app écoute sur le port: 3000 actuellement
database connected
```

#### Étape 7 : Accéder à l'application

Ouvrez votre navigateur : **http://localhost:3000**

Vous devriez voir :
- Un formulaire pour ajouter des prêts
- Un tableau vide (ou avec des données d'exemple)
- Des cartes de statistiques
- Des graphiques

---

## 🐧 Installation détaillée (Linux/Mac)

### Prérequis

#### 1. Installer Node.js (Linux/Mac)

**Ubuntu/Debian** :
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**macOS** (avec Homebrew) :
```bash
brew install node
```

Vérifier :
```bash
node --version
npm --version
```

#### 2. Installer MySQL

**Ubuntu/Debian** :
```bash
sudo apt-get update
sudo apt-get install -y mysql-server
sudo mysql_secure_installation
```

**macOS** :
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

Vérifier :
```bash
mysql --version
mysql -u root -p
```

### Configuration de l'application

#### Étape 1 : Cloner ou copier le projet

```bash
cd ~
# Copiez le dossier "backend" ici
```

#### Étape 2 : Installer les dépendances

```bash
cd backend
npm install
```

#### Étape 3 : Créer la base de données

```bash
mysql -u root -p < database.sql
```

Entrez le mot de passe MySQL si demandé.

#### Étape 4 : Vérifier la base de données

```bash
mysql -u root -p -e "USE pret_bancaire; SHOW TABLES;"
```

#### Étape 5 : Configurer les variables d'environnement

Créez ou modifiez le fichier `.env` :

```bash
cat > .env << 'EOF'
PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=votreMotDePasse
DATABASE_NAME=pret_bancaire
EOF
```

#### Étape 6 : Lancer l'application

```bash
npm run dev
```

#### Étape 7 : Accéder à l'application

Ouvrez http://localhost:3000 dans votre navigateur.

---

## 🐳 Docker

Pour lancer l'application avec Docker (MySQL inclus automatiquement) :

```bash
docker-compose up
```

Puis : http://localhost:3000

Voir [DOCKER.md](./DOCKER.md) pour plus de détails.

---

## 🆘 Dépannage

### ❌ "Access denied for user 'root'@'localhost'"

**Cause** : MySQL n'est pas lancé ou les credentials sont mauvaises.

**Solutions** :

1. **Vérifier que MySQL est lancé**

   Windows :
   ```powershell
   # Vérifier dans Services (Win+R → services.msc)
   # Rechercher "MySQL80" et vérifier que c'est "En cours d'exécution"
   ```

   Linux/Mac :
   ```bash
   sudo systemctl status mysql
   ```

2. **Vérifier les credentials**

   ```bash
   mysql -u root -p
   # Entrez le mot de passe si demandé
   ```

3. **Réinitialiser le mot de passe MySQL (Windows)**

   ```powershell
   mysql -u root
   ALTER USER 'root'@'localhost' IDENTIFIED BY '';
   FLUSH PRIVILEGES;
   ```

### ❌ "Cannot find module 'mysql'"

**Cause** : Les dépendances ne sont pas installées.

**Solution** :
```bash
npm install
# Ou spécifiquement :
npm install mysql
```

### ❌ "Cannot find module 'ejs'"

**Solution** :
```bash
npm install ejs
```

### ❌ "ENOENT: no such file or directory, open '.env'"

**Cause** : Le fichier `.env` n'existe pas.

**Solution** : Créez-le avec le contenu suivant :
```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=pret_bancaire
```

### ❌ "Port 3000 already in use"

**Cause** : Un autre processus utilise le port 3000.

**Solution 1** : Changez le port dans `.env`
```env
PORT=3001
```

**Solution 2** : Tuez le processus (Linux/Mac)
```bash
lsof -ti:3000 | xargs kill -9
```

**Solution 2** : Tuez le processus (Windows)
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### ❌ "Cannot find module 'nodemon'"

**Cause** : nodemon n'est pas installé en dev.

**Solution** :
```bash
npm install --save-dev nodemon
```

### ❌ "ECONNREFUSED 127.0.0.1:3306"

**Cause** : MySQL n'est pas lancé ou le host/port est mauvais.

**Solutions** :

1. Vérifier que MySQL est lancé (voir ci-dessus)
2. Vérifier le `.env` :
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USER=root
   ```

### ❌ "Table 'pret_bancaire.pret_bancaire' doesn't exist"

**Cause** : La base de données n'a pas été créée.

**Solution** :
```bash
mysql -u root < database.sql
```

### ❌ "Unexpected token in JSON at position 0"

**Cause** : Le serveur ne répond pas ou retourne du HTML au lieu du JSON.

**Vérifications** :
- Le serveur est lancé ? (`npm run dev`)
- Le port est correct ? (`:3000`)
- MySQL est lancé ?

### ❌ "Error: connect ECONNREFUSED"

**Cause** : Impossible de se connecter à MySQL.

**Solution** :
1. Vérifier que MySQL est lancé
2. Vérifier les credentials dans `.env`
3. Vérifier le host et le port

---

## ✅ Vérification complète

Après l'installation, testez que tout fonctionne :

```bash
# 1. Vérifier que le serveur écoute
npm run dev
# Vous devriez voir : "L'app écoute sur le port: 3000 actuellement"

# 2. Vérifier que MySQL est connecté
# Vous devriez voir : "database connected"

# 3. Ouvrir http://localhost:3000 dans votre navigateur
# Vous devriez voir le formulaire et le tableau
```

---

## 📚 Prochaines étapes

- Lire [README.md](./README.md) pour une vue d'ensemble
- Consulter [views/FRONTEND.md](./views/FRONTEND.md) pour le frontend
- Explorer [DOCKER.md](./DOCKER.md) pour la containerisation

---

## 🆘 Support

Si vous rencontrez toujours des problèmes :

1. Vérifiez les logs de l'application
2. Consultez les fichiers de documentation
3. Vérifiez les erreurs MySQL : `mysql -u root -e "SHOW ERRORS;"`
