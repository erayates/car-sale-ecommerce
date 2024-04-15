export function convertNumberToCurrency(num: number): string {
  var dotIndex = 3;
  const numArr = num.toString().split("").reverse();
  var tempArr = numArr;
  numArr.map((num, idx) => {
    if (idx === dotIndex) {
      if (tempArr.includes(".")) {
        tempArr = [
          ...tempArr.slice(0, dotIndex + 1),
          ".",
          ...tempArr.slice(dotIndex + 1, numArr.length + 1),
        ];
        dotIndex = dotIndex + 3;
        return;
      }
      tempArr = [
        ...tempArr.slice(0, dotIndex),
        ".",
        ...tempArr.slice(dotIndex, numArr.length),
      ];

      dotIndex = dotIndex + 3;
    }
  });
  return tempArr.reverse().join("");
}

export const mockImages = [
  "/assets/images/featured-cars/clio.jpg",
  "/assets/images/featured-cars/ford-kuga.jpg",
  "/assets/images/featured-cars/bmw-320.jpg",
  "/assets/images/featured-cars/golf-8.webp",
  "https://via.placeholder.com/500x500?text=Image+5",
  "https://via.placeholder.com/500x500?text=Image+6",
  "https://via.placeholder.com/500x500?text=Image+6",

  "https://via.placeholder.com/500x500?text=Image+6",

  // Add more image URLs as needed
];

export const safetyFeatureOptions = [
  "ABC",
  "ABS",
  "ASR",
  "ESP / VSA",
  "Airmatic",
  "Distronic",
  "Yokuş Kalkış Desteği",
  "Gece Görüş",
  "Şeritten Ayrılma İkazı",
  "Şerit Değiştirme Yardımcısı",
  "Hava Yastığı",
  "Kör Nokta Uyarı Sistemi",
  "Lastik Arıza Göstergesi",
  "Yorgunluk Tespit Sistemi",
  "Isofix",
  "Alarm",
  "Çocuk Kilidi",
  "Merkezi Kilit",
];

export const interiorEquipmentOptions = [
  "Deri Koltuk",
  "Kumaş Koltuk",
  "Deri / Kumaş Koltuk",
  "Elektrikli Ön Camlar",
  "Elektrikli Arka Camlar",
  "Klima (Analog)",
  "Klima (Dijital)",
  "Otm.Kararan Dikiz Aynası",
  "Ön Kol Dayama",
  "Arka Kol Dayama",
  "Anahtarsız Giriş ve Çalıştırma",
  "Hidrolik Direksiyon",
  "Fonksiyonel Direksiyon",
  "Ayarlanabilir Direksiyon",
  "Hız Sabitleyici",
  "Adaptive Cruise Control",
  "Yol Bilgisayarı",
  "Start / Stop",
  "Geri Görüş Kamerası",
  "Ön Görüş Kamerası",
];

export const multimediaOptions = [
  "Android Auto",
  "Apple CarPlay",
  "Radyo - Kasetçalar",
  "Radyo - CD Çalar",
  "Radyo - MP3 Çalar",
  "Navigasyon",
  "TV",
  "Bluetooth - Telefon",
  "USB / AUX",
  "Arka Eğlence Paketi",
];
