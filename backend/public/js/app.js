function formatDateFR(dateStr) {
    const date = new Date(dateStr);
    const formatted = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
// Récupération des éléments du DOM
const pretForm = document.getElementById('pretForm');
const editForm = document.getElementById('editForm');
const editModal = document.getElementById('editModal');
const pretsTable = document.getElementById('pretsTable');

// Navigation Sidebar
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Retirer la classe active de tous les liens
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Masquer toutes les sections
        contentSections.forEach(section => section.classList.remove('active'));

        // Afficher la section correspondante
        const sectionId = link.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
        }
    });
});

// Gestion du formulaire d'ajout
pretForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        num_compte: document.getElementById('num_compte').value,
        nom_client: document.getElementById('nom_client').value,
        nom_banque: document.getElementById('nom_banque').value,
        montant: parseFloat(document.getElementById('montant').value),
        date_pret: document.getElementById('date_pret').value,
        taux_pret: parseFloat(document.getElementById('taux_pret').value) / 100
    };

    try {
        const response = await fetch('/api/pret', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const newPret = await response.json();
            addRowToTable(newPret);
            pretForm.reset();
            updateStats();
            updateCharts();
            showNotification('Prêt ajouté avec succès!', 'success');
        } else {
            showNotification('Erreur lors de l\'ajout du prêt', 'error');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showNotification('Erreur serveur', 'error');
    }
});

// Ajouter une ligne au tableau
function addRowToTable(pret) {
    const newRow = pretsTable.querySelector('tbody').insertRow();
    newRow.setAttribute('data-id', pret.id_pret);
    newRow.innerHTML = `
        <td>${pret.num_compte}</td>
        <td>${pret.nom_client}</td>
        <td>${pret.nom_banque}</td>
        <td class="amount">${parseFloat(pret.montant).toFixed(2)}</td>
        <td>${formatDateFR(pret.date_pret)}</td>
        <td class="percent">${(pret.taux_pret * 100).toFixed(2)}</td>
        <td class="amount montant-payer">${parseFloat(pret.montant_a_payer).toFixed(2)}</td>
        <td class="actions">
            <button class="btn btn-edit" onclick="editPret(${pret.id_pret})">✏️ Modifier</button>
            <button class="btn btn-delete" onclick="deletePret(${pret.id_pret})">🗑️ Supprimer</button>
        </td>
    `;
}

// Éditer un prêt
async function editPret(id_pret) {
    try {
        const response = await fetch(`/api/pret/${id_pret}`);
        if (!response.ok) throw new Error('Erreur lors de la récupération');

        const pret = await response.json();

        // Remplir le formulaire
        document.getElementById('edit_id_pret').value = id_pret;
        document.getElementById('edit_num_compte').value = pret.num_compte;
        document.getElementById('edit_nom_client').value = pret.nom_client;
        document.getElementById('edit_nom_banque').value = pret.nom_banque;
        document.getElementById('edit_montant').value = pret.montant;

        // Formater la date correctement pour le champ date (format YYYY-MM-DD)
        const dateObj = new Date(pret.date_pret);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        document.getElementById('edit_date_pret').value = `${year}-${month}-${day}`;

        document.getElementById('edit_taux_pret').value = (pret.taux_pret * 100).toFixed(4);

        // Afficher le modal
        editModal.style.display = 'block';
    } catch (error) {
        console.error('Erreur:', error);
        showNotification('Erreur lors de la récupération du prêt', 'error');
    }
}

// Fermer le modal
function closeEditModal() {
    editModal.style.display = 'none';
    editForm.reset();
}

// Fermer le modal en cliquant à l'extérieur
window.addEventListener('click', (e) => {
    if (e.target === editModal) {
        closeEditModal();
    }
});

// Gestion du formulaire de modification
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id_pret = document.getElementById('edit_id_pret').value;
    const formData = {
        num_compte: document.getElementById('edit_num_compte').value,
        nom_client: document.getElementById('edit_nom_client').value,
        nom_banque: document.getElementById('edit_nom_banque').value,
        montant: parseFloat(document.getElementById('edit_montant').value),
        date_pret: document.getElementById('edit_date_pret').value,
        taux_pret: parseFloat(document.getElementById('edit_taux_pret').value) / 100
    };

    try {
        const response = await fetch(`/api/pret/${id_pret}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const updatedPret = await response.json();
            updateRowInTable(updatedPret);
            closeEditModal();
            updateStats();
            updateCharts();
            showNotification('Prêt modifié avec succès!', 'success');
        } else {
            showNotification('Erreur lors de la modification', 'error');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showNotification('Erreur serveur', 'error');
    }
});

// Mettre à jour une ligne du tableau
function updateRowInTable(pret) {
    const row = pretsTable.querySelector(`tbody tr[data-id="${pret.id_pret}"]`);
    if (row) {
        row.innerHTML = `
            <td>${pret.num_compte}</td>
            <td>${pret.nom_client}</td>
            <td>${pret.nom_banque}</td>
            <td class="amount">${parseFloat(pret.montant).toFixed(2)}</td>
            <td>${formatDateFR(pret.date_pret)}</td>
            <td class="percent">${(pret.taux_pret * 100).toFixed(2)}</td>
            <td class="amount montant-payer">${parseFloat(pret.montant_a_payer).toFixed(2)}</td>
            <td class="actions">
                <button class="btn btn-edit" onclick="editPret(${pret.id_pret})">✏️ Modifier</button>
                <button class="btn btn-delete" onclick="deletePret(${pret.id_pret})">🗑️ Supprimer</button>
            </td>
        `;
    }
}

// Supprimer un prêt
async function deletePret(id_pret) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce prêt ?')) {
        try {
            const response = await fetch(`/api/pret/${id_pret}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                const row = pretsTable.querySelector(`tbody tr[data-id="${id_pret}"]`);
                if (row) {
                    row.remove();
                    updateStats();
                    updateCharts();
                    showNotification('Prêt supprimé avec succès!', 'success');
                }
            } else {
                showNotification('Erreur lors de la suppression', 'error');
            }
        } catch (error) {
            console.error('Erreur:', error);
            showNotification('Erreur serveur', 'error');
        }
    }
}

// Mettre à jour les statistiques
function updateStats() {
    const rows = pretsTable.querySelectorAll('tbody tr');
    const amounts = [];

    rows.forEach(row => {
        const montantAPayer = parseFloat(row.querySelector('.montant-payer').textContent);
        amounts.push(montantAPayer);
    });

    if (amounts.length > 0) {
        const total = amounts.reduce((a, b) => a + b, 0);
        const minimal = Math.min(...amounts);
        const maximal = Math.max(...amounts);

        // Mettre à jour les cartes de résumé
        const summaryCards = document.querySelectorAll('.summary-card');
        summaryCards[0].querySelector('.value').textContent = total.toFixed(2) + ' €';
        summaryCards[1].querySelector('.value').textContent = minimal.toFixed(2) + ' €';
        summaryCards[2].querySelector('.value').textContent = maximal.toFixed(2) + ' €';
    } else {
        const summaryCards = document.querySelectorAll('.summary-card');
        summaryCards[0].querySelector('.value').textContent = '0.00 €';
        summaryCards[1].querySelector('.value').textContent = '0.00 €';
        summaryCards[2].querySelector('.value').textContent = '0.00 €';
    }
}

// Variables pour les graphiques
let barChart = null;
let doughnutChart = null;

// Initialiser les graphiques
function initCharts() {
    const ctx1 = document.getElementById('barChart').getContext('2d');
    const ctx2 = document.getElementById('doughnutChart').getContext('2d');

    barChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Montant à Payer (€)',
                data: [],
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: true, position: 'top' } },
            scales: { y: { beginAtZero: true } }
        }
    });

    doughnutChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgba(102,126,234,0.8)',
                    'rgba(118,75,162,0.8)',
                    'rgba(39,174,96,0.8)',
                    'rgba(231,76,60,0.8)',
                    'rgba(52,152,219,0.8)',
                    'rgba(243,156,18,0.8)',
                    'rgba(155,89,182,0.8)',
                    'rgba(26,188,156,0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: true, position: 'bottom' } }
        }
    });
}

// Mettre à jour les graphiques
function updateCharts() {
    const rows = pretsTable.querySelectorAll('tbody tr');
    const labels = [];
    const data = [];

    rows.forEach(row => {
        const nomClient = row.querySelector('td:nth-child(2)').textContent;
        const montantAPayer = parseFloat(row.querySelector('.montant-payer').textContent);
        labels.push(nomClient);
        data.push(montantAPayer);
    });

    if (barChart) {
        barChart.data.labels = labels;
        barChart.data.datasets[0].data = data;
        barChart.update();
    }

    if (doughnutChart) {
        doughnutChart.data.labels = labels;
        doughnutChart.data.datasets[0].data = data;
        doughnutChart.update();
    }
}

// Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 6px;
        color: white;
        font-weight: 600;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
    `;

    if (type === 'success') {
        notification.style.background = '#27ae60';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
    } else {
        notification.style.background = '#3498db';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    updateCharts();
    updateStats();
});

// Animation CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
