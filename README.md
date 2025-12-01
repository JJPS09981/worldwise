# 🗺️ WorldWise — 旅遊足跡地圖 App

- 一個以 React + Context API + React Router 打造的旅遊紀錄 SPA，
  讓使用者能將去過的城市與國家 標記在互動地圖上，並留下自己的旅遊筆記。

- 此專案源自 Jonas Schmedtmann《Ultimate React Course》，
  依照課程架構完成，但保留可客製化空間（例如你之後想串自己的後端）。

## 🔗 Live Demo

https://worldwise-sheng.netlify.app/

## ⭐ 功能 Features

### 📍 城市地圖標記

- 使用 Leaflet 地圖 顯示世界地圖

- 點擊地圖任意位置即可新增旅遊紀錄

- 自動顯示所在國家、城市資訊

### 🗃️ 城市清單 Cities List

- 顯示所有已紀錄的城市

- 點擊即可查看詳細資訊

- 依照時間排序，方便回顧旅程

### 🌍 國家統計 Countries

- 自動統計「去過哪些國家」

- 以國家顏色標示，視覺清楚

### 🧭 路由切換（React Router）

- / 首頁

- /app 主介面框架

- /app/cities 城市清單

- /app/countries 國家統計

- /app/cities/:id 城市詳細資訊

### 🔒 登入系統（Auth）

- 簡單的前端登入驗證

- 未登入不能查看主介面

- 支援 Protected Routes
