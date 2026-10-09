# Fork Güncelleme Rehberi (`telemetri-kapali` dalı)

Bu fork otomatik güncelleme KULLANMAZ (güncelleme akışı `localhost:8081`
placeholder'ıdır — resmî binary'yi çekip kaldırımları silebilir).
Upstream yeni sürüm çıkardığında aşağıdaki adımlar elle uygulanır.

## Adımlar (herhangi bir ZCode oturumu uygulayabilir)

1. **Upstream'i alın ve diff denetimi yapin:**
   ```
   git remote add upstream https://github.com/zai-org/ZCode.git   (bir kez)
   git fetch upstream main
   git log HEAD..upstream/main --oneline        # gelen commitler
   git diff HEAD...upstream/main --stat         # kapsam
   ```
   Diff'te şu kalıplar araştırılır: telemetri, OTLP, ARMS, RUM, crash upload,
   snapshot upload, tracking SDK (posthog/segment/sentry/amplitude), yeni
   dış uç noktalar. Şüpheli commit YALNIZCA temizlenerek alınır; nedeni belgeye yazılır.
2. **Birleştirin:** `git merge upstream main` — çakışmalarında kaldırımlarımızın
   korunduğundan emin olun (`docs/denetim-sonuc.md` tablosu referans).
3. **Koruma testleri:** `node --test packages/desktop/tests/no-telemetry.test.mjs`,
   `apps/zcode-cli/tests/...`, `packages/ui/tests/...` → 12/12 beklenir.
   Desktop 5. test ("RPC ag-telemetri zinciri yeniden baglanamaz") özellikle kritik:
   silinen altyapının geri dönmediğini doğrular.
4. **Derleme öncesi tam denetim:** `pnpm typecheck`, `pnpm lint` (0 hata beklenir),
   yeni eklenen dosyalarda `https://` uç nokta taraması.
5. **Paketleyin:** `pnpm bundle:desktop -- --os win --arch x64`
   (pnpm 10.33.2 + Node ≥24; winCodeSign aracı 1.1.0 toolset ile gelir —
   `electron-builder.config.js` içindeki fork ayarına dokunmayın).
6. **Doğrulayın:** `dist/ZCode-<sürüm>-win-x64.exe` çıktar; kurulum mevcut
   sürümün üzerine yükseltme olarak yapılır (veriler korunur).

## Yeni sürümü nereden öğrenirsiniz

- https://github.com/zai-org/ZCode/releases (upstream)
- https://github.com/ZCodium-project/ZCodium/releases (referans denetimli dağıtım —
  kaldırma kararlarında karşılaştırma kaynağı)
- Ya da herhangi bir ZCode oturumuna "güncelleme var mı" diye sormak.
