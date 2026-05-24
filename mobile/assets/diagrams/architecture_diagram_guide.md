# 📐 AI Scam Shield - Sistem Mimari ve Akış Diyagramı Rehberi

Hackathon jürisinin projenizin teknik altyapısını ve veri akışını 10 saniyede anlayabilmesi için **Apple lansmanları sadeliğinde** hazırlanmış modern bir akış diyagramı (System Architecture Workflow) tasarımıdır.

---

## 1. Mermaid Diyagram Kodu (Dark Cyber Security Theme)

Aşağıdaki kodu doğrudan README.md dosyanızda ` ```mermaid ` blokları arasına yapıştırarak GitHub'ın yerleşik diyagram desteği ile gösterebilirsiniz. Tema "Koyu Siber Güvenlik" (Dark Cyber) renkleriyle özelleştirilmiştir (Cyan/Blue aksanlar).

```mermaid
flowchart TD
    %% Modern Cyber Security Renk Sınıfları (ClassDefinitions)
    classDef client fill:#0F172A,stroke:#06B6D4,stroke-width:2px,color:#E2E8F0,radius:8px
    classDef server fill:#1E293B,stroke:#3B82F6,stroke-width:2px,color:#E2E8F0,radius:8px
    classDef external fill:#0B0F19,stroke:#8B5CF6,stroke-width:2px,color:#E2E8F0,stroke-dasharray: 4 4,radius:8px
    classDef decision fill:#09090B,stroke:#F59E0B,stroke-width:2px,color:#E2E8F0,shape:rhombus
    classDef normalMode fill:#064E3B,stroke:#10B981,stroke-width:2px,color:#E2E8F0,radius:8px
    classDef elderlyMode fill:#7F1D1D,stroke:#EF4444,stroke-width:2px,color:#E2E8F0,radius:8px

    %% Katmanlar / Subgraph'lar
    subgraph MobileClient [📱 React Native Mobile Client]
        Input["📸 Görsel Yükle / QR Tara"]
        App["App Core (UI/State)"]
        Result["📊 Analiz Sonucu İşlenir"]
        ModeCheck{"Kullanıcı Modu"}
        NormalUI["✅ Detaylı Teknik Rapor"]
        ElderlyUI["🚨 Yaşlı Modu Dev Uyarı Kartı"]
    end

    subgraph NodeBackend [⚙️ Node.js Backend API]
        Gateway["Router / Controller"]
        Extraction["🔍 URL Extraction Logic"]
        RiskEngine["🧮 Risk Scoring Engine"]
        EmailService["✉️ Auto Email Trigger"]
    end

    subgraph ExternalServices [🌐 AI & Threat Intelligence]
        Gemini["🧠 Google Gemini Vision AI"]
        SafeBrowsing["🛡️ Google Safe Browsing API"]
    end

    %% Akış Mantığı
    Input -->|Veri Gönderimi| App
    App -->|POST /api/analyze| Gateway
    
    Gateway -->|Image/Prompt| Gemini
    Gemini -->|Scam Analizi & Çıkarılan Bağlantılar| Extraction
    Extraction -->|Linkleri Doğrula| SafeBrowsing
    SafeBrowsing -->|Tehdit Durumu| RiskEngine
    Extraction -->|Temel Analiz Verisi| RiskEngine
    RiskEngine -->|Hesaplanmış Risk Skoru & JSON| Result
    
    Result --> ModeCheck
    ModeCheck -->|Normal Mod| NormalUI
    
    ModeCheck -->|Yaşlı Modu| ElderlyRiskCheck{"Risk >= %66?"}
    ElderlyRiskCheck -->|Evet| EmailService
    ElderlyRiskCheck -->|Hayır| ElderlyUI
    EmailService -->|Aileye Acil Durum Maili| ElderlyUI

    %% Katman ve Kutu Stilleri Atamaları
    class Input,App,Result Client client
    class Gateway,Extraction,RiskEngine,EmailService server
    class Gemini,SafeBrowsing external
    class ModeCheck,ElderlyRiskCheck decision
    class NormalUI normalMode
    class ElderlyUI elderlyMode

    %% Subgraph Stilleri
    style MobileClient fill:#020617,stroke:#334155,stroke-width:1px,color:#94A3B8
    style NodeBackend fill:#020617,stroke:#334155,stroke-width:1px,color:#94A3B8
    style ExternalServices fill:#020617,stroke:#334155,stroke-width:1px,color:#94A3B8
```

*(Not: GitHub Markdown yorumlayıcısı Mermaid grafiklerini karanlık modda otomatik çok şık render edecektir.)*

---

## 2. Figma Layout & Tasarım Önerisi (Premium Presentation)

Mermaid hızlı ve fonksiyoneldir ancak Figma'da tasarlanmış bir diyagram jüriye "Premium/Apple-level" bir his verir. Figma'da çizerken şu yapıyı izleyin:

- **Zemin (Background):** `Linear Gradient` (Sıfır siyah #000000'dan çok koyu gece mavisine #0B1120). Arkaya %2 opacity ile ızgara (Grid) ekleyin.
- **Kutular (Nodes):** "Glassmorphism" kullanın. Kutuların içi `#FFFFFF` renk, %4 Opacity, `Background Blur 24px`.
- **Border/Çerçeveler (Strokes):** Kutuların dış çerçevesinde üst kısma %20 beyaz, alt kısma %5 beyaz vererek (Radial gradient stroke) Apple butonlarındaki ışık yansıması hissini yakalayın.
- **Bağlantı Çizgileri (Arrows):** Sıkıcı siyah çizgiler yerine, `Cyan (#06B6D4)` renkli, `#06B6D4` gölgeli (Drop Shadow Blur:10) ince yollar (Paths) çizin. Çizgiler keskin 90 derece yerine hafif kavisli (Rounded) dönsün.

---

## 3. Diyagramdaki Kutuların Kısa Açıklamaları (README Legend)

README dosyanızda diyagramın hemen altına şu anahtarı (Legend) ekleyebilirsiniz:

* 📱 **Mobile Client:** React Native uygulamasının ön yüzü. Kullanıcı QR veya resim yükler.
* 🧠 **Gemini Vision AI:** Metin ve görseli anlayan çekirdek model. Ekrandaki dolandırıcılık belirtilerini arar ve varsa gizli bağlantıları (URL) çıkarır.
* 🛡️ **Safe Browsing:** Yapay zekanın bulduğu linkleri sıfır-gün tehdit veritabanında (malware/phishing) tarar.
* 🧮 **Risk Scoring Engine:** Hem YZ'nin linguistik analizi hem de Safe Browsing'in teknik sonucunu birleştirip bir risk skoru (1-100) çıkarır.
* 🚨 **Elderly Mode & Auto Email:** Yaşlı modu aktifken yüksek risk skorlarında (66 ve üzeri) uygulamadaki uyarı gösterilmeden hemen önce Node.js servisi aile bireyine arka planda otomatik mail atar.

---

## 4. README İçinde Nasıl Kullanılmalı?

Hackathon jürisi README'yi okurken mimari yapı genellikle **"Proje Nedir?" (Hero)** ve **"Özellikler"** bölümünden hemen sonra konulmalıdır. 
Başlık olarak: `## 🏗️ System Architecture & Workflow` yazın ve altına Mermaid kodunu ekleyin. (Veya Figma'dan aldığınız dev çözünürlüklü .png görselini ekleyin).

## 5. Hangi İkonlar Kullanılmalı?

Diyagramı Figma'da yaparsanız veya Mermaid dışında ikon kullanacaksanız, şu modern ikon setlerini öneririm:
- **Phosphor Icons** (Duo-tone veya Regular) veya **Lucide Icons** (Çok modern ve temizdir).
- İkon eşleştirmesi:
  - Frontend: `DeviceMobile`
  - Backend API: `TerminalWindow` veya `Cpu`
  - AI (Gemini): `Sparkle` veya `Brain`
  - Güvenlik: `ShieldCheck` (Yeşil/Mavi)
  - Yaşlı Uyarı / Uyarı: `WarningCircle` (Kırmızı)
  - Mail Gönderimi: `PaperPlaneRight` veya `EnvelopeSimple`

## 6. PNG Export İçin Önerilen Çözünürlük

Eğer Mermaid kodu yerine Figma'dan resim çıktısı alıp GitHub'a koyacaksanız:
- **Tasarım Çerçevesi:** 1920x1080 (16:9 yatay format)
- **Export Çarpanı:** Mutlaka **@2x** (Yani 3840x2160) veya **@3x** alın.
- **Neden?** GitHub veya yüksek çözünürlüklü Retina/Macbook ekranlarında @1x resimler bulanıklaşır (blurry) ve okunaklılığı düşürür. Kodunuz ne kadar iyi olursa olsun bulanık bir diyagram amatör hissettirir. @2x PNG çıktısı cam gibi net durur ve "Wow" etkisini pekiştirir.
