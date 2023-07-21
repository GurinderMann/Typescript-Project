interface Smartphone {
    carica: number;
    numeroChiamate: number;
    ricarica(unaRicarica: number): void;
    chiamata(minutiDurata: number): void;
    numero404(): number;
    getNumeroChiamate(): number;
    azzeraChiamate(): void;
  }
  
  class FirstUser implements Smartphone {
    carica: number = 0;
    numeroChiamate: number = 0;
    registroChiamate: { id: number; durata: number; timestamp: Date }[] = [];
  
    ricarica(unaRicarica: number): void {
      this.carica += unaRicarica;
    }
  
    chiamata(minutiDurata: number): void {
      const costoPerMinuto = 0.20;
      const costoChiamata = minutiDurata * costoPerMinuto;
      if (costoChiamata <= this.carica) {
        this.carica -= costoChiamata;
        this.numeroChiamate++;
  
        this.registroChiamate.push({
          id: this.numeroChiamate,
          durata: minutiDurata,
          timestamp: new Date(),
        });
      } else {
        console.log('Credito insufficiente per effettuare questa chiamata');
      }
    }
  
    numero404(): number {
      return this.carica;
    }
  
    getNumeroChiamate(): number {
      return this.numeroChiamate;
    }
  
    azzeraChiamate(): void {
      this.numeroChiamate = 0;
    }
  
    mostraRegistroChiamate(): void {
      console.log('Registro chiamate:');
      this.registroChiamate.forEach((chiamata) => {
        console.log(
          `ID: ${chiamata.id}, Durata: ${chiamata.durata} minuti, Data/Ora: ${chiamata.timestamp}`
        );
      });
    }
  
    filtraChiamatePerDataOra(dataOra: Date): void {
      const chiamateFiltrate = this.registroChiamate.filter((chiamata) =>
        this.isSameDate(chiamata.timestamp, dataOra)
      );
  
      if (chiamateFiltrate.length === 0) {
        console.log('Nessuna chiamata effettuata in questa data ed ora.');
      } else {
        console.log('Chiamate effettuate in questa data ed ora:');
        chiamateFiltrate.forEach((chiamata) => {
          console.log(
            `ID: ${chiamata.id}, Durata: ${chiamata.durata} minuti, Data/Ora: ${chiamata.timestamp}`
          );
        });
      }
    }
  
    private isSameDate(date1: Date, date2: Date): boolean {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate() &&
        date1.getHours() === date2.getHours() &&
        date1.getMinutes() === date2.getMinutes()
      );
    }
  }
  
  const user1 = new FirstUser();
  const user2 = new FirstUser();
  const user3 = new FirstUser();
  
  user1.ricarica(10);
  user1.chiamata(5);
  user1.chiamata(10);
  user1.chiamata(15);
  
  console.log('------------------');
  console.log('USER 1');
  console.log('Saldo User1', user1.numero404());
  console.log('Numero chiamate effettuate', user1.getNumeroChiamate());
  
  // Mostra il registro delle chiamate per USER 1
  user1.mostraRegistroChiamate();
  
  console.log('------------------');
  
  user2.ricarica(20);
  user2.chiamata(50);
  
  console.log('USER 2');
  console.log('Saldo User2', user2.numero404());
  console.log('Numero chiamate effettuate', user2.getNumeroChiamate());
  
  user2.azzeraChiamate();
  console.log('Chiamate dopo reset', user2.getNumeroChiamate());
  
  console.log('------------------');
  
  user3.ricarica(5);
  user3.chiamata(60);
  
  console.log('USER 3');
  console.log('Saldo User3', user3.numero404());
  console.log('Numero chiamate effettuate', user3.getNumeroChiamate());
  
 

  