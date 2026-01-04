### Uvod
Cilj ovog seminarskog rada je prikazati razvoj mobilne aplikacije koristeći Expo platformu.  
Fokus aplikacije je na:  

- Implementaciji senzora (akcelerometar)  
- Interakciji korisnika sa samom aplikacijom
- Osnovnom profiliranju aplikacije  

---

### Osnovne Značajke
- Prikaz trenutnih X, Y, Z vrijednosti akcelerometra  
- Brojač shake pokreta  
- Tipke: Start Sensor, Stop Sensor, Reset  

**Screenshot osnovnog ekrana:**
[Home Screen](https://github.com/ivantf2/motion-tracker-app/blob/main/screenshots/1000010017.jpg)

---

### Implementacija Senzora
Korišten je Akcelerometar iz paketa `expo-sensors`.  
- Interval očitanja: 150ms  
- Detekcija shake pokreta s cooldown-om od 500ms  
- Vibracija uređaja kada shake pokret prelazi threshold  

Kod aplikacije je dostupan na GitHubu:
[index.tsx fajl](https://github.com/ivantf2/motion-tracker-app/blob/main/app/(tabs)/index.tsx)

---

### Interakcija Korisnika
- Start Sensor: pokreće očitanje senzora  
- Stop Sensor: zaustavlja očitanje senzora  
- Reset: resetira X, Y, Z vrijednosti i shake count  

**Screenshoti interakcije:**
[1.](https://github.com/ivantf2/motion-tracker-app/blob/main/screenshots/1000010018.jpg) 
[2.](https://github.com/ivantf2/motion-tracker-app/blob/main/screenshots/1000010024.jpg) 
[3.](https://github.com/ivantf2/motion-tracker-app/blob/main/screenshots/1000010025.jpg) 

---

### Profiliranje Aplikacije
- Prikazuje trenutne vrijednosti akcelerometra (X, Y, Z) i broj tresenja (Shake Count) unutar same aplikacije.
- Omogućuje praćenje performansi senzora u realnom vremenu  
- Vizalno prikazivanje brzine 'shake' geste koristenjem trake koja kada se popuni, incrementa 'shake counter' 

---

### Step-by-Step Upute za Pokretanje
1. Klonirajte repozitorij:  
```bash
git clone https://github.com/ivantf2/motion-tracker-app.git
```
2. Uđite u direktorij projekta:
```bash
cd motion-tracker-app
```

3. Instalirajte potrebne pakete:
```bash
npm install
```

4. Pokrenite projekt:
```bash
npx expo start
```

5. Skenirajte QR kod pomoću Expo Go na mobitelu. (potrebno skinuti Expo Go na uredaj)  
  
---

### Korišteni resursi

- Sve funkcionalnosti aplikacije se nalaze u index.tsx fajlu.

- React Native dokumentacija: https://reactnative.dev

- Expo dokumentacija: https://docs.expo.dev/
