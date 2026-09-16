/* ========================
   INITIALIZATION & SETUP
   ======================== */

// Initialize the dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    updateDateTime();
    initializeCharts();
    attachEventListeners();
    setInterval(updateDateTime, 1000);
});

// Initialize dashboard functions
function initializeDashboard() {
    // Set active section to dashboard
    showSection('dashboard');
    
    // Update current date
    const today = new Date();
    document.getElementById('filterDate').valueAsDate = today;
}

/* ========================
   DATE & TIME FUNCTIONS
   ======================== */

function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const dateTimeString = now.toLocaleDateString('id-ID', options);
    document.getElementById('currentDate').textContent = dateTimeString;
}

/* ========================
   NAVIGATION FUNCTIONS
   ======================== */

// Handle navigation menu clicks
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Get section name from data attribute
        const section = this.getAttribute('data-section');
        showSection(section);
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.remove('active');
        }
    });
});

// Show selected section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const section = document.getElementById(sectionName + '-section');
    if (section) {
        section.classList.add('active');
    }
}

/* ========================
   MENU TOGGLE (Mobile)
   ======================== */

document.getElementById('menuToggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.getElementById('menuToggle');
    
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

/* ========================
   CHARTS INITIALIZATION
   ======================== */

let kehadiranChart, statusChart;

function initializeCharts() {
    // Kehadiran Chart (Line Chart)
    const kehadiranCtx = document.getElementById('kehadiranChart');
    if (kehadiranCtx) {
        kehadiranChart = new Chart(kehadiranCtx, {
            type: 'line',
            data: {
                labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                datasets: [
                    {
                        label: 'Hadir',
                        data: [24, 25, 23, 26, 24, 20, 0],
                        borderColor: '#28a745',
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointBackgroundColor: '#28a745',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Izin',
                        data: [2, 1, 3, 1, 2, 4, 0],
                        borderColor: '#ffc107',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointBackgroundColor: '#ffc107',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Sakit',
                        data: [1, 0, 2, 1, 1, 2, 0],
                        borderColor: '#17a2b8',
                        backgroundColor: 'rgba(23, 162, 184, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointBackgroundColor: '#17a2b8',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12,
                                weight: '600'
                            },
                            color: '#2c3e50'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 30,
                        grid: {
                            color: 'rgba(0, 115, 133, 0.05)'
                        },
                        ticks: {
                            color: '#7f8c8d',
                            font: {
                                size: 11
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#7f8c8d',
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }

    // Status Chart (Doughnut Chart)
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        statusChart = new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Hadir', 'Izin', 'Sakit', 'Tidak Hadir'],
                datasets: [{
                    data: [24, 8, 2, 5],
                    backgroundColor: [
                        '#28a745',
                        '#ffc107',
                        '#17a2b8',
                        '#dc3545'
                    ],
                    borderColor: '#fff',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12,
                                weight: '600'
                            },
                            color: '#2c3e50'
                        }
                    }
                }
            }
        });
    }
}

/* ========================
   EVENT LISTENERS
   ======================== */

function attachEventListeners() {
    // Tambah Pejabat Button
    const tambahPejabatBtn = document.getElementById('tambahPejabatBtn');
    const modalTambahPejabat = document.getElementById('modalTambahPejabat');
    
    if (tambahPejabatBtn) {
        tambahPejabatBtn.addEventListener('click', function() {
            openModal('modalTambahPejabat');
        });
    }

    // Export Button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportTableToCSV);
    }

    // Generate Report Button
    const generateReportBtn = document.getElementById('generateReportBtn');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', generatePDFReport);
    }

    // Modal Close Buttons
    document.querySelectorAll('.modal-close, .modal-close-btn').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });

    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });

    // Filter controls
    const filterDate = document.getElementById('filterDate');
    const filterStatus = document.getElementById('filterStatus');
    
    if (filterDate) {
        filterDate.addEventListener('change', filterTable);
    }
    
    if (filterStatus) {
        filterStatus.addEventListener('change', filterTable);
    }

    // Settings buttons
    document.querySelectorAll('.settings-card .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            saveSettings(this);
        });
    });
}

/* ========================
   MODAL FUNCTIONS
   ======================== */

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/* ========================
   TABLE FILTERING
   ======================== */

function filterTable() {
    const filterDate = document.getElementById('filterDate').value;
    const filterStatus = document.getElementById('filterStatus').value;
    const tableBody = document.getElementById('tableBody');
    
    if (!tableBody) return;

    const rows = tableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        let showRow = true;
        
        // Filter by status if selected
        if (filterStatus) {
            const statusBadge = row.querySelector('.badge');
            const rowStatus = statusBadge ? statusBadge.textContent.toLowerCase().trim() : '';
            const selectedStatus = filterStatus.toLowerCase();
            
            if (rowStatus !== selectedStatus) {
                showRow = false;
            }
        }
        
        // Show or hide row
        row.style.display = showRow ? '' : 'none';
    });
}

/* ========================
   EXPORT FUNCTIONS
   ======================== */

function exportTableToCSV() {
    const table = document.querySelector('.data-table');
    if (!table) return;

    let csv = [];
    
    // Get headers
    const headers = [];
    table.querySelectorAll('th').forEach(th => {
        headers.push(th.textContent.trim());
    });
    csv.push(headers.join(','));

    // Get rows
    table.querySelectorAll('tbody tr').forEach(row => {
        const rowData = [];
        row.querySelectorAll('td').forEach(td => {
            rowData.push('"' + td.textContent.trim().replace(/"/g, '""') + '"');
        });
        if (rowData.length > 0) {
            csv.push(rowData.join(','));
        }
    });

    // Create CSV file and download
    const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'kehadiran_' + new Date().toISOString().split('T')[0] + '.csv');
    link.click();
}

/* ========================
   PDF REPORT GENERATION
   ======================== */

function generatePDFReport() {
    const month = document.getElementById('reportMonth').value;
    const year = document.getElementById('reportYear').value;
    
    alert('Laporan PDF untuk ' + month + ' ' + year + ' sedang diproses.\n\nCatatan: Untuk implementasi sebenarnya, gunakan library seperti jsPDF atau html2pdf.');
    
    // In production, you would use:
    // - jsPDF library
    // - html2pdf library
    // - Or send to backend for PDF generation
}

/* ========================
   SETTINGS FUNCTIONS
   ======================== */

function saveSettings(button) {
    const settingsCard = button.closest('.settings-card');
    const title = settingsCard.querySelector('h3').textContent;
    
    // Simulate saving (in production, send to backend)
    showNotification('Pengaturan ' + title + ' berhasil disimpan!', 'success');
    
    // Disable button temporarily
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = '✓ Tersimpan';
    
    setTimeout(() => {
        button.disabled = false;
        button.textContent = originalText;
    }, 2000);
}

/* ========================
   NOTIFICATION SYSTEM
   ======================== */

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#28a745' : '#007385'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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

/* ========================
   SEARCH FUNCTIONALITY
   ======================== */

const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const tableBody = document.getElementById('tableBody');
        
        if (!tableBody) return;

        const rows = tableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

/* ========================
   RESPONSIVE BEHAVIOR
   ======================== */

window.addEventListener('resize', function() {
    // Handle responsive changes
    if (window.innerWidth > 768) {
        document.querySelector('.sidebar').classList.remove('active');
    }
});

/* ========================
   DATA MANAGEMENT
   ======================== */

// Sample data structure
const attendanceData = {
    '2026-09-16': [
        { id: 1, name: 'Dr. H. Yaqut Cholil Qoumas', position: 'Menteri Agama', status: 'hadir', checkIn: '08:00', checkOut: '17:00', note: '-' },
        { id: 2, name: 'Prof. Muhadjir Effendy', position: 'Wakil Menteri', status: 'izin', checkIn: '-', checkOut: '-', note: 'Rapat dengan Presiden' },
        { id: 3, name: 'Nur Cholis', position: 'Direktur Jenderal PAI', status: 'sakit', checkIn: '-', checkOut: '-', note: 'Demam tinggi' },
        { id: 4, name: 'Wahyudi Setiawan', position: 'Direktur Jenderal Bimas', status: 'hadir', checkIn: '07:45', checkOut: '16:30', note: '-' },
        { id: 5, name: 'Zainut Tauhid Sa\'adi', position: 'Sekretaris Jenderal', status: 'hadir', checkIn: '08:15', checkOut: '17:15', note: '-' }
    ]
};

/* ========================
   STAT COUNTER ANIMATION
   ======================== */

function animateCounter(element, target) {
    const duration = 1000; // 1 second
    const increment = target / (duration / 50);
    let current = 0;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}

// Animate stat counters when dashboard loads
window.addEventListener('load', function() {
    const hadirCount = document.getElementById('hadirCount');
    const tidakHadirCount = document.getElementById('tidakHadirCount');
    const izinCount = document.getElementById('izinCount');
    const sakitCount = document.getElementById('sakitCount');

    if (hadirCount) animateCounter(hadirCount, 24);
    if (tidakHadirCount) animateCounter(tidakHadirCount, 5);
    if (izinCount) animateCounter(izinCount, 8);
    if (sakitCount) animateCounter(sakitCount, 2);
});

/* ========================
   KEYBOARD SHORTCUTS
   ======================== */

document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            closeModal(modal.id);
        });
    }
    
    // Ctrl+P or Cmd+P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
});

/* ========================
   UTILITY FUNCTIONS
   ======================== */

function formatDate(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    return new Date(date).toLocaleDateString('id-ID', options);
}

function formatTime(time) {
    return time; // Already in HH:MM format
}

/* ========================
   LOCAL STORAGE
   ======================== */

// Save user preferences
function savePreferences() {
    const preferences = {
        theme: 'light',
        language: 'id',
        notifications: true,
        lastVisited: new Date().toISOString()
    };
    localStorage.setItem('dashboardPreferences', JSON.stringify(preferences));
}

// Load user preferences
function loadPreferences() {
    const saved = localStorage.getItem('dashboardPreferences');
    return saved ? JSON.parse(saved) : null;
}

// Load preferences on startup
window.addEventListener('load', function() {
    const prefs = loadPreferences();
    if (!prefs) {
        savePreferences();
    }
});