# 🏠 Interphone QR - Appel via QR Code

Application interphone gratuite basée sur QR code pour appeler sans révéler son numéro de téléphone.

## ✨ Fonctionnalités

- 📞 **Appel vidéo/audio** : Communication complète via WebRTC
- 🔒 **Anonymat total** : Votre numéro n'est jamais partagé
- 📱 **Simple d'utilisation** : Scannez et appelez
- 🆓 **100% gratuit** : Aucun coût ni abonnement
- 🌐 **Accessible partout** : Fonctionne sur tous les navigateurs modernes

## 🚀 Comment utiliser

### Pour le propriétaire :
1. Ouvrez `index.html` dans votre navigateur
2. Partagez le QR code affiché
3. Attendez les appels des visiteurs
4. Acceptez ou refusez les appels

### Pour le visiteur :
1. Scannez le QR code avec votre téléphone
2. Appuyez sur le bouton d'appel 📞
3. Attendez que le propriétaire accepte
4. Communiquez gratuitement !

## 📁 Structure des fichiers

```
interphone-qr/
├── index.html      # Page principale du propriétaire
├── visitor.html    # Page du visiteur
├── app.js          # Logique du propriétaire
├── visitor.js      # Logique du visiteur
└── README.md       # Documentation
```

## 🔧 Technologies utilisées

- **HTML5/CSS3** : Interface moderne et responsive
- **JavaScript** : Logique WebRTC et gestion des appels
- **WebRTC** : Appels peer-to-peer sécurisés
- **QRCode.js** : Génération de QR codes
- **WebSocket** : Signalisation des appels

## ⚙️ Configuration requise

- Navigateur moderne (Chrome, Firefox, Safari, Edge)
- Accès caméra/microphone
- Connexion internet
- HTTPS obligatoire pour WebRTC

## 🛠 Installation

1. Téléchargez les fichiers
2. Ouvrez `index.html` dans un navigateur
3. Pour la production, utilisez un serveur HTTPS gratuit comme :
   - GitHub Pages
   - Netlify
   - Vercel
   - Ou tout serveur web avec certificat SSL

## 🔒 Sécurité et confidentialité

- ✅ Aucun numéro de téléphone partagé
- ✅ Connexion directe peer-to-peer
- ✅ Pas de stockage de données personnelles
- ✅ Chiffrement WebRTC intégré
- ✅ Serveur de signalisation public et anonyme

## 📱 Compatible avec

- 🖥️ Ordinateurs (Windows, Mac, Linux)
- 📱 Smartphones (iOS, Android)
- 📟 Tablettes
- 🌐 Tous les navigateurs modernes

## 🚨 Limitations

- Nécessite une connexion internet stable
- La qualité dépend de la connexion des deux parties
- Le serveur de signalisation public peut avoir des limitations
- Certaines entreprises bloquent WebRTC

## 💡 Astuces

- **Pour une meilleure qualité** : Utilisez WiFi ou 4G/5G
- **Pour plus de stabilité** : Placez-vous près de votre routeur
- **Pour les visiteurs** : Le QR code peut être imprimé et affiché à l'entrée

## 🔄 Comment ça marche ?

1. Le propriétaire génère un QR code unique
2. Le visiteur scanne le QR code
3. Une connexion WebRTC peer-to-peer est établie
4. L'appel se fait directement entre les deux appareils
5. Aucun intermédiaire n'a accès à la communication

## 📞 Dépannage

**"Erreur caméra/micro"** : 
- Vérifiez les permissions du navigateur
- Assurez-vous qu'aucune autre application n'utilise la caméra

**"Connexion échouée"** :
- Vérifiez votre connexion internet
- Essayez de rafraîchir la page
- Changez de réseau si possible

**"QR code ne fonctionne pas"** :
- Assurez-vous que l'URL est complète
- Vérifiez que vous utilisez HTTPS

---

**Interphone QR** - Votre interphone personnel, gratuit et sécurisé !