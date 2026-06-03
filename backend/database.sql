-- Script de création de la base de données et table Prêt Bancaire
-- Exécutez ce script dans MySQL Workbench ou via la ligne de commande

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS pret_bancaire;

-- Utiliser la base de données
USE pret_bancaire;

-- Créer la table Pret_bancaire
CREATE TABLE IF NOT EXISTS Pret_bancaire (
    id_pret INT PRIMARY KEY AUTO_INCREMENT,
    num_compte VARCHAR(20) NOT NULL,
    nom_client VARCHAR(100) NOT NULL,
    nom_banque VARCHAR(100) NOT NULL,
    montant DECIMAL(12, 2) NOT NULL,
    date_pret DATE NOT NULL,
    taux_pret DECIMAL(5, 4) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Ajouter un index sur num_compte pour les recherches rapides
CREATE INDEX idx_num_compte ON Pret_bancaire(num_compte);

-- Ajouter un index sur nom_client pour les recherches rapides
CREATE INDEX idx_nom_client ON Pret_bancaire(nom_client);

-- Données d'exemple pour tester (optionnel)
INSERT INTO Pret_bancaire (num_compte, nom_client, nom_banque, montant, date_pret, taux_pret) VALUES
('ACC001', 'Jean Dupont', 'BNP Paribas', 10000.00, '2024-01-15', 0.0450),
('ACC002', 'Marie Martin', 'Société Générale', 25000.00, '2024-02-20', 0.0350),
('ACC003', 'Pierre Bernard', 'Crédit Agricole', 15000.00, '2024-03-10', 0.0500),
('ACC004', 'Sophie Laurent', 'Banque Postale', 8000.00, '2024-04-05', 0.0400),
('ACC005', 'Luc Moreau', 'LCL', 30000.00, '2024-05-12', 0.0450);
