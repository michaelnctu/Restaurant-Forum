# Restaurant-Forum

Heroku: https://salty-oasis-94184.herokuapp.com/restaurants

# 網站畫面

首頁

![image](https://user-images.githubusercontent.com/65526955/98906652-734f5380-24f8-11eb-807e-ce8215f6eaf6.png)

餐廳簡介 (圖片為隨機產生的random資料)

![image](https://user-images.githubusercontent.com/65526955/98907225-74cd4b80-24f9-11eb-9935-e87c80cdf0ab.png)

美食達人
![image](https://user-images.githubusercontent.com/65526955/98907910-8d8a3100-24fa-11eb-8eec-180f23b9c33f.png)


# 網站功能

後台端: 

+ 管理員可以由後台新增/修改/刪除餐廳資料

+ 管理員可以由後台新增/修改/刪除餐廳分類

+ 管理員可以由後台變更使用者權限

前台端: 

+ 使用者可以修改個人簡介,並上傳使用者圖片

+ 使用者可以查看其他使用者個人簡介

+ 使用者可以追蹤,退追蹤其他使用者

+ 個人簡介包含:評論餐廳、收藏餐廳、追蹤的使用者、追蹤自己的使用者

+ 使用者可以透過餐廳分類篩選顯示資料

+ 使用者可以加入/移除餐廳至收藏清單

+ 使用者可以Like/Unlike餐廳

+ 使用者可以評論餐廳

+ 使用者可以點選"Top10人氣餐廳"查看被收藏數高的餐廳

+ 使用者可以點選"美食達人"查看追蹤人數高的使用者

# How to run this project
1. To build this project locally:
```
git clone https://github.com/michaelnctu/Restaurant-Forum.git
```
2. After directing into the file
```
npm install
```
3. nodemon
```
npm install nodemon 
```
4. Workbench新增database
```
CREATE DATABASE forum;
```
5. Workbench使用database
```
use forum;
```
6.匯入遷徙檔案
```
npx sequelize db:migrate
```
8.匯入種子資料
```
npx sequelize db:seed:all
```
9.啟動程式
```
node app.js or nodemon app.js
```
10.成功執行
```
在 terminal 可以看到 Example app listening on port 3000!
```
11.開啟瀏覽器
```
網址列輸入localhost:3000
```

# 測試帳號
| 帳號 | 密碼 |
| :------------- | :------------- |
| root@example.com | 12345678  |
| user1@example.com | 12345678  |
| user2@example.com	| 12345678  |


# Dependencies
+ Node.js: v12.15.0
+ Express: v4.17.1
+ Express-Handlebars: v5.1.0
+ mysql2: v2.1.0
+ sequelize: v6.3.5
+ sequelize-cli: v6.2.0


