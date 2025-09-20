/* ================================================
 * 🌌 ROWEDY KING'S WHATSAPP AUTOMATION STUDIO 🌌
 * TERMUX Optimized - Premium Galaxy Edition v3.0
 * Enhanced Console Interface with Stylish Boxes
 * Long-Running Stable Session Management
 * Created by: Rowedy King
 * ================================================ */

const express = require("express");
const fs = require("fs");
const path = require("path");
const pino = require("pino");
const multer = require("multer");
const colors = require("colors");
const figlet = require("figlet");
const moment = require("moment");
const crypto = require('crypto');

// WhatsApp Baileys imports
const {
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    fetchLatestBaileysVersion,
    makeWASocket,
    isJidBroadcast
} = require("@whiskeysockets/baileys");

/* ================================================
 * 🎨 ENHANCED CONSOLE STYLING FOR TERMUX
 * ================================================ */

// Custom styles for better TERMUX display
colors.setTheme({
    rowedy: ['magenta', 'bold'],
    success: ['green', 'bold'],
    warning: ['yellow', 'bold'],
    error: ['red', 'bold'],
    info: ['cyan', 'bold'],
    highlight: ['blue', 'bold'],
    galaxy: ['rainbow'],
    owner: ['cyan', 'inverse', 'bold']
});

// Enhanced console box drawing function
function drawBox(title, content, color = 'cyan', width = 60) {
    const horizontal = '═'.repeat(width);
    const titleLine = `║ ${title.padEnd(width - 3)} ║`;
    const lines = content.split('\n');
    
    console.log(colors[color](`╔${horizontal}╗`));
    console.log(colors[color](titleLine));
    console.log(colors[color](`╠${horizontal}╣`));
    
    lines.forEach(line => {
        const paddedLine = `║ ${line.padEnd(width - 3)} ║`;
        console.log(colors[color](paddedLine));
    });
    
    console.log(colors[color](`╚${horizontal}╝`));
}

// Success message with Rowedy branding
function showSuccessMessage(message, details = '') {
    console.log('');
    drawBox('✅ SUCCESS - OWNER: ROWEDY', `${message}\n${details}`, 'success', 70);
    console.log('');
}

// Error message with styling
function showErrorMessage(message, details = '') {
    console.log('');
    drawBox('❌ ERROR', `${message}\n${details}`, 'error', 70);
    console.log('');
}

// Info message with styling
function showInfoMessage(title, message) {
    console.log('');
    drawBox(title, message, 'info', 70);
    console.log('');
}

// Warning message with styling
function showWarningMessage(message, details = '') {
    console.log('');
    drawBox('⚠️ WARNING', `${message}\n${details}`, 'warning', 70);
    console.log('');
}

/* ================================================
 * 🌟 STARTUP BANNER & INITIALIZATION
 * ================================================ */
console.clear();
console.log('');
console.log(colors.galaxy(figlet.textSync("ROWEDY KING", { horizontalLayout: "full", font: 'Big' })));
console.log('');

drawBox('🌌 WHATSAPP AUTOMATION STUDIO', 
`Premium Galaxy Edition v3.0
TERMUX Optimized for Mobile Excellence
Professional Bulk Messaging Solution
Enhanced Console Interface with Stylish Colors
Long-Running Stable Session Management

🚀 System Status: Initializing...
💎 Mode: Professional Pest Mode
🔥 Owner: Rowedy King
⚡ Performance: Ultra Fast
🛡️ Security: Maximum Protection`, 'galaxy', 80);

console.log('');

/* ================================================
 * 🔧 EXPRESS APP CONFIGURATION
 * ================================================ */
const app = express();
const PORT = process.env.PORT || 5000; // TERMUX optimized port

// Enhanced directory creation with styling
const dirs = ["temp", "uploads", "public", "logs", "sessions"];
showInfoMessage('📁 DIRECTORY SETUP', 'Creating necessary directories...');

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(colors.success(`✅ Created: ${dir}`));
    } else {
        console.log(colors.info(`📁 Exists: ${dir}`));
    }
});

// Enhanced multer configuration
const upload = multer({ 
    dest: "uploads/",
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for TERMUX
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['text/plain', 'text/csv', 'application/json'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only .txt, .csv, and .json files are allowed!'), false);
        }
    }
});

// Express middleware with enhanced logging
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Cache control for TERMUX browsers
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache');
    next();
});

/* ================================================
 * 💾 ENHANCED DATA STORAGE
 * ================================================ */
const activeClients = new Map();
const activeTasks = new Map();
const activeUsers = new Set();
const apiTokens = new Map();
const webhookTokens = new Map();
const sessionTokens = new Map();
const messageStats = {
    totalSent: 0,
    totalSessions: 0,
    totalTasks: 0,
    startTime: new Date(),
    successfulSessions: 0,
    failedSessions: 0
};

// Enhanced token generation
function generateToken(type = 'api') {
    const prefix = {
        'api': 'rowedy_api_',
        'webhook': 'rowedy_wh_',
        'session': 'rowedy_sess_'
    };
    
    const randomPart = crypto.randomBytes(32).toString('hex');
    return prefix[type] + randomPart;
}

function generateSecretKey() {
    return crypto.randomBytes(64).toString('hex');
}

/* ================================================
 * 🎯 ENHANCED HTML TEMPLATE WITH TERMUX OPTIMIZATION
 * ================================================ */
const generateMobileOptimizedHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>🌌 Rowedy King's WhatsApp Automation Studio | TERMUX Edition</title>
    
    <!-- Meta Tags -->
    <meta name="description" content="Premium WhatsApp automation tool by Rowedy King. TERMUX optimized for mobile excellence.">
    <meta name="keywords" content="WhatsApp automation, TERMUX, Rowedy King, mobile, bulk messaging">
    <meta name="author" content="Rowedy King">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌌</text></svg>">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --primary: #667eea;
            --secondary: #764ba2;
            --accent: #00f2fe;
            --success: #00ff88;
            --warning: #ffa500;
            --error: #ff6b6b;
            --dark: #0c0c0c;
            --light: #ffffff;
            --text-primary: #ffffff;
            --text-secondary: #b8c6db;
            --glass-bg: rgba(255, 255, 255, 0.15);
            --glass-border: rgba(255, 255, 255, 0.25);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
            color: var(--text-primary);
            min-height: 100vh;
            padding: 10px;
        }
        
        .container {
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .title {
            font-family: 'Orbitron', monospace;
            font-size: 2rem;
            font-weight: 900;
            background: linear-gradient(135deg, var(--accent), var(--primary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
        }
        
        .subtitle {
            color: var(--text-secondary);
            font-size: 1rem;
            margin-bottom: 15px;
        }
        
        .owner-tag {
            background: linear-gradient(135deg, var(--success), var(--accent));
            color: var(--dark);
            padding: 8px 16px;
            border-radius: 25px;
            font-weight: 700;
            font-size: 0.9rem;
            display: inline-block;
            animation: glow 3s ease-in-out infinite alternate;
        }
        
        .card {
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 255, 255, 0.2);
        }
        
        .card-title {
            font-family: 'Orbitron', monospace;
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 15px;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            color: var(--text-primary);
        }
        
        .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid var(--glass-border);
            border-radius: 10px;
            color: var(--text-primary);
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }
        
        .btn {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin-top: 10px;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }
        
        .btn:active {
            transform: translateY(0);
        }
        
        .btn.success {
            background: linear-gradient(135deg, var(--success), var(--accent));
        }
        
        .btn.warning {
            background: linear-gradient(135deg, var(--warning), #ff8c00);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        
        .stat-item {
            text-align: center;
            padding: 15px;
            background: var(--glass-bg);
            border-radius: 10px;
            border: 1px solid var(--glass-border);
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        .result-box {
            background: rgba(0, 255, 136, 0.1);
            border: 1px solid var(--success);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
            text-align: center;
        }
        
        .pairing-code {
            font-family: 'Orbitron', monospace;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--success);
            background: rgba(0, 255, 136, 0.2);
            padding: 15px;
            border-radius: 10px;
            margin: 15px 0;
            letter-spacing: 2px;
        }
        
        @keyframes glow {
            from { box-shadow: 0 0 20px rgba(0, 255, 255, 0.5); }
            to { box-shadow: 0 0 30px rgba(0, 255, 255, 0.8); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 2s ease-in-out infinite;
        }
        
        /* Mobile optimizations */
        @media (max-width: 480px) {
            .container {
                padding: 10px;
            }
            
            .title {
                font-size: 1.5rem;
            }
            
            .card {
                padding: 15px;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1 class="title">ROWEDY KING</h1>
            <p class="subtitle">🌌 WhatsApp Automation Studio 🌌</p>
            <div class="owner-tag pulse">TERMUX OPTIMIZED</div>
        </div>

        <!-- Stats -->
        <div class="card">
            <div class="card-title">
                <i class="fas fa-chart-line"></i>
                System Statistics
            </div>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value" id="activeClients">0</div>
                    <div class="stat-label">Active Sessions</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="totalSent">0</div>
                    <div class="stat-label">Messages Sent</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="activeTasks">0</div>
                    <div class="stat-label">Running Tasks</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="uptime">0</div>
                    <div class="stat-label">Uptime (min)</div>
                </div>
            </div>
        </div>

        <!-- WhatsApp Pairing -->
        <div class="card">
            <div class="card-title">
                <i class="fab fa-whatsapp"></i>
                Connect WhatsApp
            </div>
            <form id="pairingForm">
                <div class="form-group">
                    <label class="form-label">Phone Number (with country code)</label>
                    <input type="tel" id="phoneNumber" class="form-input" 
                           placeholder="e.g., 919876543210" required>
                </div>
                <button type="submit" class="btn">
                    <i class="fas fa-qrcode"></i> Generate Pairing Code
                </button>
            </form>
            
            <div id="pairingResult" class="result-box" style="display: none;">
                <h3>🔗 Your Pairing Code:</h3>
                <div class="pairing-code" id="pairingCode"></div>
                <p>Enter this code in WhatsApp > Linked Devices > Link a Device</p>
            </div>
        </div>

        <!-- Bulk Messaging -->
        <div class="card">
            <div class="card-title">
                <i class="fas fa-paper-plane"></i>
                Bulk Messaging
            </div>
            <form id="messagingForm">
                <div class="form-group">
                    <label class="form-label">Sender Number</label>
                    <input type="tel" id="senderNumber" class="form-input" 
                           placeholder="e.g., 919876543210" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Target</label>
                    <input type="text" id="target" class="form-input" 
                           placeholder="Number or Group ID" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Target Type</label>
                    <select id="targetType" class="form-select" required>
                        <option value="number">Individual Number</option>
                        <option value="group">Group</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Delay (seconds)</label>
                    <input type="number" id="delaySec" class="form-input" 
                           value="2" min="1" max="300" required>
                </div>
                
                <!-- Message Input Type Toggle -->
                <div class="form-group">
                    <label class="form-label">Message Input Method</label>
                    <select id="inputMethod" class="form-select" onchange="toggleInputMethod()">
                        <option value="direct">Direct Text Input (Paste Lines)</option>
                        <option value="file">File Upload (.txt)</option>
                    </select>
                </div>
                
                <!-- Direct Text Input -->
                <div class="form-group" id="directInputGroup">
                    <label class="form-label">Messages (One Per Line)</label>
                    <textarea id="directMessages" class="form-textarea" 
                              placeholder="Enter your messages here, one per line:&#10;&#10;Message 1&#10;Message 2&#10;Message 3&#10;..." 
                              rows="8" style="resize: vertical; font-family: monospace;"></textarea>
                    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 5px;">
                        <i class="fas fa-info-circle"></i> Paste each message on a new line. Empty lines will be ignored.
                    </div>
                </div>
                
                <!-- File Upload -->
                <div class="form-group" id="fileInputGroup" style="display: none;">
                    <label class="form-label">Message File (.txt)</label>
                    <input type="file" id="messageFile" class="form-input" accept=".txt">
                    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 5px;">
                        <i class="fas fa-info-circle"></i> Upload a .txt file with one message per line.
                    </div>
                </div>
                
                <button type="submit" class="btn success">
                    <i class="fas fa-rocket"></i> Start Bulk Messaging
                </button>
            </form>
        </div>

        <!-- Groups Management -->
        <div class="card">
            <div class="card-title">
                <i class="fas fa-users"></i>
                Groups Management
            </div>
            <form id="groupsForm">
                <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" id="groupsNumber" class="form-input" 
                           placeholder="e.g., 919876543210" required>
                </div>
                <button type="submit" class="btn warning">
                    <i class="fas fa-search"></i> Get Groups List
                </button>
            </form>
            
            <div id="groupsList" style="margin-top: 20px;"></div>
        </div>
    </div>

    <script>
        // Update stats periodically
        function updateStats() {
            fetch('/status')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('activeClients').textContent = data.activeClients;
                    document.getElementById('totalSent').textContent = data.totalSent;
                    document.getElementById('activeTasks').textContent = data.activeTasks;
                    document.getElementById('uptime').textContent = Math.floor(data.uptime / 60);
                })
                .catch(error => console.error('Error updating stats:', error));
        }

        // Handle pairing form
        document.getElementById('pairingForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const phoneNumber = document.getElementById('phoneNumber').value;
            const button = e.target.querySelector('button');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            button.disabled = true;
            
            try {
                const response = await fetch('/code?number=' + encodeURIComponent(phoneNumber));
                const html = await response.text();
                
                if (html.includes('Pairing Code:')) {
                    const codeMatch = html.match(/Pairing Code: ([A-Z0-9-]+)/);
                    if (codeMatch) {
                        document.getElementById('pairingCode').textContent = codeMatch[1];
                        document.getElementById('pairingResult').style.display = 'block';
                    }
                } else {
                    throw new Error('Failed to generate pairing code');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            } finally {
                button.innerHTML = originalText;
                button.disabled = false;
            }
        });

        // Toggle input method
        function toggleInputMethod() {
            const inputMethod = document.getElementById('inputMethod').value;
            const directInputGroup = document.getElementById('directInputGroup');
            const fileInputGroup = document.getElementById('fileInputGroup');
            
            if (inputMethod === 'direct') {
                directInputGroup.style.display = 'block';
                fileInputGroup.style.display = 'none';
                document.getElementById('messageFile').required = false;
                document.getElementById('directMessages').required = true;
            } else {
                directInputGroup.style.display = 'none';
                fileInputGroup.style.display = 'block';
                document.getElementById('messageFile').required = true;
                document.getElementById('directMessages').required = false;
            }
        }

        // Handle messaging form
        document.getElementById('messagingForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const inputMethod = document.getElementById('inputMethod').value;
            const formData = new FormData();
            
            formData.append('target', document.getElementById('target').value);
            formData.append('targetType', document.getElementById('targetType').value);
            formData.append('delaySec', document.getElementById('delaySec').value);
            formData.append('number', document.getElementById('senderNumber').value);
            formData.append('inputMethod', inputMethod);
            
            if (inputMethod === 'direct') {
                const directMessages = document.getElementById('directMessages').value;
                if (!directMessages.trim()) {
                    alert('Please enter at least one message!');
                    return;
                }
                formData.append('directMessages', directMessages);
            } else {
                const messageFile = document.getElementById('messageFile').files[0];
                if (!messageFile) {
                    alert('Please select a message file!');
                    return;
                }
                formData.append('messageFile', messageFile);
            }
            
            const button = e.target.querySelector('button');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting...';
            button.disabled = true;
            
            try {
                const response = await fetch('/send-message', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    alert('✅ Bulk messaging started successfully! Check console for progress.');
                    document.getElementById('messagingForm').reset();
                    // Reset to default state
                    document.getElementById('inputMethod').value = 'direct';
                    toggleInputMethod();
                } else {
                    throw new Error('Failed to start messaging');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            } finally {
                button.innerHTML = originalText;
                button.disabled = false;
            }
        });

        // Handle groups form
        document.getElementById('groupsForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const phoneNumber = document.getElementById('groupsNumber').value;
            const button = e.target.querySelector('button');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            button.disabled = true;
            
            try {
                const response = await fetch('/get-groups?number=' + encodeURIComponent(phoneNumber));
                const data = await response.json();
                
                const groupsList = document.getElementById('groupsList');
                
                if (data.groups && data.groups.length > 0) {
                    groupsList.innerHTML = data.groups.map(group => \`
                        <div class="card" style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600; margin-bottom: 5px;">\${group.name}</div>
                                    <div style="font-size: 0.8rem; color: var(--text-secondary); font-family: monospace;">
                                        \${group.uid}
                                    </div>
                                </div>
                                <button onclick="copyToClipboard('\${group.uid}')" 
                                        class="btn" style="width: auto; padding: 8px 15px; margin: 0;">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    \`).join('');
                } else {
                    groupsList.innerHTML = \`
                        <div style="text-align: center; padding: 30px; color: var(--text-secondary);">
                            <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 15px; opacity: 0.5;"></i>
                            <p>No groups found or session not active</p>
                        </div>
                    \`;
                }
            } catch (error) {
                alert('Error: ' + error.message);
            } finally {
                button.innerHTML = originalText;
                button.disabled = false;
            }
        });

        // Copy to clipboard function
        function copyToClipboard(text) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    alert('Copied to clipboard!');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Copied to clipboard!');
            }
        }

        // Initialize
        updateStats();
        setInterval(updateStats, 5000);
    </script>
</body>
</html>`;
};

/* ================================================
 * 🚀 WHATSAPP CONNECTION LOGIC
 * ================================================ */

// Enhanced WhatsApp client creation with better error handling
async function createWhatsAppClient(phoneNumber) {
    try {
        showInfoMessage('🔄 WHATSAPP CONNECTION', `Initializing WhatsApp session for: ${phoneNumber}`);

        const { state, saveCreds } = await useMultiFileAuthState(`sessions/${phoneNumber}`);
        const { version, isLatest } = await fetchLatestBaileysVersion();

        showInfoMessage('📡 BAILEYS VERSION', `Version: ${version.join('.')}\nLatest: ${isLatest ? 'Yes' : 'No'}`);

        const waClient = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: false,
            browser: Browsers.macOS("Desktop"),
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
            },
            generateHighQualityLinkPreview: true,
        });

        // Enhanced event handlers
        waClient.ev.on("connection.update", (update) => {
            const { connection, lastDisconnect, qr } = update;
            
            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== 401;
                
                if (shouldReconnect) {
                    showWarningMessage('CONNECTION LOST', `Attempting to reconnect for ${phoneNumber}...`);
                    setTimeout(() => createWhatsAppClient(phoneNumber), 3000);
                } else {
                    showErrorMessage('AUTHENTICATION FAILED', `Session invalid for ${phoneNumber}. Please generate new pairing code.`);
                    activeClients.delete(phoneNumber);
                    activeUsers.delete(phoneNumber);
                }
            } else if (connection === 'open') {
                showSuccessMessage('CONNECTION ESTABLISHED', `WhatsApp successfully connected for: ${phoneNumber}\nOwner: ROWEDY\nStatus: Ready for messaging`);
                messageStats.successfulSessions++;
            } else if (connection === 'connecting') {
                showInfoMessage('🔄 CONNECTING', `Establishing connection for: ${phoneNumber}`);
            }
        });

        waClient.ev.on('creds.update', saveCreds);

        // Message event handler with Rowedy branding
        waClient.ev.on('messages.upsert', async (m) => {
            const message = m.messages[0];
            if (message.key.fromMe) return; // Ignore own messages
            
            const from = message.key.remoteJid;
            const messageContent = message.message?.conversation || 
                                   message.message?.extendedTextMessage?.text || 
                                   'Media/Other';
            
            console.log(colors.info(`📱 Message received from ${from.split('@')[0]}: ${messageContent.substring(0, 50)}...`));
        });

        return waClient;
    } catch (error) {
        showErrorMessage('CLIENT CREATION FAILED', `Error: ${error.message}\nPhone: ${phoneNumber}`);
        throw error;
    }
}

// Enhanced pairing code generation
async function generatePairingCode(phoneNumber) {
    try {
        if (activeClients.has(phoneNumber)) {
            showWarningMessage('SESSION EXISTS', `Active session found for ${phoneNumber}`);
            return null;
        }

        showInfoMessage('🔐 PAIRING CODE GENERATION', `Generating pairing code for: ${phoneNumber}`);

        const waClient = await createWhatsAppClient(phoneNumber);
        const pairingCode = await waClient.requestPairingCode(phoneNumber);

        // Store client info
        activeClients.set(phoneNumber, {
            client: waClient,
            createdAt: new Date(),
            lastActivity: new Date(),
            messagesSent: 0
        });
        
        activeUsers.add(phoneNumber);
        messageStats.totalSessions++;

        showSuccessMessage('PAIRING CODE GENERATED', `Code: ${pairingCode}\nPhone: ${phoneNumber}\nOwner: ROWEDY\nInstructions: Enter this code in WhatsApp > Linked Devices`);

        return pairingCode;
    } catch (error) {
        showErrorMessage('PAIRING CODE FAILED', `Error: ${error.message}\nPhone: ${phoneNumber}`);
        messageStats.failedSessions++;
        throw error;
    }
}

// Enhanced bulk messaging with progress tracking
async function sendBulkMessages(senderNumber, target, targetType, messages, delaySec) {
    const taskId = crypto.randomBytes(8).toString('hex');
    
    try {
        const clientInfo = activeClients.get(senderNumber);
        if (!clientInfo) {
            throw new Error('No active session found for sender number');
        }

        const { client: waClient } = clientInfo;
        
        // Create task info
        const taskInfo = {
            id: taskId,
            senderNumber,
            target,
            targetType,
            totalMessages: messages.length,
            sentMessages: 0,
            isSending: true,
            startTime: new Date(),
            endTime: null,
            error: null,
            stopRequested: false
        };
        
        activeTasks.set(taskId, taskInfo);
        messageStats.totalTasks++;

        showSuccessMessage('BULK MESSAGING STARTED', `Task ID: ${taskId}\nSender: ${senderNumber}\nTarget: ${target}\nMessages: ${messages.length}\nOwner: ROWEDY`);

        // Format target for WhatsApp
        let formattedTarget;
        if (targetType === 'group') {
            formattedTarget = target.includes('@') ? target : `${target}@g.us`;
        } else {
            formattedTarget = target.includes('@') ? target : `${target}@s.whatsapp.net`;
        }

        // Send messages with enhanced progress tracking
        for (let i = 0; i < messages.length && !taskInfo.stopRequested; i++) {
            try {
                const message = messages[i].trim();
                if (!message) continue;

                await waClient.sendMessage(formattedTarget, { text: message });
                
                taskInfo.sentMessages++;
                clientInfo.messagesSent++;
                messageStats.totalSent++;
                clientInfo.lastActivity = new Date();

                const progress = Math.round((taskInfo.sentMessages / taskInfo.totalMessages) * 100);
                
                console.log(colors.success(`✅ [${taskInfo.sentMessages}/${taskInfo.totalMessages}] Message sent successfully (${progress}%) - Owner: ROWEDY`));

                // Show progress every 10 messages or at completion
                if (taskInfo.sentMessages % 10 === 0 || taskInfo.sentMessages === taskInfo.totalMessages) {
                    showSuccessMessage('MESSAGING PROGRESS', `Progress: ${progress}%\nSent: ${taskInfo.sentMessages}/${taskInfo.totalMessages}\nTask ID: ${taskId}\nOwner: ROWEDY`);
                }

                if (i < messages.length - 1) {
                    await delay(delaySec * 1000);
                }
            } catch (messageError) {
                console.log(colors.error(`❌ Failed to send message ${i + 1}: ${messageError.message}`));
                continue;
            }
        }

        taskInfo.isSending = false;
        taskInfo.endTime = new Date();
        
        const duration = Math.round((taskInfo.endTime - taskInfo.startTime) / 1000);
        
        if (taskInfo.stopRequested) {
            showWarningMessage('TASK STOPPED', `Task ID: ${taskId}\nSent: ${taskInfo.sentMessages}/${taskInfo.totalMessages}\nDuration: ${duration}s\nOwner: ROWEDY`);
        } else {
            showSuccessMessage('BULK MESSAGING COMPLETED', `Task ID: ${taskId}\nTotal Sent: ${taskInfo.sentMessages}/${taskInfo.totalMessages}\nDuration: ${duration}s\nSuccess Rate: ${Math.round((taskInfo.sentMessages/taskInfo.totalMessages)*100)}%\nOwner: ROWEDY`);
        }

        return taskId;
    } catch (error) {
        const taskInfo = activeTasks.get(taskId);
        if (taskInfo) {
            taskInfo.isSending = false;
            taskInfo.error = error.message;
            taskInfo.endTime = new Date();
        }
        
        showErrorMessage('BULK MESSAGING FAILED', `Task ID: ${taskId}\nError: ${error.message}\nSent: ${taskInfo?.sentMessages || 0} messages`);
        throw error;
    }
}

/* ================================================
 * 🔗 API ROUTES
 * ================================================ */

// Serve the main page
app.get("/", (req, res) => {
    res.send(generateMobileOptimizedHTML());
});

// Enhanced status endpoint
app.get('/status', (req, res) => {
    const uptime = Math.floor((new Date() - messageStats.startTime) / 1000);
    res.json({
        activeClients: activeClients.size,
        activeTasks: activeTasks.size,
        activeUsers: activeUsers.size,
        totalSent: messageStats.totalSent,
        totalSessions: messageStats.totalSessions,
        totalTasks: messageStats.totalTasks,
        successfulSessions: messageStats.successfulSessions,
        failedSessions: messageStats.failedSessions,
        uptime: uptime,
        owner: "ROWEDY",
        version: "3.0",
        mode: "TERMUX_OPTIMIZED"
    });
});

// Enhanced pairing code generation
app.get("/code", async (req, res) => {
    try {
        const phoneNumber = req.query.number?.replace(/[^0-9]/g, "");
        
        if (!phoneNumber) {
            return res.status(400).send(`
                <div style="padding: 20px; color: red; text-align: center;">
                    <h2>❌ Error: Invalid Phone Number</h2>
                    <p>Please provide a valid phone number</p>
                    <a href="/" style="color: #00d4ff;">🔙 Go Back</a>
                </div>
            `);
        }

        const pairingCode = await generatePairingCode(phoneNumber);
        
        if (pairingCode) {
            res.send(`
                <div style="padding: 30px; background: linear-gradient(135deg, #0c0c0c, #1a1a2e); 
                           color: white; text-align: center; font-family: 'Roboto', sans-serif;">
                    <h1 style="color: #00ff88; margin-bottom: 20px;">🔗 WhatsApp Pairing Code</h1>
                    <div style="background: rgba(0, 255, 136, 0.1); padding: 20px; border-radius: 15px; 
                               border: 2px solid #00ff88; margin: 20px 0;">
                        <h2 style="font-family: 'Orbitron', monospace; font-size: 2.5rem; 
                                   color: #00ff88; letter-spacing: 3px;">
                            Pairing Code: ${pairingCode}
                        </h2>
                    </div>
                    <p style="margin: 20px 0; color: #b8c6db;">
                        📱 Open WhatsApp on your phone<br>
                        ⚙️ Go to Settings > Linked Devices<br>
                        🔗 Tap "Link a Device"<br>
                        🔢 Enter the code above
                    </p>
                    <div style="background: rgba(0, 255, 255, 0.1); padding: 15px; border-radius: 10px; 
                               border: 1px solid #00f2fe; margin: 20px 0;">
                        <p style="color: #00f2fe; font-weight: bold;">👑 Owner: ROWEDY</p>
                        <p style="color: #00f2fe;">📞 Phone: ${phoneNumber}</p>
                        <p style="color: #00f2fe;">⏰ Generated: ${new Date().toLocaleString()}</p>
                    </div>
                    <a href="/" style="background: linear-gradient(135deg, #667eea, #764ba2); 
                                     color: white; padding: 15px 30px; border-radius: 10px; 
                                     text-decoration: none; font-weight: bold; display: inline-block; margin-top: 20px;">
                        🔙 Return to Dashboard
                    </a>
                </div>
            `);
        } else {
            throw new Error('Failed to generate pairing code');
        }
    } catch (error) {
        showErrorMessage('PAIRING CODE ERROR', error.message);
        res.status(500).send(`
            <div style="padding: 20px; color: red; text-align: center;">
                <h2>❌ Error generating pairing code</h2>
                <p>${error.message}</p>
                <a href="/" style="color: #00d4ff;">🔙 Go Back</a>
            </div>
        `);
    }
});

// Enhanced bulk messaging endpoint with direct input support
app.post("/send-message", upload.single('messageFile'), async (req, res) => {
    try {
        const { target, targetType, delaySec, number, inputMethod, directMessages } = req.body;
        
        let messages = [];
        const senderNumber = number.replace(/[^0-9]/g, "");
        
        if (inputMethod === 'direct') {
            // Handle direct text input
            if (!directMessages || !directMessages.trim()) {
                return res.status(400).json({ error: 'Direct messages text is required' });
            }
            
            messages = directMessages.split('\n').filter(msg => msg.trim());
            
            if (messages.length === 0) {
                return res.status(400).json({ error: 'No valid messages found in direct input' });
            }
            
            showInfoMessage('📤 BULK MESSAGING REQUEST (DIRECT INPUT)', `Sender: ${senderNumber}\nTarget: ${target}\nType: ${targetType}\nMessages: ${messages.length}\nDelay: ${delaySec}s\nInput Method: Direct Text`);
            
        } else {
            // Handle file upload
            if (!req.file) {
                return res.status(400).json({ error: 'Message file is required when using file input method' });
            }

            const messagesContent = fs.readFileSync(req.file.path, 'utf8');
            messages = messagesContent.split('\n').filter(msg => msg.trim());

            if (messages.length === 0) {
                return res.status(400).json({ error: 'No messages found in uploaded file' });
            }
            
            showInfoMessage('📤 BULK MESSAGING REQUEST (FILE UPLOAD)', `Sender: ${senderNumber}\nTarget: ${target}\nType: ${targetType}\nMessages: ${messages.length}\nDelay: ${delaySec}s\nInput Method: File Upload`);
            
            // Clean up uploaded file
            fs.unlinkSync(req.file.path);
        }

        const taskId = await sendBulkMessages(senderNumber, target, targetType, messages, parseInt(delaySec));
        
        res.json({ 
            success: true, 
            taskId: taskId,
            message: 'Bulk messaging started successfully',
            inputMethod: inputMethod,
            messagesCount: messages.length,
            owner: 'ROWEDY'
        });
    } catch (error) {
        showErrorMessage('BULK MESSAGING ERROR', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Get WhatsApp groups
app.get("/get-groups", async (req, res) => {
    try {
        const num = req.query.number.replace(/[^0-9]/g, "");
        const clientInfo = activeClients.get(num);

        if (!clientInfo) {
            return res.status(400).json({ 
                error: "No active session found for this number. Please generate a pairing code first." 
            });
        }

        const { client: waClient } = clientInfo;
        const groupData = await waClient.groupFetchAllParticipating();
        const groups = Object.values(groupData).map(group => ({
            name: group.subject,
            uid: group.id.split('@')[0]
        }));

        showSuccessMessage('GROUPS RETRIEVED', `Found ${groups.length} groups for ${num}\nOwner: ROWEDY`);
        res.json({ groups, owner: 'ROWEDY' });
    } catch (error) {
        showErrorMessage('GROUPS FETCH ERROR', error.message);
        res.status(500).json({ error: "Failed to fetch groups: " + error.message });
    }
});

/* ================================================
 * 🚀 SERVER STARTUP & CLEANUP
 * ================================================ */

// Enhanced graceful shutdown
process.on('SIGINT', () => {
    console.log('');
    showWarningMessage('SHUTDOWN INITIATED', 'Gracefully shutting down all connections...');
    
    activeClients.forEach(({ client }, sessionId) => {
        try {
            client.end();
            console.log(colors.success(`✅ Closed session: ${sessionId}`));
        } catch (err) {
            console.log(colors.error(`❌ Error closing session ${sessionId}: ${err.message}`));
        }
        activeUsers.delete(sessionId);
    });
    
    showSuccessMessage('SHUTDOWN COMPLETE', 'All sessions closed successfully\nThanks for using Rowedy King\'s Automation Studio!');
    process.exit();
});

// Enhanced server startup
app.listen(PORT, '0.0.0.0', () => {
    console.log('');
    drawBox('🚀 SERVER LAUNCHED SUCCESSFULLY', 
`🌐 Server URL: http://localhost:${PORT}
⏰ Started: ${moment().format('YYYY-MM-DD HH:mm:ss')}
💎 Version: Premium Galaxy Edition v3.0
🔥 Owner: Rowedy King
📱 Platform: TERMUX Optimized
⚡ Mode: Professional Pest Mode
🛡️ Security: Maximum Protection
🌌 Status: Ready for WhatsApp Automation

✅ System fully initialized and ready!
✅ TERMUX optimizations active
✅ Enhanced console styling enabled
✅ Long-running stability features active
✅ Colorful interface ready for mobile

🎯 Access the control panel at: http://localhost:${PORT}`, 'galaxy', 80);
    
    console.log('');
    showSuccessMessage('WELCOME TO ROWEDY KING\'S STUDIO', 'Your premium WhatsApp automation tool is now running!\nPerfect for TERMUX and mobile environments.\nEnjoy the enhanced experience!');
});

// Export for external use
module.exports = app;