#!/usr/bin/env node

/* ================================================
 * 🌌 ROWEDY KING'S WHATSAPP AUTOMATION STUDIO 🌌
 * Terminal Edition for Termux - Premium Version
 * Version: 2.0.0 | Created by: Rowedy King
 * ================================================ */

const fs = require('fs-extra');
const path = require('path');
const colors = require('colors');
const figlet = require('figlet');
// Using simple styling instead of boxen for better Termux compatibility
const createBox = (content, color = 'cyan') => {
    const lines = content.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));
    const border = '═'.repeat(maxLength + 4);
    const result = [
        `╔${border}╗`,
        ...lines.map(line => `║  ${line.padEnd(maxLength)}  ║`),
        `╚${border}╝`
    ];
    return colors[color](result.join('\n'));
};
const inquirer = require('inquirer');
const moment = require('moment');
const Table = require('cli-table3');
const readline = require('readline-sync');

// WhatsApp Baileys imports
const {
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    fetchLatestBaileysVersion,
    makeWASocket,
    isJidBroadcast,
    DisconnectReason
} = require('@whiskeysockets/baileys');

const P = require('pino');

/* ================================================
 * 🎨 ANIMATED RAINBOW COLORS
 * ================================================ */
const rainbowColors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];
let colorIndex = 0;

function getRandomColor() {
    const color = rainbowColors[colorIndex];
    colorIndex = (colorIndex + 1) % rainbowColors.length;
    return color;
}

function animatedText(text, delay = 100) {
    return new Promise((resolve) => {
        let index = 0;
        const interval = setInterval(() => {
            process.stdout.write('\r' + ' '.repeat(process.stdout.columns || 80));
            process.stdout.write('\r' + colors[getRandomColor()](text));
            index++;
            if (index > 10) {
                clearInterval(interval);
                process.stdout.write('\n');
                resolve();
            }
        }, delay);
    });
}

/* ================================================
 * 🌟 STARTUP BANNER AND INITIALIZATION
 * ================================================ */
async function showStartupBanner() {
    console.clear();
    
    // Create directories
    await fs.ensureDir('sessions');
    await fs.ensureDir('contacts');
    await fs.ensureDir('logs');
    
    console.log('\n');
    
    // Animated ROWEDY banner
    const banner = figlet.textSync('ROWEDY', { 
        horizontalLayout: 'full',
        verticalLayout: 'default'
    });
    
    await animatedText(banner);
    
    console.log(createBox(
        `🌌 WhatsApp Automation Studio - Terminal Edition 🌌\n` +
        `🚀 Version 2.0.0 | Owner: Rowedy King\n` +
        `💎 Professional Termux-Optimized Solution\n` +
        `⚡ Full Console Interface | No Browser Needed`,
        'cyan'
    ));
    
    // Loading animation
    const loadingFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let frameIndex = 0;
    
    await new Promise((resolve) => {
        let count = 0;
        const loading = setInterval(() => {
            process.stdout.write(`\r${colors.yellow(loadingFrames[frameIndex])} ${colors.green('Initializing Rowedy King Automation...')}`);
            frameIndex = (frameIndex + 1) % loadingFrames.length;
            count++;
            if (count > 20) {
                clearInterval(loading);
                console.log(`\n${colors.green('✅ Ready to rock and roll!')}\n`);
                resolve();
            }
        }, 150);
    });
}

/* ================================================
 * 📱 WHATSAPP SOCKET MANAGEMENT
 * ================================================ */
let sock;
let userPhoneNumber = null;

async function getPhoneNumber() {
    console.log(colors.cyan('\n📞 Phone Number Setup'));
    console.log(colors.yellow('Enter your WhatsApp phone number (with country code, no + sign)'));
    console.log(colors.gray('Example: 919876543210 (for India), 12345678901 (for US)'));
    
    const phoneNumber = readline.question(colors.green('Phone Number: '));
    
    if (phoneNumber && phoneNumber.length >= 10) {
        userPhoneNumber = phoneNumber.replace(/[^\d]/g, ''); // Remove any non-digit characters
        console.log(colors.blue(`📱 Using phone number: ${userPhoneNumber}`));
        return userPhoneNumber;
    } else {
        console.log(colors.red('❌ Invalid phone number! Please try again.'));
        return await getPhoneNumber();
    }
}

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('sessions');
    
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(colors.blue(`📱 Using WA v${version.join('.')}, isLatest: ${isLatest}`));

    sock = makeWASocket({
        version,
        logger: P({ level: 'silent' }),
        printQRInTerminal: false, // Disable QR code for pairing code method
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, P({ level: 'silent' })),
        },
        browser: Browsers.macOS("Desktop"),
        generateHighQualityLinkPreview: true,
    });

    sock.ev.process(async (events) => {
        if (events['connection.update']) {
            const update = events['connection.update'];
            const { connection, lastDisconnect } = update;

            // Request pairing code when connecting and not registered
            if (connection === 'connecting' && !sock.authState.creds.registered) {
                if (!userPhoneNumber) {
                    userPhoneNumber = await getPhoneNumber();
                }
                
                try {
                    console.log(colors.yellow('\n🔄 Requesting pairing code...'));
                    const pairingCode = await sock.requestPairingCode(userPhoneNumber);
                    
                    console.log(colors.green(createBox(
                        `📱 PAIRING CODE RECEIVED!\n\n` +
                        `Code: ${pairingCode}\n\n` +
                        `📋 Instructions:\n` +
                        `1. Open WhatsApp on your phone\n` +
                        `2. Go to Settings → Linked Devices\n` +
                        `3. Tap "Link a Device"\n` +
                        `4. Select "Link with Phone Number"\n` +
                        `5. Enter this code: ${pairingCode}\n\n` +
                        `⏰ Code expires in 60 seconds!`,
                        'green'
                    )));
                    
                    console.log(colors.rainbow('🎉 PAIRING CODE: ' + pairingCode));
                    
                } catch (error) {
                    console.log(colors.red(`❌ Error requesting pairing code: ${error.message}`));
                    if (error.message.includes('rate')) {
                        console.log(colors.yellow('⏳ Please wait a moment before requesting again...'));
                        await delay(30000);
                    }
                }
            }

            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log(colors.yellow('Connection closed due to:'), lastDisconnect?.error?.message || 'Unknown error');
                console.log(colors.yellow('Reconnecting:'), shouldReconnect);
                
                if (shouldReconnect) {
                    console.log(colors.blue('🔄 Reconnecting in 5 seconds...'));
                    await delay(5000);
                    connectToWhatsApp();
                }
            } else if (connection === 'open') {
                console.log(colors.green('\n🎉 SUCCESSFULLY CONNECTED TO WHATSAPP!'));
                console.log(colors.rainbow('✨ SUCCESSFULLY OWNER ROWDY ✨\n'));
                await showMainMenu();
            }
        }

        if (events['creds.update']) {
            await saveCreds();
        }
    });

    return sock;
}

/* ================================================
 * 📄 CMT.TXT FILE PROCESSING
 * ================================================ */
async function processCMTFile(filePath) {
    try {
        console.log(colors.yellow(`📄 Processing CMT.txt file: ${filePath}`));
        
        if (!await fs.pathExists(filePath)) {
            console.log(colors.red('❌ File not found!'));
            return null;
        }

        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.split('\n').filter(line => line.trim());
        
        console.log(colors.green(`✅ Found ${lines.length} entries in CMT.txt`));
        
        const contacts = [];
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine) {
                // Support different formats: phone numbers, names, etc.
                contacts.push(trimmedLine);
            }
        }
        
        return contacts;
    } catch (error) {
        console.log(colors.red(`❌ Error processing CMT.txt: ${error.message}`));
        return null;
    }
}

/* ================================================
 * 🎯 MAIN MENU SYSTEM
 * ================================================ */
async function showMainMenu() {
    while (true) {
        const menuBox = createBox(
            `🌟 ROWEDY KING AUTOMATION MENU 🌟\n\n` +
            `1️⃣  Load CMT.txt File\n` +
            `2️⃣  Send Bulk Messages\n` +
            `3️⃣  Check Connection Status\n` +
            `4️⃣  View Contact List\n` +
            `5️⃣  Message Templates\n` +
            `6️⃣  Export Chat Data\n` +
            `7️⃣  Settings\n` +
            `8️⃣  Exit\n\n` +
            `Enter your choice:`,
            'magenta'
        );
        
        console.log(colors.magenta(menuBox));
        
        const choice = readline.question(colors.cyan('👉 Select option (1-8): '));
        
        switch (choice.trim()) {
            case '1':
                await loadCMTFile();
                break;
            case '2':
                await sendBulkMessages();
                break;
            case '3':
                await checkConnectionStatus();
                break;
            case '4':
                await viewContactList();
                break;
            case '5':
                await messageTemplates();
                break;
            case '6':
                await exportChatData();
                break;
            case '7':
                await showSettings();
                break;
            case '8':
                await exitApp();
                return;
            default:
                console.log(colors.red('❌ Invalid choice! Please select 1-8.'));
                await delay(2000);
        }
    }
}

let loadedContacts = [];

async function loadCMTFile() {
    console.log(colors.cyan('\n📂 CMT.txt File Loader'));
    console.log(colors.gray('Enter the path to your CMT.txt file:'));
    
    const filePath = readline.question(colors.yellow('File path: '));
    
    if (filePath.trim()) {
        const contacts = await processCMTFile(filePath);
        if (contacts && contacts.length > 0) {
            loadedContacts = contacts;
            
            console.log(createBox(
                `✅ SUCCESS!\n` +
                `Loaded ${contacts.length} contacts from CMT.txt\n` +
                `🎉 SUCCESSFULLY OWNER ROWDY`,
                'green'
            ));
            
            // Display preview
            const table = new Table({
                head: [colors.cyan('Index'), colors.cyan('Contact')],
                colWidths: [10, 50]
            });
            
            contacts.slice(0, 10).forEach((contact, index) => {
                table.push([colors.yellow(index + 1), colors.white(contact)]);
            });
            
            if (contacts.length > 10) {
                table.push([colors.gray('...'), colors.gray(`and ${contacts.length - 10} more`)]);
            }
            
            console.log('\n' + colors.green('📋 Contact Preview:'));
            console.log(table.toString());
        }
    } else {
        console.log(colors.red('❌ No file path provided!'));
    }
    
    readline.question(colors.gray('\nPress Enter to continue...'));
}

async function sendBulkMessages() {
    if (!sock) {
        console.log(colors.red('❌ WhatsApp not connected! Please connect first.'));
        readline.question(colors.gray('Press Enter to continue...'));
        return;
    }
    
    if (loadedContacts.length === 0) {
        console.log(colors.red('❌ No contacts loaded! Please load CMT.txt file first.'));
        readline.question(colors.gray('Press Enter to continue...'));
        return;
    }
    
    console.log(colors.cyan('\n📤 Bulk Message Sender'));
    console.log(colors.gray('Enter your message:'));
    
    const message = readline.question(colors.yellow('Message: '));
    
    if (!message.trim()) {
        console.log(colors.red('❌ No message provided!'));
        readline.question(colors.gray('Press Enter to continue...'));
        return;
    }
    
    console.log(colors.yellow(`\n🚀 Sending message to ${loadedContacts.length} contacts...`));
    
    let sent = 0;
    let failed = 0;
    
    for (let i = 0; i < loadedContacts.length; i++) {
        const contact = loadedContacts[i];
        
        try {
            // Format number for WhatsApp
            let formattedNumber = contact.replace(/[^\d]/g, '');
            if (!formattedNumber.startsWith('91')) {
                formattedNumber = '91' + formattedNumber;
            }
            formattedNumber += '@s.whatsapp.net';
            
            await sock.sendMessage(formattedNumber, { text: message });
            sent++;
            
            process.stdout.write(`\r${colors.green('✅')} Sent: ${sent} | ${colors.red('❌')} Failed: ${failed} | Progress: ${Math.round(((i + 1) / loadedContacts.length) * 100)}%`);
            
            // Delay to avoid rate limiting
            await delay(2000);
            
        } catch (error) {
            failed++;
            process.stdout.write(`\r${colors.green('✅')} Sent: ${sent} | ${colors.red('❌')} Failed: ${failed} | Progress: ${Math.round(((i + 1) / loadedContacts.length) * 100)}%`);
        }
    }
    
    console.log(createBox(
        `🎉 BULK MESSAGING COMPLETE!\n` +
        `✅ Sent: ${sent}\n` +
        `❌ Failed: ${failed}\n` +
        `🔥 SUCCESSFULLY OWNER ROWDY`,
        'green'
    ));
    
    readline.question(colors.gray('\nPress Enter to continue...'));
}

async function checkConnectionStatus() {
    const statusBox = createBox(
        `📱 WhatsApp Connection Status\n\n` +
        `Status: ${sock ? '🟢 Connected' : '🔴 Disconnected'}\n` +
        `Session: ${await fs.pathExists('sessions') ? 'Available' : 'Not Found'}\n` +
        `Contacts Loaded: ${loadedContacts.length}\n` +
        `Time: ${moment().format('YYYY-MM-DD HH:mm:ss')}`,
        'blue'
    );
    
    console.log(colors.blue(statusBox));
    readline.question(colors.gray('Press Enter to continue...'));
}

async function viewContactList() {
    if (loadedContacts.length === 0) {
        console.log(colors.red('❌ No contacts loaded! Please load CMT.txt file first.'));
        readline.question(colors.gray('Press Enter to continue...'));
        return;
    }
    
    console.log(colors.cyan(`\n📋 Contact List (${loadedContacts.length} total)`));
    
    const table = new Table({
        head: [colors.cyan('Index'), colors.cyan('Contact'), colors.cyan('Status')],
        colWidths: [10, 40, 15]
    });
    
    loadedContacts.forEach((contact, index) => {
        table.push([
            colors.yellow(index + 1),
            colors.white(contact),
            colors.green('Ready')
        ]);
    });
    
    console.log(table.toString());
    readline.question(colors.gray('\nPress Enter to continue...'));
}

async function messageTemplates() {
    const templates = [
        "🎉 Hello! Welcome to our service!",
        "📢 Special offer just for you!",
        "🌟 Thank you for your support!",
        "🚀 New updates available!",
        "💎 Premium features unlocked!"
    ];
    
    console.log(colors.cyan('\n📝 Message Templates'));
    
    const table = new Table({
        head: [colors.cyan('Index'), colors.cyan('Template')],
        colWidths: [10, 60]
    });
    
    templates.forEach((template, index) => {
        table.push([colors.yellow(index + 1), colors.white(template)]);
    });
    
    console.log(table.toString());
    readline.question(colors.gray('\nPress Enter to continue...'));
}

async function exportChatData() {
    console.log(colors.yellow('📤 Exporting chat data...'));
    
    const exportData = {
        contacts: loadedContacts,
        exportTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        totalContacts: loadedContacts.length
    };
    
    const exportPath = `exports/chat_export_${moment().format('YYYYMMDD_HHmmss')}.json`;
    await fs.ensureDir('exports');
    await fs.writeFile(exportPath, JSON.stringify(exportData, null, 2));
    
    console.log(createBox(
        `✅ Export Complete!\n` +
        `File: ${exportPath}\n` +
        `Contacts: ${loadedContacts.length}\n` +
        `🎉 SUCCESSFULLY OWNER ROWDY`,
        'green'
    ));
    
    readline.question(colors.gray('Press Enter to continue...'));
}

async function showSettings() {
    const settingsBox = createBox(
        `⚙️  ROWEDY KING SETTINGS ⚙️\n\n` +
        `📱 WhatsApp Connection: ${sock ? 'Connected' : 'Disconnected'}\n` +
        `📂 Session Directory: sessions/\n` +
        `📋 Contacts Loaded: ${loadedContacts.length}\n` +
        `🌟 Version: 2.0.0\n` +
        `👑 Owner: Rowedy King\n` +
        `🏠 Environment: Termux Optimized`,
        'yellow'
    );
    
    console.log(colors.yellow(settingsBox));
    readline.question(colors.gray('Press Enter to continue...'));
}

async function exitApp() {
    console.log(colors.rainbow(figlet.textSync('GOODBYE!', { horizontalLayout: 'full' })));
    
    console.log(createBox(
        `🎉 Thank you for using ROWEDY KING Automation!\n` +
        `💎 Session saved successfully\n` +
        `🌟 Come back anytime!\n` +
        `👑 SUCCESSFULLY OWNER ROWDY`,
        'green'
    ));
    
    if (sock) {
        sock.ws.close();
    }
    
    process.exit(0);
}

/* ================================================
 * 🚀 MAIN APPLICATION STARTUP
 * ================================================ */
async function main() {
    try {
        await showStartupBanner();
        
        console.log(colors.cyan('🔄 Setting up WhatsApp connection...'));
        
        // Check if we already have session data
        const sessionExists = await fs.pathExists('sessions/creds.json');
        
        if (!sessionExists) {
            console.log(colors.yellow('📱 First time setup - Phone number required'));
        } else {
            console.log(colors.green('📱 Session found - Attempting to connect...'));
        }
        
        await connectToWhatsApp();
        
    } catch (error) {
        console.log(colors.red('❌ Error starting application:'));
        console.log(colors.red(error.message));
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log(colors.yellow('\n\n🛑 Shutting down gracefully...'));
    if (sock) {
        sock.ws.close();
    }
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.log(colors.red('❌ Uncaught Exception:'), error.message);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.log(colors.red('❌ Unhandled Rejection:'), error.message);
});

// Start the application
if (require.main === module) {
    main().catch((error) => {
        console.log(colors.red('❌ Fatal Error:'), error.message);
        process.exit(1);
    });
}

module.exports = { main, connectToWhatsApp, processCMTFile };
