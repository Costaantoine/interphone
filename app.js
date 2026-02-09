class InterphoneQR {
    constructor() {
        this.localPeer = null;
        this.remotePeer = null;
        this.localStream = null;
        this.remoteStream = null;
        this.callId = this.generateCallId();
        this.isInitiator = true;
        
        this.initializeElements();
        this.setupWebSocket();
        this.generateQRCode();
        this.setupEventListeners();
    }

    generateCallId() {
        return 'call-' + Math.random().toString(36).substr(2, 9);
    }

    initializeElements() {
        this.statusEl = document.getElementById('status');
        this.callInterfaceEl = document.getElementById('callInterface');
        this.localVideoEl = document.getElementById('localVideo');
        this.remoteVideoEl = document.getElementById('remoteVideo');
        this.acceptCallBtn = document.getElementById('acceptCall');
        this.rejectCallBtn = document.getElementById('rejectCall');
        this.endCallBtn = document.getElementById('endCall');
    }

    setupWebSocket() {
        // Utiliser un serveur peerjs gratuit pour la signalisation
        this.peer = new Peer(this.callId, {
            host: '0.peerjs.com',
            port: 443,
            path: '/',
            secure: true
        });
        
        this.peer.on('open', (id) => {
            console.log('Connecté avec ID:', id);
            this.updateStatus('En attente de visiteur...');
        });
        
        this.peer.on('call', (call) => {
            console.log('Appel entrant de:', call.peer);
            this.incomingCall(call);
        });
        
        this.peer.on('error', (error) => {
            console.error('Erreur PeerJS:', error);
            this.updateStatus('Erreur de connexion');
        });
        
        this.peer.on('disconnected', () => {
            console.log('Déconnecté du serveur');
            this.updateStatus('Connexion perdue - Reconnexion...');
            this.peer.reconnect();
        });
    }

    generateQRCode() {
        const url = `${window.location.origin}/visitor.html?call=${this.callId}`;
        new QRCode(document.getElementById('qrcode'), {
            text: url,
            width: 200,
            height: 200,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    setupEventListeners() {
        this.acceptCallBtn.addEventListener('click', () => this.acceptCall());
        this.rejectCallBtn.addEventListener('click', () => this.rejectCall());
        this.endCallBtn.addEventListener('click', () => this.endCall());
    }

    incomingCall(call) {
        this.currentCall = call;
        this.updateStatus('📞 Appel entrant...', 'calling');
        this.acceptCallBtn.classList.remove('hidden');
    }

    incomingCall(from) {
        this.updateStatus('📞 Appel entrant...', 'calling');
        this.acceptCallBtn.classList.remove('hidden');
        this.remotePeer = from;
    }

    async acceptCall() {
        this.acceptCallBtn.classList.add('hidden');
        this.updateStatus('🎥 Connexion en cours...', 'connected');
        
        await this.initializeMedia();
        
        this.callInterfaceEl.classList.remove('hidden');
        
        // Accepter l'appel PeerJS
        this.currentCall.answer(this.localStream);
        
        this.currentCall.on('stream', (remoteStream) => {
            this.remoteVideoEl.srcObject = remoteStream;
            this.updateStatus('📞 Appel en cours', 'connected');
            this.endCallBtn.classList.remove('hidden');
            this.rejectCallBtn.classList.add('hidden');
        });
    }

    rejectCall() {
        this.acceptCallBtn.classList.add('hidden');
        this.updateStatus('Appel refusé');
        
        if (this.currentCall) {
            this.currentCall.close();
            this.currentCall = null;
        }
        
        setTimeout(() => {
            this.updateStatus('En attente de visiteur...');
        }, 2000);
    }

    async initializeMedia() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            this.localVideoEl.srcObject = this.localStream;
        } catch (error) {
            console.error('Erreur accès média:', error);
            this.updateStatus('Erreur caméra/micro');
        }
    }



    endCall() {
        this.cleanup();
        this.updateStatus('Appel terminé');
        
        if (this.currentCall) {
            this.currentCall.close();
            this.currentCall = null;
        }
        
        setTimeout(() => {
            this.updateStatus('En attente de visiteur...');
            this.callInterfaceEl.classList.add('hidden');
            this.endCallBtn.classList.add('hidden');
        }, 2000);
    }

    cleanup() {
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
        }
        
        if (this.currentCall) {
            this.currentCall.close();
            this.currentCall = null;
        }
        
        this.localVideoEl.srcObject = null;
        this.remoteVideoEl.srcObject = null;
    }

    updateStatus(text, className = '') {
        this.statusEl.textContent = text;
        this.statusEl.className = 'status ' + className;
    }
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    new InterphoneQR();
});