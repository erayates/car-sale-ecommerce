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
  "https://via.placeholder.com/500x500?text=Image",
  "https://via.placeholder.com/500x500?text=Image",
  "https://via.placeholder.com/500x500?text=Image",
];

export const compareByFavorites = (a: AdvertInterface, b: AdvertInterface) => {
  return a.favorites.length - b.favorites.length;
};

export const getQueryString = (searchParams: object) => {
  let queryString = "";
  Object.entries(searchParams).map((params) => {
    queryString += params[0] + "=" + params[1] + "&";
  });

  queryString = queryString.slice(0, -1);
  return queryString;
};

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
