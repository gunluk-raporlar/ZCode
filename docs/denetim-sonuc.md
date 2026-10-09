# Telemetri Denetimi — Sonuç ve Kabul Kriteri

Dal: `telemetri-kapali` · Tarih: 2026-10-09
Referans raporlar: `docs/zcodium-referans/` · İlgili commit'ler: `4855515`, `8d6d57e`, `7c27ad0`, `255f0ef`, `a3d445a`

## SONUÇ (düzeltilmiş metin — kabul ölçütü)

> **SONUÇ — Düzeltme gerekliydi; uygulandı.** İlk incelemede aktif bir dış telemetri
> gönderim yolu tespit edilmemişti; ancak RPC ağ-telemetri middleware'i ve model-ağ
> gözlemi üreticisi depoda bulunmakta, sink eklenmesiyle yeniden etkinleştirilebilmekteydi.
> Bu durum telemetrinin kalıcı olarak kaldırıldığı hedefiyle uyumsuzdur. İlgili altyapı,
> ihracatlar ve üretici çağrıları kaldırılıp regresyon testleriyle doğrulanana kadar
> denetim tamamlanmış sayılmamaz.

## Durum: kabul kriteri karşılandı

**Kabul kriteri:** Telemetriyi yeniden etkinleştirmek, birinin mevcut bir sink'i
yanlışlıkla bağlamasıyla mümkün OLMAMALI; bunu yapabilmek için kaldırılmış altyapının
bilinçli olarak yeniden yazılması gerekmelidir.

| # | Zorunlu düzeltme | Durum | Kanıt |
| - | ---------------- | ----- | ----- |
| 1 | RPC middleware dosyasının + ihracatlarının silinmesi | ✅ | `255f0ef`: `network-telemetry-middleware.ts` silindi; `rpc/src/index.ts` ihracat bloğu kaldırıldı |
| 2 | Model-ağ gözlemi üretici zincirinin kaldırılması | ✅ | `255f0ef`: `recordAgentModelNetworkTelemetry`, `agentModelNetworkObservationFromEvent` ve yalnız bu zincirin kullandığı 3 yardımcı + tipler silindi |
| 3 | Geri dönüşün regresyon testinde engellenmesi | ✅ | `a3d445a` + bu commit: desktop guard testine 5. test eklendi — `packages/rpc/src` ve `packages/services/src` içinde `setNetworkTelemetrySink`, `NetworkTelemetryChannelServer`, `NetworkTelemetryChannelClient`, `network-telemetry-middleware` sembollerinin GEÇMESİ YASAK; ilk testin regex'i de `new` öneki olmadan sembol adlarını yasaklar |
| 4 | Son sembol taraması | ✅ | Tüm depo (`apps`, `packages`, `config`, `scripts`) `*.ts/tsx/js/mjs/json/yaml` üzerinde dört sembol için arama: **0 eşleşme** (yalnızca guard testi ve bu belge kendilerini kapsayan istisna) |

## Regresyon testleri

```
desktop: 5/5 PASS   (yeni: "RPC ag-telemetri zinciri yeniden baglanamaz durumda")
ui:     3/3 PASS
cli:    4/4 PASS
-------------------
toplam: 12/12 PASS
```

Not: `packages/desktop/tests/no-telemetry.test.mjs` içindeki `loadModule`
yardımcısına `target: ES2022` eklendi (`a3d445a`) — hedefsiz transpileModule'ün
ES5 emit'i, Set üzerindeki `for...of`'u çalıştırmayan `.length` döngüsüne
indirgediği için "database startup" testi alakasız biçimde düşüyordu. İddialar
değiştirilmedi; yalnızca üretim derlemesiyle aynı semantik sağlandı.

## Bilinen sınırlar (kabul kriterini etkilemez)

- `NOOP_AGENT_EXECUTION_TELEMETRY` / `agentTelemetry` no-op iskeleti (15+ dosya,
  ~15 dosyada tip tanımı) ve `third-party/inventory.json` içindeki bayat ARMS
  envanter referansları kasıtlı olarak duruyor: bunlar **yeniden bağlanabilir
  RPC zinciri değil**, etkisiz tip/yorum düzeyindedir. typecheck eşliğinde
  derleme aşamasında çıkarılacaktır.
- Model API çağrıları, Coding Plan ağ geçidi, güncelleme kontrolleri: ürün
  işlevidir; `NOTICE-FORK.md` bölüm 2'de beyan edilmiştir.
