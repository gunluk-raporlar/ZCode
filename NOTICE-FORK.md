# FORK BİLDİRİMİ — gunluk-raporlar/ZCode (`telemetri-kapali` dalı)

Bu depo, [zai-org/ZCode](https://github.com/zai-org/ZCode) (Apache-2.0) türevidir.
Upstream'in orijinal NOTICE.md'si (Çince, üçüncü taraf bildirimleri dahil) olduğu gibi korunur.
Bu dosya yalnızca fork'a özel değişiklikleri ve kalan ağ davranışlarını belgeler.
Referans denetim raporları: `docs/zcodium-referans/` (kaynak: ZCodium-project/ZCodium-old).

## 1. Bu fork'ta kaldırılanlar

- CLI ajan telemetrisi (`@zcode/telemetry` OTLP ihracı, cihaz kimliği üretimi)
- Masaüstü ARMS RUM entegrasyonu (Alibaba Cloud SDK'sı bağımlılık düzeyinde kaldırıldı)
- Renderer iz/TTFT metrik ihracı, ağ/kaynak örnekleme, kararlılık ve MCP telemetrisi
- Ana anahtar `ZCODE_TELEMETRY_ENABLED` ZCodium referansı ile tamamen silindi
- 26k+ satırlık kaldırım: commit `7c27ad0` (ZCodium commit 9336fe5'in taşınması)

## 2. Bilinerek bırakılanlar (ürünün çalışması için gerekli; telemetri değildir)

- **Model istekleri**: görev, sıkıştırma, başlık, hafıza, AI commit mesajı vb. için
  prompt/kod/diff/ek içeren istekler seçtiğiniz sağlayıcıya ve resmî Coding Plan
  ağ geçidine (z.ai) gider; kimlik ve oturum bilgileri taşır.
- **Oturum açma / plan yetkilendirmesi**: z.ai hesap girişi, token akışı, kota sorguları.
- **Güncelleme kontrolleri** ve resmî eklenti/CDN erişimi (kullanılmazsa iletişim olmaz).
- Yerel loglar, geri bildirim (siz gönderirseniz), WebSearch/WebFetch (sorgu hedefe gider).

## 3. Lisans

Birinci taraf değişiklikler MIT; upstream kod Apache-2.0 (LICENSE-APACHE) korunmuştur.
Değişikliklerin tamamı Git geçmişinden commit commit izlenebilir:
`4855515` (OTLP yamaları), `8d6d57e` (ana anahtar + ARMS), `7c27ad0` (26k satır kaldırım),
`5c475cc` (referans raporlar).
