# WonderGo 玩得夠

互動式第一期產品原型。

## 啟動

```bash
python3 -m http.server 4173
```

瀏覽器開啟 `http://localhost:4173`。

## 示範帳號

- 玩家：`player` / `Wonder1234`
- 教師：`teacher` / `Wonder1234`

也可以從登入頁建立新玩家或教師帳號。原型資料儲存在瀏覽器 `localStorage`。

## 已完成

- 玩家／教師雙入口
- 玩家與教師首次註冊
- 帳號密碼再次登入
- 玩家冒險首頁
- 五大能力訓練館
- 可操作示範題與 XP 累積
- 玩家能力儀表板及本週趨勢
- 托奇週報
- 教師班級總覽
- 個別學生學習分析
- 響應式手機、平板及桌面版面

## 正式版下一步

## 連接 Supabase 雲端

WonderGo 已連接 Supabase 專案 `Charmingbei's Project`。

- 資料庫結構及 RLS：`supabase/schema.sql`
- 前端連線設定：`cloud-config.js`
- 雲端資料層：`cloud.js`
- 無 Email 學生註冊：Supabase Edge Function `register-wondergo-user`

重新整理網站後，登入頁顯示「雲端資料庫已連線」即代表成功。

`anon` key 可以放在前端，真正的資料保護由 `schema.sql` 內的 Row Level Security 政策負責。請勿將 `service_role` key 放入 `cloud-config.js`。

雲端版目前同步：

- 玩家與教師註冊、登入和基本資料
- XP 與答題學習事件
- 玩家五大能力資料結構
- 教師後台讀取同校同班的真實學生資料
- 教師任務資料結構

新註冊教師預設為待核准，避免冒用教師身分查看兒少資料。可在 Supabase `profiles` 表將該教師的 `is_approved` 設為 `true`。

後續可再串接口說錄音 Storage、語音評分服務及完整教材編輯器。

## GitHub Pages

專案包含 `.github/workflows/deploy-pages.yml`。推送至 GitHub 的 `main` 分支後，GitHub Actions 會自動發布網站。

首次使用時，在 repository 的 **Settings → Pages → Build and deployment** 將來源設為 **GitHub Actions**。
