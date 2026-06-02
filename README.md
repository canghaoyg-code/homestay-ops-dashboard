# 酒店 / 民宿运营网页数据看板

一个可静态托管的酒店 / 民宿运营数据看板，支持桌面端和手机端访问。

## 远程访问

发布到 GitHub Pages 后，打开仓库的 Pages 地址即可查看和分享。

## 本地预览

本机访问：

```bash
http://127.0.0.1:8123/
```

同一 Wi-Fi 下手机访问时，把 `127.0.0.1` 换成电脑当前局域网 IP。

## 启动服务

```bash
python3 -m http.server 8123 --bind 0.0.0.0
```

## 刷新数据

当 `酒店民宿运营SOP数据看板.xlsx` 填入新数据后，运行：

```bash
python3 generate_data.py /path/to/酒店民宿运营SOP数据看板.xlsx
```

脚本会更新 `dashboard-data.json`。提交并推送后，GitHub Pages 上的数据会同步刷新。

## 文件说明

- `index.html`：看板页面结构。
- `styles.css`：响应式样式，适配电脑和手机。
- `app.js`：读取数据并渲染图表、指标和表格。
- `dashboard-data.json`：当前看板数据。
- `generate_data.py`：从 Excel 工作簿生成看板数据。
