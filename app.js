const DATA_URL = "./dashboard-data.json";

const formatNumber = (value) => new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 1 }).format(Number(value || 0));
const formatMoney = (value) => new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 }).format(Number(value || 0));

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderKpis(kpis) {
  const root = document.getElementById("kpiGrid");
  root.innerHTML = "";
  kpis.forEach((kpi) => {
    const card = el("article", "kpi-card");
    card.append(el("strong", "", kpi.label));
    const value = el("div", "value");
    value.append(document.createTextNode(kpi.format === "money" ? formatMoney(kpi.value) : formatNumber(kpi.value)));
    value.append(el("span", "unit", kpi.unit || ""));
    card.append(value);
    card.append(el("p", "", kpi.note || ""));
    root.append(card);
  });
}

function renderBars(id, items) {
  const root = document.getElementById(id);
  root.innerHTML = "";
  const max = Math.max(1, ...items.map((item) => Math.abs(Number(item.value || 0))));
  items.forEach((item) => {
    const row = el("div", "bar-row");
    row.append(el("div", "bar-label", item.label));
    const track = el("div", "bar-track");
    const fill = el("div", "bar-fill");
    fill.style.width = `${Math.max(2, (Math.abs(Number(item.value || 0)) / max) * 100)}%`;
    track.append(fill);
    row.append(track);
    row.append(el("div", "bar-value", formatNumber(item.value)));
    root.append(row);
  });
}

function renderMoney(id, items) {
  const root = document.getElementById(id);
  root.innerHTML = "";
  const max = Math.max(1, ...items.map((item) => Math.abs(Number(item.value || 0))));
  items.forEach((item) => {
    const row = el("div", "money-row");
    row.append(el("div", "bar-label", item.label));
    const axis = el("div", "money-axis");
    const fill = el("div", `money-fill${Number(item.value) < 0 ? " negative" : ""}`);
    const width = Math.max(2, (Math.abs(Number(item.value || 0)) / max) * 100);
    fill.style.width = `${width}%`;
    if (Number(item.value) < 0) {
      fill.style.right = "0";
    } else {
      fill.style.left = "0";
    }
    axis.append(fill);
    row.append(axis);
    row.append(el("div", "bar-value", formatMoney(item.value)));
    root.append(row);
  });
}

function renderRisks(risks) {
  const root = document.getElementById("riskList");
  root.innerHTML = "";
  risks.forEach((risk) => {
    const item = el("div", "risk-item");
    item.append(el("div", "risk-module", risk.module));
    const body = el("div");
    body.append(el("strong", "", risk.metric));
    body.append(el("p", "", `${risk.rule}｜${risk.action}`));
    item.append(body);
    item.append(el("div", "risk-value", `${formatNumber(risk.value)}${risk.unit || ""}`));
    root.append(item);
  });
}

function renderMiniTable(id, rows, type) {
  const root = document.getElementById(id);
  root.innerHTML = "";
  if (!rows.length) {
    root.append(el("div", "empty", "暂无记录"));
    return;
  }
  rows.forEach((row) => {
    const item = el("div", "mini-row");
    item.append(el("strong", "", row.id || row.period || "-"));
    const main = el("div", "mini-main");
    if (type === "lead") {
      main.append(el("div", "mini-title", `${row.name || "未命名客户"}｜${row.area || "未填区域"}`));
      main.append(el("div", "mini-sub", `${row.need || "需求未填"}｜下次跟进：${row.next || "未设置"}`));
      item.append(main);
      item.append(el("span", "status", row.status || "未跟进"));
    } else {
      main.append(el("div", "mini-title", `${row.property || "未填房源"}｜${row.type || "问题未填"}`));
      main.append(el("div", "mini-sub", `预计完成：${row.due || "未设置"}`));
      item.append(main);
      item.append(el("span", "status", row.status || row.priority || "待处理"));
    }
    root.append(item);
  });
}

async function loadDashboard() {
  const response = await fetch(`${DATA_URL}?t=${Date.now()}`);
  if (!response.ok) throw new Error("数据文件读取失败");
  const data = await response.json();
  document.getElementById("sourceLine").textContent = `数据源：${data.meta.source}｜更新时间：${data.meta.generatedAt}`;
  renderKpis(data.kpis);
  renderBars("funnelChart", data.charts.funnel);
  renderBars("sourceChart", data.charts.sources);
  renderBars("propertyChart", data.charts.properties);
  renderMoney("revenueChart", data.charts.revenue);
  renderRisks(data.risks);
  renderMiniTable("leadTable", data.tables.hotLeads || [], "lead");
  renderMiniTable("repairTable", data.tables.repairs || [], "repair");
}

document.getElementById("reloadBtn").addEventListener("click", () => {
  loadDashboard().catch((error) => {
    document.getElementById("sourceLine").textContent = error.message;
  });
});

loadDashboard().catch((error) => {
  document.getElementById("sourceLine").textContent = error.message;
});
