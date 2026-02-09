class VisitorApp {
    constructor() {
        this.localPeer = null;
        this.localStream = null;
        this.remoteStream = null;
        this.targetCallId = null;
        this.isInitiator = false;
        
        this.initializeElements();
        this.parseCallId();
        this.setupWebSocket();
        this.setupEventListeners();
    }

    initializeElements() {
        this.callButton = document.getElementById('callButton');
        this.statusEl = document.getElementById('status');
        this.callInterfaceEl = document.getElementById('callInterface');
        this.localVideoEl = document.getElementById('localVideo');
        this.remoteVideoEl = document.getElementById('remoteVideo');
        this.hangupButton = document.getElementById('hangupButton');
    }

    parseCallId() {
        const urlParams = new URLSearchParams(window.location.search);
        this.targetCallId = urlParams.get('call');
        
        if (!this.targetCallId) {
            this.updateStatus('❌ Erreur: Aucun ID d appel');
            this.callButton.disabled = true;
        }
    }

    setupWebSocket() {
        // Utiliser PeerJS pour appeler le propriétaire
        this.peer = new Peer('visitor-' + Math.random().toString(36).substr(2, 9), {
            host: '0.peerjs.com',
            port: 443,
            path: '/',
            secure: true
        });
        
        this.peer.on('open', (id) => {
            console.log('Connecté avec ID:', id);
            this.updateStatus('Prêt à appeler');
        });
        
        this.peer.on('error', (error) => {
            console.error('Erreur PeerJS:', error);
            this.updateStatus('Erreur de connexion');
        });
    }

    setupEventListeners() {
        this.callButton.addEventListener('click', () => this.makeCall());
        this.hangupButton.addEventListener('click', () => this.hangup());
    }

    async makeCall() {
        this.callButton.disabled = true;
        this.callButton.classList.add('calling');
        this.updateStatus('📞 Appel en cours...');

        try {
            await this.initializeMedia();
            
            // Appeler le propriétaire via PeerJS
            this.currentCall = this.peer.call(this.targetCallId, this.localStream);
            
            if (!this.currentCall) {
                throw new Error('Impossible de démarrer l appel');
            }
            
            this.currentCall.on('stream', (remoteStream) => {
                this.remoteVideoEl.srcObject = remoteStream;
                this.callInterfaceEl.classList.remove('hidden');
                this.updateStatus('📞 Appel connecté');
                this.hangupButton.style.display = 'inline-block';
            });
            
            this.currentCall.on('close', () => {
                this.handleCallEnded();
            });
            
            this.currentCall.on('error', (error) => {
                console.error('Erreur appel:', error);
                this.updateStatus('❌ Erreur lors de l appel');
                this.resetCallButton();
            });
            
        } catch (error) {
            console.error('Erreur appel:', error);
            this.updateStatus('❌ Erreur lors de l appel');
            this.resetCallButton();
        }
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
            this.updateStatus('❌ Erreur caméra/micro');
            throw error;
        }
    }





    handleCallEnded() {
        this.updateStatus('📞 Appel terminé');
        this.cleanup();
        this.resetCallButton();
    }

    hangup() {
        if (this.currentCall) {
            this.currentCall.close();
            this.currentCall = null;
        }
        
        this.cleanup();
        this.updateStatus('Appel terminé');
        this.resetCallButton();
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
        this.callInterfaceEl.classList.add('hidden');
        this.hangupButton.style.display = 'none';
    }

    resetCallButton() {
        this.callButton.disabled = false;
        this.callButton.classList.remove('calling');
    }

    updateStatus(text) {
        this.statusEl.textContent = text;
    }
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    new VisitorApp();
});