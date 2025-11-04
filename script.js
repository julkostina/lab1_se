// COCOMO Calculator JavaScript
class COCOMOCalculator {
    constructor() {
        this.cocomoConstants = {
            organic: {
                a: 2.4,
                b: 1.05,
                c: 2.5,
                d: 0.38
            },
            'semi-detached': {
                a: 3.0,
                b: 1.12,
                c: 2.5,
                d: 0.35
            },
            embedded: {
                a: 3.6,
                b: 1.20,
                c: 2.5,
                d: 0.32
            }
        };

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const calculateBtn = document.getElementById('calculate-btn');
        const klocInput = document.getElementById('kloc');
        
        calculateBtn.addEventListener('click', () => this.calculateEstimates());
        
        // Allow Enter key to trigger calculation
        klocInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.calculateEstimates();
            }
        });

        // Real-time validation
        klocInput.addEventListener('input', () => this.validateInput());
    }

    validateInput() {
        const kloc = parseFloat(document.getElementById('kloc').value);
        const calculateBtn = document.getElementById('calculate-btn');
        
        if (isNaN(kloc) || kloc <= 0) {
            calculateBtn.disabled = true;
            calculateBtn.textContent = 'Введіть KLOC';
            return false;
        } else {
            calculateBtn.disabled = false;
            calculateBtn.textContent = 'Розрахувати!';
            return true;
        }
    }

    calculateEstimates() {
        if (!this.validateInput()) {
            this.showError('Будь ласка, введіть правильне значення KLOC');
            return;
        }

        const kloc = parseFloat(document.getElementById('kloc').value);
        const projectType = document.getElementById('project-type').value;
        
        try {
            const results = this.performCOCOMOCalculation(kloc, projectType);
            this.displayResults(results, projectType);
            this.showResultsSection();
        } catch (error) {
            this.showError('Помилка розрахунку: ' + error.message);
        }
    }

    performCOCOMOCalculation(kloc, projectType) {
        const constants = this.cocomoConstants[projectType];
        
        // COCOMO Basic Model Calculations
        // Effort = a * (KLOC)^b (in person-months)
        const effort = constants.a * Math.pow(kloc, constants.b);
        
        // Development Time = c * (Effort)^d (in months)
        const developmentTime = constants.c * Math.pow(effort, constants.d);
        
        // Average Team Size = Effort / Development Time
        const averageTeamSize = effort / developmentTime;
        
        // Productivity = KLOC * 1000 / Effort (LOC per person-month)
        const productivity = (kloc * 1000) / effort;

        return {
            effort: effort,
            developmentTime: developmentTime,
            averageTeamSize: averageTeamSize,
            productivity: productivity,
            kloc: kloc,
            constants: constants
        };
    }

    displayResults(results, projectType) {
        // Update result values with proper formatting
        document.getElementById('effort-result').textContent = results.effort.toFixed(1);
        document.getElementById('time-result').textContent = results.developmentTime.toFixed(1);
        document.getElementById('team-result').textContent = Math.round(results.averageTeamSize);
    }

    animateResults() {
        const resultCards = document.querySelectorAll('.result-card');
        resultCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    showResultsSection() {
        // Results are always visible in this layout, no need to show/hide
    }

    showError(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            document.querySelector('.left-panel').appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Auto-hide error after 5 seconds
        setTimeout(() => {
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        }, 5000);
    }

    // Utility method to get project type description
    getProjectTypeDescription(projectType) {
        const descriptions = {
            organic: 'Simple projects with small, experienced teams',
            'semi-detached': 'Medium complexity projects with mixed experience',
            embedded: 'Complex projects with tight constraints'
        };
        return descriptions[projectType] || '';
    }

    // Method to export results (future enhancement)
    exportResults(results, projectType) {
        const exportData = {
            timestamp: new Date().toISOString(),
            projectType: projectType,
            kloc: results.kloc,
            effort: results.effort,
            developmentTime: results.developmentTime,
            averageTeamSize: results.averageTeamSize,
            productivity: results.productivity
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `cocomo-estimate-${Date.now()}.json`;
        link.click();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const calculator = new COCOMOCalculator();
    
    addInteractiveFeatures();
});

function addInteractiveFeatures() {
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const projectTypeSelect = document.getElementById('project-type');
    projectTypeSelect.addEventListener('change', function() {
        updateProjectTypeHelp(this.value);
    });
}

function updateProjectTypeHelp(projectType) {
    const helpTexts = {
        organic: 'Typical for small business applications, utilities, and simple data processing systems.',
        'semi-detached': 'Common for compilers, database systems, and medium-scale embedded systems.',
        embedded: 'Used for real-time systems, operating systems, and mission-critical applications.'
    };
    
    const helpElement = document.querySelector('#project-type + .help-text');
    if (helpElement) {
        helpElement.textContent = helpTexts[projectType] || 'Select the type that best describes your project';
    }
}

// Utility functions for number formatting
function formatNumber(num, decimals = 1) {
    return parseFloat(num.toFixed(decimals)).toLocaleString();
}

function formatLargeNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
