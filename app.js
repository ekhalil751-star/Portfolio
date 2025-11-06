// Page navigation state
let currentPage = 0;
const totalPages = 11;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    initializeCharts();
});

// Navigation functions
function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        showPage(currentPage);
        updateNavigation();
        scrollToTop();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
        updateNavigation();
        scrollToTop();
    }
}

function goToPage(pageNum) {
    if (pageNum >= 0 && pageNum < totalPages) {
        currentPage = pageNum;
        showPage(currentPage);
        updateNavigation();
        scrollToTop();
        closeSidebar();
    }
}

function showPage(pageNum) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show current page
    const currentPageEl = document.getElementById(`page-${pageNum}`);
    if (currentPageEl) {
        currentPageEl.classList.add('active');
    }
    
    // Reinitialize charts if on pages with charts
    if (pageNum === 5) {
        setTimeout(() => initializePlatformChart(), 100);
    } else if (pageNum === 6) {
        setTimeout(() => initializeGrowthChart(), 100);
    } else if (pageNum === 7) {
        setTimeout(() => initializeFunnelChart(), 100);
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageIndicator = document.getElementById('pageIndicator');
    
    // Update buttons state
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
    
    // Update page indicator
    pageIndicator.textContent = `Page ${currentPage + 1} of ${totalPages}`;
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sidebar functions
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active');
}

// Chart initialization
function initializeCharts() {
    // Charts will be initialized when their respective pages are shown
    if (currentPage === 5) {
        initializePlatformChart();
    }
}

function initializePlatformChart() {
    const canvas = document.getElementById('platformChart');
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Facebook Ads', 'Instagram Ads', 'Retargeting'],
            datasets: [{
                data: [50, 35, 15],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                borderWidth: 2,
                borderColor: '#FFFFFF'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 14,
                            family: "'FKGroteskNeue', 'Geist', 'Inter', sans-serif"
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return label + ': ' + value + '%';
                        }
                    }
                }
            }
        }
    });
}

function initializeGrowthChart() {
    const canvas = document.getElementById('growthChart');
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Sales (EGP)',
                    data: [1250, 3750, 15000, 30000],
                    borderColor: '#047857',
                    backgroundColor: 'rgba(4, 120, 87, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Budget (EGP)',
                    data: [500, 1500, 2500, 2500],
                    borderColor: '#1E3A8A',
                    backgroundColor: 'rgba(30, 58, 138, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14,
                            family: "'FKGroteskNeue', 'Geist', 'Inter', sans-serif"
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y.toLocaleString() + ' EGP';
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' EGP';
                        },
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

function initializeFunnelChart() {
    const canvas = document.getElementById('funnelChart');
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Impressions', 'Clicks', 'Page Views', 'Add to Cart', 'Checkout', 'Purchase'],
            datasets: [{
                label: 'Funnel Metrics',
                data: [900000, 16200, 14580, 437, 219, 88],
                backgroundColor: [
                    '#1FB8CD',
                    '#FFC185',
                    '#ECEBD5',
                    '#5D878F',
                    '#D2BA4C',
                    '#047857'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.x.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        },
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 13,
                            weight: '500'
                        }
                    }
                }
            }
        }
    });
}