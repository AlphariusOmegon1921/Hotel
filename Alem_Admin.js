


class Hotel {

    imeHotela;
    static boravniciHotela = [];

    constructor(imeHotela){
        this.imeHotela = imeHotela
    }

}

class Usluge {

    imeUsluge;
    cijenaUsluge;
    static trenutneUsluge = [];

    constructor(imeUsluge, cijenaUsluge){
        this.imeUsluge = imeUsluge
        this.cijenaUsluge = cijenaUsluge
        Usluge.trenutneUsluge.push(this)
    }

}

class Soba extends Usluge {

    tipSobe;
    dostupnostSobe = true;
    static trenutneSobe = [];

    constructor(imeUsluge, cijenaUsluge, tipSobe){
        super(imeUsluge, cijenaUsluge)
        this.tipSobe = tipSobe
        Soba.trenutneSobe.push(this)
    }

}

class Admin {

    registrovaniKorisnici = [];

    registrujKorisnika(korisnik, vrijemePrijave, email, password){
        korisnik.vrijemePrijave = vrijemePrijave
        korisnik.email = email
        korisnik.password = password
        this.registrovaniKorisnici.push(korisnik)
        console.log(`Korisnik ${korisnik.imePrezime} uspjesno registrovan.`)
    }

    promjeniSobuKorisnika(korisnik, soba){
        korisnik.tipSobe = soba
        console.log(`Korisnik ${korisnik.imePrezime} uspjesno promjenjena soba na ${soba}.`)
    }

    nadjiKorisnika(brojLicne){
        let pronadjeniKorisnik = this.registrovaniKorisnici.find(e => e.brojLicne === brojLicne)
        console.log(`Pronadjeni korisnik: ${pronadjeniKorisnik.imePrezime}.`)
    }

    odjaviIzHotela(korisnikaZaOdjavu){
        Hotel.boravniciHotela = Hotel.boravniciHotela.reduce((acc, e) => e.korisnikaZaOdjavu === this.korisnikaZaOdjavu ? acc : [...acc, e], [])
        console.log(`Korisnik ${korisnikaZaOdjavu.imePrezime} je uspjesno odjavljen.`)        
    }

}


class Korisnik {

    imePrezime;
    godine
    spol;
    brojLicne;
    koristeneUsluge = [];
    trenutnaSobaBoravka = [];
    trenutniRacun = 0;
    vrijemePrijave;
    email;
    #password;

    constructor(imePrezime, godine, spol, brojLicne){
        this.imePrezime = imePrezime
        this.godine = godine
        this.spol = spol
        this.brojLicne = brojLicne
        Hotel.boravniciHotela.push(this)
    }

    odjaviSeIzHotela(imeHotelaZaOdjavu){
        Hotel.boravniciHotela = Hotel.boravniciHotela.reduce((acc, e) => e.imePrezime === this.imePrezime ? acc : [...acc, e], [])
        console.log(`Korisnik ${this.imePrezime} je uspjesno odjavljen iz ${imeHotelaZaOdjavu.imeHotela}.`)        
    }

    naruciUslugu(imeUsluge){
        let narucenaUsluga = Usluge.trenutneUsluge.find(e => e.imeUsluge === imeUsluge)
        this.koristeneUsluge.push(narucenaUsluga)
        this.trenutniRacun += narucenaUsluga.cijenaUsluge
        console.log(`Korisnik ${this.imePrezime} je uspjesno narucio ${narucenaUsluga.imeUsluge}.`)
    }

    promjeniSobu(tipZeljenjeSobe){
        let zeljenaSoba = Soba.trenutneSobe.find(e => e.tipSobe === tipZeljenjeSobe)
        zeljenaSoba.dostupnostSobe = false
        this.trenutnaSobaBoravka.push(zeljenaSoba)
        this.trenutniRacun += zeljenaSoba.cijenaUsluge
        console.log(`Korisnik ${this.imePrezime} je promjenio sobu na ${zeljenaSoba.tipSobe}.`)
    }

    kojeUslugeKoristi(){
        console.log(`Korisnik ${this.imePrezime} koristi usluge:`)
        for (let usluga of this.koristeneUsluge){
            console.log(`${usluga.imeUsluge} (${usluga.cijenaUsluge}$ po danu)`)
        }
        console.log(`Ukupno duzan: ${this.trenutniRacun}$`)
    }

}


let alem = new Korisnik("AlemM", "20", "m", "2212")
let tito = new Korisnik("Titan", "-421", "m", "5555")

let hotelPula = new Hotel("Pula")


console.log(hotelPula)

console.log()

let soba23 = new Soba('soba1', 52, 'trosobna')
console.log(soba23)
alem.naruciUslugu('soba1')

alem.kojeUslugeKoristi()
console.log()
console.log()
console.log()
console.log()
console.log(Hotel.boravniciHotela)

let sef = new Admin()

sef.registrujKorisnika(tito, 22, '@@', "1234")

console.log(tito)

sef.nadjiKorisnika('5555')

sef.odjaviIzHotela(tito)

console.log(Hotel.boravniciHotela)